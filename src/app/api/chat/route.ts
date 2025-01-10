/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

interface LangflowResponse {
  outputs: Array<{
    outputs: Array<{
      outputs: {
        message: {
          message: {
            text: string;
          };
        };
      };
    }>;
  }>;
}

class LangflowClient {
  private baseURL: string;
  private applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  private async post(endpoint: string, body: any, headers: Record<string, string> = {}) {
    const requestHeaders = {
      ...headers,
      "Authorization": `Bearer ${this.applicationToken}`,
      "Content-Type": "application/json"
    };

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(body)
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error: any) {
      console.error('Request Error:', error);
      throw error;
    }
  }

  async runFlow(
    flowId: string,
    langflowId: string,
    inputValue: string,
    inputType: string = 'chat',
    outputType: string = 'chat',
    tweaks: Record<string, any> = {}
  ): Promise<LangflowResponse> {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=false`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks
    });
  }
}

// Configuration constants
const FLOW_ID = 'c793bdd8-3589-497b-a073-485b7bf06288';
const LANGFLOW_ID = 'eeff00a0-5745-497c-a533-9bd07b7f91c0';
const APPLICATION_TOKEN = process.env.LANGFLOW_API_TOKEN as string;

if (!APPLICATION_TOKEN) {
  throw new Error('LANGFLOW_API_TOKEN is not defined in environment variables');
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const client = new LangflowClient(
      'https://api.langflow.astra.datastax.com',
      APPLICATION_TOKEN
    );

    const tweaks = {
      "ChatInput-Fmesn": {},
      "ParseData-Ol6zS": {},
      "Prompt-E1i1P": {},
      "ChatOutput-HY5VK": {},
      "AstraDB-twhEq": {},
      "GroqModel-RUiJa": {}
    };

    const response = await client.runFlow(
      FLOW_ID,
      LANGFLOW_ID,
      message,
      'chat',
      'chat',
      tweaks
    );

    if (response?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text) {
      return NextResponse.json({
        message: response.outputs[0].outputs[0].outputs.message.message.text
      });
    }

    return NextResponse.json(
      { error: 'Invalid response format from Langflow' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
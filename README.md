# Social Media Analytics Project

## Overview

This project is a social media analytics tool that analyzes engagement data from mock social media accounts. It uses DataStax Astra DB for data storage and Next.js for the frontend application.

## Features

- Data upload script to populate Astra DB with mock social media data
- Next.js application with a user interface to analyze post performance
- Integration with Astra DB for data retrieval
- Responsive design using Tailwind CSS and shadcn/ui components

## Prerequisites

- Node.js (v14 or later)
- DataStax Astra DB account

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/social-media-analytics.git
   cd social-media-analytics
   \`\`\`

2. Install dependencies for the Next.js application:
   \`\`\`
   npm install
   \`\`\`

3. Set up your Astra DB:

   - Create a new database in your Astra DB account
   - Create a new application token with "Database Administrator" role
   - Download the secure connect bundle

4. Configure the Astra DB connection:
   - Rename \`.env.example\` to \`.env.local\`
   - Update the values in \`.env.local\` with your Astra DB credentials

## Data Upload

1. Update the \`upload_to_astra.py\` script with your Astra DB details:

   - Database ID
   - Region
   - Keyspace name
   - Application token

2. Run the data upload script:
   \`\`\`
   python upload_to_astra.py
   \`\`\`

## Running the Application

1. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

2. Open your browser and navigate to \`http://localhost:3000\`

## Usage

1. Select a post type from the dropdown menu
2. Click the "Analyze" button to fetch and display the engagement metrics
3. View the analysis results, including average likes, shares, and comments

## Project Structure

- \`/src\`: Contains the Next.js application source code
  - \`/app\`: Next.js App Router files
  - \`/components\`: React components
  - \`/lib\`: Utility functions and API clients
- \`/public\`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

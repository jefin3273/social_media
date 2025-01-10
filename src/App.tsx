import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [postType, setPostType] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:7860/api/v1/process', {
        input: postType,
      });
      setResult(response.data.output);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while processing your request.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Social Media Analytics
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          required
        >
          <option value="">Select post type</option>
          <option value="carousel">Carousel</option>
          <option value="reel">Reel</option>
          <option value="static">Static</option>
        </select>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </motion.button>
      </motion.form>
      {result && (
        <motion.div
          className="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Analysis Results:</h2>
          <pre>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}

export default App;


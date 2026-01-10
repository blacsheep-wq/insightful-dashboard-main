
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-content', async (req, res) => {
  try {
    const { topic, niche } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
       return res.status(500).json({ error: 'Gemini API Key is not configured' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a social media expert.
      Generate 3 engaging content ideas for the topic: "${topic}".
      The user's niche is: "${niche || 'General'}".
      
      For each idea, provide:
      1. A catchy headline.
      2. A brief description of the content (2-3 sentences).
      3. A suggested format (e.g., Reel, Carousel, Tweet).
      
      Format the output as a JSON object with a key 'ideas' containing an array of objects.
      Example format:
      {
        "ideas": [
          { "headline": "...", "description": "...", "format": "..." }
        ]
      }
      return ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response (handle potential markdown ticks)
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonStr);

    res.json(data);

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

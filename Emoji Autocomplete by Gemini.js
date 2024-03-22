// #popclip extension for Google Gemini
// name: Emoji Autocomplete by Gemini
// identifier: com.example.gemini-emoji-autocomplete
// description: Autocomplete emoji with Gemini
// icon: symbol:face.smiling
// language: javascript
// module: true
// entitlements: [network]
// options:
// - identifier: apikey
//   label: API Key
//   type: string
//   description: Obtain API key from Google Cloud Console

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const axios = require("axios");

async function prompt(input, { apikey }) {
  const content = input.text.trim();
  const prompt = `Analyze the emotion in the following text and insert suitable emojis throughout the text to represent the sentiment. Do not provide any explanations or translations:

${content}`;

  const requestBody = {
    "contents": [{ "parts": [{ "text": prompt }] }],
    "safetySettings": [
      { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH" }
    ],
    "generationConfig": {
      "stopSequences": [],
      "temperature": 1.0,
      "maxOutputTokens": 800,
      "topP": 0.8,
      "topK": 10
    }
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const textWithEmojis = response.data.candidates[0].content.parts.map(part => part.text).join('');
    popclip.pasteText(textWithEmojis, { restore: true });
  } catch (error) {
    console.error("Error autocompleting emoji:", error);
    popclip.showError("Error autocompleting emoji: " + error.message);
  }

  return null;
}

exports.actions = [
  {
    title: "Autocomplete emoji with Gemini",
    code: prompt,
    icon: "symbol:face.smiling",
    requirements: ["text", "copy"],
  },
];
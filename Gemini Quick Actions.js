// #popclip extension for Google Gemini
// name: Gemini Quick Actions
// icon: "iconify:ri:openai-fill"
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey,
//   label: API Key,
//   type: string,
//   description: 'Obtain API key from https://cloud.google.com/ai-platform/prediction/docs/getting-started'
// }]

"use strict";

const axios = require("axios");

async function prompt(input, options) {
  const content = input.text.trim();
  const requestBody = {
    "contents": [{ "parts": [{ "text": content }] }],
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates[0].content.parts.map(part => part.text).join('');
    // PopClip only allows pasting text once, so we'll copy it to clipboard.
    popclip.copyText(generatedText);
    return generatedText;
  } catch (error) {
    console.error("Error executing prompt:", error);
    popclip.showError("Error executing prompt: " + error.message);
  }
}

async function rewrite(input, options) {
  const content = "Rewrite this using an academic tone: \n\n" + input.text.trim();
  const requestBody = {
    "contents": [{ "parts": [{ "text": content }] }],
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates[0].content.parts.map(part => part.text).join('');
    popclip.copyText(generatedText);
    return generatedText;
  } catch (error) {
    console.error("Error rewriting text:", error);
    popclip.showError("Error rewriting text: " + error.message);
  }
}

async function summarize(input, options) {
  const content = "Summarize the following text as concisely as possible: \n\n" + input.text.trim();
  const requestBody = {
    "contents": [{ "parts": [{ "text": content }] }],
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates[0].content.parts.map(part => part.text).join('');
    popclip.showText(generatedText, { preview: true });
    return generatedText;
  } catch (error) {
    console.error("Error summarizing text:", error);
    popclip.showError("Error summarizing text: " + error.message);
  }
}

exports.actions = [
  {
    title: "Execute the selected prompt",
    after: "paste-result",
    code: prompt,
    icon: "symbol:wand.and.stars"
  },
  {
    title: "Rewrite using an academic tone",
    after: "copy-result",
    code: rewrite,
    icon: "symbol:pencil.and.outline"
  },
  {
    title: "Summarize the selected text",
    after: "preview-result",
    code: summarize,
    icon: "symbol:arrow.down.right.and.arrow.up.left"
  }
];
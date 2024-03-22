// #popclip extension for Google Gemini
// name: Gemini Translator
// icon: "iconify:ri:translate"
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

async function translate(input, options) {
  let prompt;
  const content = input.text.trim();

  // Detectar el idioma del texto seleccionado
  const langDetector = new RegExp(/[^\u0000-\u007f]/);
  const isSpanish = langDetector.test(content);

  if (isSpanish) {
    prompt = `Translate the following Spanish text to English:

${content}`;
  } else {
    prompt = `Translate the following English text to Spanish:

${content}`;
  }

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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const translatedText = response.data.candidates[0].content.parts.map(part => part.text).join('');
    popclip.copyText(translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    popclip.showError("Error translating text: " + error.message);
  }
}

exports.actions = [
  {
    title: "Translate with Gemini",
    after: "copy-result",
    code: translate,
    icon: "iconify:ri:translate"
  }
];
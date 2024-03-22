// #popclip extension for Google Gemini
// name: Google Gemini Grammar Check
// icon: iconify:fa-solid:spell-check
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey,
//   label: API Key,
//   type: string,
//   description: 'Obtain API key from Google Cloud Console'
// }]

const axios = require("axios");

async function checkGrammar(input, options) {
  const prompt = `Please correct the grammar and polish the following text, without providing any translation, comments, or notes, and use the same language as the input:

${input.text}`;

  const requestBody = {
    "contents": [{ "parts": [{"text": prompt}] }],
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
    popclip.pasteText(generatedText);
  } catch (error) {
    console.error("Error checking grammar:", error);
    popclip.showError("Error checking grammar: " + error.message);
  }

  return null;
}

exports.actions = [{
  title: "Grammar Check with Google Gemini",
  after: "paste-result",
  code: checkGrammar,
}];
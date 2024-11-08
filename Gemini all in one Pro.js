// #popclip extension for Google Gemini Pro
// name: Gemini Pro Assistant
// icon: material-symbols:cloud-circle
// language: javascript
// module: true
// entitlements: [network]
// options: [{
//   identifier: apikey,
//   label: API Key,
//   type: string,
//   description: 'Get API key from Google Cloud Console'
// }, {
//   identifier: style,
//   label: Style,
//   type: string,
//   default: 'standard',
//   values: ['standard', 'academic', 'business', 'casual']
// }, {
//   identifier: lang,
//   label: Language,
//   type: string,
//   default: 'es',
//   values: ['es', 'en', 'fr', 'de', 'pt']
// }]

"use strict";
const axios = require("axios");

const LANG_LABELS = {
  'es': 'español',
  'en': 'English',
  'fr': 'français',
  'de': 'Deutsch',
  'pt': 'português'
};

async function callGeminiAPI(content, options, customConfig = {}) {
  const langPrompt = options.lang === 'es' ? '[Responde en español]\n' : 
                    options.lang === 'fr' ? '[Réponds en français]\n' :
                    options.lang === 'de' ? '[Antworte auf Deutsch]\n' :
                    options.lang === 'pt' ? '[Responda em português]\n' : '';
                    
  const requestBody = {
    contents: [{ 
      parts: [{ text: langPrompt + content }] 
    }],
    safetySettings: [{
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_ONLY_HIGH"
    }],
    generationConfig: {
      temperature: customConfig.temperature || 0.7,
      maxOutputTokens: customConfig.maxTokens || 800,
      topP: 0.8,
      topK: 40
    }
  };

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${options.apikey}`,
    requestBody,
    { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
  );
  return response.data.candidates[0].content.parts[0].text;
}

exports.actions = [
  {
    title: "Ask Gemini",
    code: async (input, options) => {
      try {
        const text = await callGeminiAPI(input.text.trim(), options);
        popclip.copyText(text);
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "paste-result",
    icon: "symbol:bubble.right.fill"
  },
  {
    title: "Translate",
    code: async (input, options) => {
      try {
        const targetLang = LANG_LABELS[options.lang];
        const text = await callGeminiAPI(
          `Translate the following text into ${targetLang}. Only provide the translation, no explanations:\n\n${input.text.trim()}`,
          options,
          { temperature: 0.1 }
        );
        popclip.showText(text, { preview: true });
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "preview-result",
    icon: "symbol:globe"
  },
  {
    title: "Academic Style",
    code: async (input, options) => {
      try {
        const text = await callGeminiAPI(
          `Rewrite academically:\n${input.text.trim()}`,
          options,
          { temperature: 0.4 }
        );
        popclip.copyText(text);
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "paste-result",
    icon: "symbol:text.badge.checkmark"
  },
  {
    title: "Summarize",
    code: async (input, options) => {
      try {
        const text = await callGeminiAPI(
          `Summarize this:\n${input.text.trim()}`,
          options,
          { temperature: 0.3, maxTokens: 400 }
        );
        popclip.showText(text, { preview: true });
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "preview-result",
    icon: "symbol:text.redaction"
  },
  {
    title: "Grammar Check",
    code: async (input, options) => {
      try {
        const text = await callGeminiAPI(
          `Fix grammar (${options.style}):\n${input.text.trim()}`,
          options,
          { temperature: 0.1 }
        );
        popclip.copyText(text);
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "paste-result",
    icon: "symbol:checkmark.circle.fill"
  },
  {
    title: "Add Emojis",
    code: async (input, options) => {
      try {
        const text = await callGeminiAPI(
          `Add relevant emojis:\n${input.text.trim()}`,
          options,
          { temperature: 0.7 }
        );
        popclip.copyText(text);
        return text;
      } catch (error) {
        popclip.showError("Error: " + error.message);
      }
    },
    after: "paste-result",
    icon: "symbol:face.smiling.fill"
  }
];

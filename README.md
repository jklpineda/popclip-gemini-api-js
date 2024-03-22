# popclip-gemini-api-js
This repository contains a JavaScript library for interacting with the Gemini API via the PopClip extension for macOS. The library is designed to make it easy to integrate the Gemini API into applications and scripts that use PopClip.

PopClip is a powerful productivity tool for macOS that provides quick access to various actions and extensions through a floating menu. It allows you to perform various operations on selected text without leaving the application you're currently working in. This can significantly improve your workflow and efficiency.

1. **Emoji Autocomplete by Gemini:** This PopClip extension utilizes Google's Gemini language model to analyze the sentiment of the selected text and insert appropriate emojis throughout the text to represent the emotions conveyed. It's a handy tool for adding expressive emojis to your writing without manually searching for them.

2. **Google Gemini Grammar Check:** This extension leverages Google's Gemini language model to correct grammar and polish the selected text. It can improve the quality of your writing by fixing grammatical errors, improving sentence structure, and enhancing overall clarity.

3. **Gemini Quick Actions:** This extension provides three quick actions powered by Google's Gemini language model:
```
✔ Execute the selected prompt: Allows you to run any text prompt through Gemini and paste the generated output.
✔ Rewrite using an academic tone: Rewrites the selected text in a more formal, academic style.
✔ Summarize the selected text: Generates a concise summary of the selected text.
```

4. **Gemini Translator:** This extension utilizes Google's Gemini language model to translate text between English and Spanish. It can detect the language of the selected text and provide a translation in the opposite language. For example, if you select English text, it will translate it to Spanish, and vice versa.

**Installation Steps:**
```
✔ Install PopClip from the official website: https://www.popclip.app/extensions/
✔ Open the JavaScript file (.js) containing the desired extension code.
✔ Select the text you want to work with.
✔ In the PopClip floating menu, you should see an option to "Install Extension." Click on it, and the extension will be added to PopClip.
✔ Insert Gemini API Key: These extensions require an API key from the Google Cloud Console to function properly. Obtain a valid API key, and insert it in the extension options when prompted.
```

Note: Some of these extensions require an API key from the Google Cloud Console to function properly. Make sure to obtain and provide a valid API key in the extension options.

Similar repositories and authors:
```
Inspired by awesome chatgpt api
```
These repositories and authors provide a wide range of PopClip extensions for different purposes, showcasing the versatility and usefulness of this tool.

Author

[jklpineda](https://github.com/jklpineda)

Requirements

Requires PopClip 2023.9 and API key from Google Cloud Console.

Changelog

2024-03-22
```
✔ First release
```

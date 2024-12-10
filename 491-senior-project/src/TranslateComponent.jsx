// Worked on by: Tristan Clayman
import React, { useState } from 'react';
import './TranslateComponent.css';
import API_KEY from './config.js';

async function translateText(text, targetLanguage) {
  if (!text.trim()) {
    console.error('No text provided for translation.');
    return null;
  }

  const response = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: 'auto', // Replace with your source language if needed
      target: targetLanguage,
      api_key: API_KEY,
    }),
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error('Error during translation:', response.status, response.statusText, errorResponse);
    return null;
  }

  const data = await response.json();
  console.log('Translation data:', data);
  return data.translatedText; // Ensure this matches the response structure
}

const TranslateComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('es'); // Default target language (Spanish)

  const handleTranslate = async () => {
    console.log('Text to translate:', text);
    try {
      const translation = await translateText(text, language);
      if (translation) {
        setTranslatedText(translation);
      } else {
        setTranslatedText('Translation failed. Please try again.'); // User feedback for translation failure
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('An error occurred during translation.'); // User feedback for error
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setTranslatedText(''); // Clear the previous translation on new input
  };

  return (
    <div className="container">
      <h1>Language Translator</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to translate"
        aria-label="Text to translate" // Accessibility label
      />
      <label htmlFor="language-select">Select Target Language:</label>
      <select 
        id="language-select" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="ja">Japanese</option>
        <option value="en">English</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <div>
        <h2>Translation:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslateComponent;

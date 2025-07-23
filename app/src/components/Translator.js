import React, { useState } from 'react';
import axios from 'axios';//axioslibrary for making api request

const Translator = () => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('es');
  const [translated, setTranslated] = useState('');//translated text received from api
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Supported languages
  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
  ];
  //we use async fn because it performs network request which take time
  const translateText = async () => {//text.trim() removes white spaces.in js empty string is considered as false
    if (!text.trim()) {
      setError('Please enter text to translate.');
      return;
    }
    // We set loading to true (so the UI can show "Translating..."), and clear out any previous errors or translations.
    setLoading(true);
    setError('');
    setTranslated('');
    //await pauses the fn until network request is completed
    try {
      const response = await axios.post(//axios.post-HTTP post reques
        'https://free-google-translator.p.rapidapi.com/external-api/free-google-translator',
        {//sent in the body of the post request
          from: 'en',
          to: targetLang,
          query: text,
        },
        {
          headers: {
            'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
            'x-rapidapi-key': '0d2d396b12mshf7b4b8c4930eb30p18ee4fjsn871385e35e84',
            'Content-Type': 'application/json',
          },//{ from: 'en', to: targetLang, query: text }
          //The server needs to know that this is a JSON object so it can parse it correctly.
        }
      );

      console.log('API Response:', JSON.stringify(response.data, null, 2));

      // Try to extract translation from various possible fields
      const translation =
        response.data?.data?.translations?.[0]?.translatedText ||
        response.data?.translatedText ||
        response.data?.result ||
        response.data?.data?.translated ||
        response.data?.data?.translatedText ||
        response.data?.responseData?.translatedText ||
        response.data?.translation ||
        response.data?.text ||
        response.data?.translated ||
        (typeof response.data === 'string' ? response.data : '');

      if (!translation) {
        throw new Error('Translation not found in response.');
      }

      setTranslated(translation);// a useState
    } catch (err) {
      console.error('Translation Error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Translation failed. Please try again.'
      );
    } finally {//This block always executes, regardless of whether an error occurred or not
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Translator</h1>

      <div className="mb-4">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Text (In English)
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type something....."
        />
      </div>

      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
          Target Language
        </label>
        <select
          id="language"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          
          {languages.map((lang) => (//This is a common React pattern. It iterates over an array called languages (which would presumably be an array of objects like { code: 'es', name: 'Spanish' }) and renders an <option> element for each language.
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={translateText}
        disabled={loading || !text.trim()}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {translated && !loading && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Translation:</h2>
          <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
            {translated}
          </div>
        </div>
      )}
    </div>
  );
};

export default Translator;
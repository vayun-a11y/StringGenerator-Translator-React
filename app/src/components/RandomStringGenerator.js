import React, { useState, useCallback, useEffect } from 'react';//built in react functions

const RandomStringGenerator = () => {
  const [length, setLength] = useState(12);//'length' holds the current value, 'setLength' is the function to update 'length'(12 is the value of the length variable) (same for every useState fn)
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Character sets
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';


  //useCallback ensures that generateString will only be re-created if length, includeNumbers, or includeSymbols actually change.
  //If those dependencies remain the same between renders, useCallback returns the exact same generateString function instance that it returned last time.
  const generateString = useCallback(() => {
    let characters = letters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    let newString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newString += characters[randomIndex];
    }
    
    setResult(newString);
    setCopied(false);
  }, [length, includeNumbers, includeSymbols]);
  //[length, includeNumbers, includeSymbols]-Tells useCallback when to re-create the function
  //math.random() gives random value from 0 to 1
  // Generate on initial render and when dependencies change
 
  useEffect(() => {
    generateString();
  }, [generateString]);
   //useEffect is React's way of saying: "Hey, after you've finished rendering (or re-rendering), and put everything on the screen, then run this piece of code."

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Random String Generator</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
            String Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">
              Include Numbers
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700">
              Include Symbols
            </label>
          </div>
        </div>

        <div className="mt-6 flex">
          <div className="flex-grow relative">
            <input
              type="text"
              value={result}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md font-mono focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <button
            onClick={generateString}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
          >
            Generate
          </button>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
        <ul className="text-blue-700 text-sm list-disc pl-5 space-y-1">
          <li>Adjust the slider to set string length (4-64 characters)</li>
          <li>Toggle number/symbol inclusion as needed</li>
          <li>Generated strings automatically update with settings changes</li>
          <li>Click "Generate" for a new random string</li>
        </ul>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
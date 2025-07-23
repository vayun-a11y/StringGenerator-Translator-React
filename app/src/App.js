import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Translator from './components/Translator';//importing Translator fn is Translator.js 
import RandomStringGenerator from './components/RandomStringGenerator';//importing RandomStringGenerator fn from RandomStringGenerator.js

function App() {
  return (//The component returns JSX, which looks like HTML but is actually JavaScript. This JSX describes what the UI should look like.
    <Router> 
      <div id="back" className="min-h-screen bg-gray-50">
        <nav className="bg-indigo-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">React Tools</h1>
            <ul className="flex space-x-6">
              <li>   
                <Link to="/"      className="hover:text-indigo-200 transition">
                  Random Strings
                </Link>
              </li>
              <li>
                <Link to="/translator" className="hover:text-indigo-200 transition">
                  Translator
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">

          <Routes>
            <Route path="/" element={<RandomStringGenerator />} />  
            <Route path="/translator" element={<Translator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );// <Route path="/" element={<RandomStringGenerator />} />This tells the router: "If the URL path is exactly / (the homepage), then render the <RandomStringGenerator (fn that is imported) /> component."<Route path="/translator" element={<Translator />} />: This says: "If the URL path is /translator, then render the <Translator (fn that is imported)/> component."
}

export default App; //This makes This makes App available for other files to use.this is how the function app() is called in another file(index.js)
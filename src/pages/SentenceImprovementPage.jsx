import React, { useState } from 'react';

const SentenceImprovementPage = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState(''); // Result from LanguageTool (correction)
  // const [reformulatedText, setReformulatedText] = useState(''); // Removed: Result from OpenAI (reformulation)
  const [inputLanguage, setInputLanguage] = useState('en-US'); // Default language - Changed to English for better API support
  const [outputLanguage, setOutputLanguage] = useState('vi-VN'); // Default language - Added Vietnamese output
  const [isLoadingLT, setIsLoadingLT] = useState(false); // Loading state for LanguageTool
  // const [isLoadingOpenAI, setIsLoadingOpenAI] = useState(false); // Removed: Loading state for OpenAI
  const [errorLT, setErrorLT] = useState(null); // Error state for LanguageTool
  // const [errorOpenAI, setErrorOpenAI] = useState(null); // Removed: Error state for OpenAI
  const [matches, setMatches] = useState([]); // State to store LanguageTool matches
  // const [activeTab, setActiveTab] = useState('correzier'); // Removed: No more tabs

  const LANGUAGETOOL_API_URL = 'https://api.languagetool.org/v2/check';
  // const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'; // Removed

  // SECURE YOUR API KEY! Use environment variables in a real application. (Removed OpenAI key)
  // const OPENAI_API_KEY = 'sk-proj-...'; // Removed

  // Function to handle text checking using LanguageTool API
  const handleCheckText = async () => {
    if (inputText.trim() === '') {
      setErrorLT('Please enter text to check.');
      setMatches([]);
      setCorrectedText('');
      return;
    }

    setIsLoadingLT(true);
    setErrorLT(null);
    setMatches([]);
    setCorrectedText('');

    try {
      const params = new URLSearchParams();
      params.append('text', inputText);
      params.append('language', inputLanguage); // Use selected input language
      params.append('enabledOnly', 'false'); // Include all rules
      params.append('languageForDetectedText', outputLanguage); // Suggest corrections in output language (if applicable)

      const response = await fetch(LANGUAGETOOL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LanguageTool API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        setMatches(data.matches); // Store matches

        // Optionally, generate corrected text by applying suggestions
        let textWithSuggestions = inputText;
        // Simple approach to apply the first suggestion for each match
        const sortedMatches = data.matches.sort((a, b) => a.offset - b.offset);
        let offsetShift = 0;

        sortedMatches.forEach(match => {
            if (match.replacements && match.replacements.length > 0) {
                const suggestion = match.replacements[0].value;
                const start = match.offset + offsetShift;
                const end = start + match.length;
                
                if (end <= textWithSuggestions.length) {
                     textWithSuggestions = textWithSuggestions.substring(0, start) + suggestion + textWithSuggestions.substring(end);
                     offsetShift += (suggestion.length - match.length);
                } else {
                   console.warn("Skipping overlapping or out-of-bounds match:", match);
                }
            }
        });
         setCorrectedText(textWithSuggestions); // Set corrected text with applied suggestions

      } else {
        setMatches([]); // No matches found
        setErrorLT('No suggestions found.'); // Indicate no errors found
        setCorrectedText(inputText); // Set corrected text to original if no errors
      }

    } catch (err) {
      console.error('Error checking text with LanguageTool:', err);
      setErrorLT('Failed to check text. Please try again.');
      setMatches([]);
      setCorrectedText('');
    } finally {
      setIsLoadingLT(false);
    }
  };

   // Function to handle text reformulation using OpenAI API (Removed)
   // const handleReformulateText = async () => { ... };

  // Function to get color based on issue type (simplified mapping)
  const getIssueColor = (issueType) => {
    switch (issueType) {
      case 'grammar':
        return 'bg-yellow-500'; // Yellow dot
      case 'misspelling':
        return 'bg-red-500'; // Red dot
      case 'style':
        return 'bg-blue-500'; // Blue dot
      default:
        return 'bg-gray-500'; // Default color
    }
  };


  // Buttons for Copy and Delete (placeholder functionality)
  const handleCopy = () => {
    // Copy the text from the corrected text area
    navigator.clipboard.writeText(correctedText);
    alert('Text copied!'); // Simple notification
  };

  const handleDelete = () => {
    setInputText('');
    setCorrectedText('');
    // setReformulatedText(''); // Removed
    setErrorLT(null);
    // setErrorOpenAI(null); // Removed
    setMatches([]);
  };

  // Trigger API calls when the main button is clicked
  const handleMainButtonClick = () => {
      handleCheckText(); // Only call LanguageTool
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cải thiện câu</h1>

      {/* Language Selection and Swap */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        {/* Input Language Dropdown */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
          value={inputLanguage}
          onChange={(e) => {
            setInputLanguage(e.target.value);
            setInputText('');
            setCorrectedText('');
            // setReformulatedText(''); // Removed
            setErrorLT(null);
            // setErrorOpenAI(null); // Removed
            setMatches([]);
          }}
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="vi-VN">Vietnamese</option>
          <option value="de-DE">German (Germany)</option>
          <option value="fr-FR">French (France)</option>
          <option value="es-ES">Spanish (Spain)</option>
           {/* Add more language options supported by LanguageTool API: https://languagetool.org/api/v2/languages */}
        </select>

      </div>

      {/* Main Content Area: Textarea and Suggestions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Textarea and Action Buttons */}
        <div className="md:col-span-2">
           {/* Action Buttons (Copy, Delete) */}
           <div className="flex justify-end space-x-2 mb-2">
             <button 
               onClick={handleCopy}
               className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
               aria-label="Copy text"
             >
               <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
               </svg>
               Copier
             </button>
             <button 
               onClick={handleDelete}
               className="flex items-center text-gray-600 hover:text-red-600 text-sm font-medium"
               aria-label="Delete text"
             >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10H4"></path>
               </svg>
               Supprimer
             </button>
           </div>

          {/* Input Textarea */}
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            placeholder="Nhập câu cần cải thiện..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        {/* Right Column: Suggestions Panel */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-96">
           {/* Panel Title */}
            <h3 className="font-semibold mb-4">Gợi ý ({matches.length})</h3>

           {/* Content for Suggestions */}
             <div>
               {isLoadingLT && <p className="text-gray-500">Đang kiểm tra...</p>}
               {errorLT && <p className="text-red-500">{errorLT}</p>}
               {!isLoadingLT && !errorLT && matches.length === 0 && inputText.trim() !== '' && 
                 <p className="text-gray-500">Không tìm thấy lỗi nào.</p>
               }
                {!isLoadingLT && !errorLT && inputText.trim() === '' && 
                 <p className="text-gray-500">Nhập văn bản để kiểm tra lỗi.</p>
               }
               
               {/* LanguageTool Matches */}
               <div className="space-y-4">
                 {matches.map((match, index) => (
                   <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                     <div className="flex items-center mb-2">
                        {/* Colored Dot */}
                        <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getIssueColor(match.rule.issueType || match.rule.category.issueType)}`}></span>
                        <p className="text-sm font-medium text-gray-800">{match.message}</p>
                     </div>
                     
                     {/* Context and Replacements */}
                     <div className="text-xs text-gray-600 space-y-1">
                        <p className="italic">"{match.context.text}"</p>
                        {match.replacements && match.replacements.length > 0 && (
                          <p>
                            Gợi ý: {match.replacements.map(rep => rep.value).join(', ')}
                          </p>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
             </div>

        </div>
      </div>

      {/* Action Button */}
       <div className="flex justify-center mt-6">
        <button
          className="bg-orange-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md"
          onClick={handleMainButtonClick}
          disabled={isLoadingLT}
        >
          {isLoadingLT ? 'Đang kiểm tra...' : 'Kiểm tra văn bản'}
        </button>
      </div>

    </div>
  );
};

export default SentenceImprovementPage; 
import React from 'react';

export default function Assistant({ assistantInput, assistantResponse, setAssistantInput, handleAssistantSubmit, isStreaming }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm mt-6">
      <h3 className="text-md font-semibold mb-2 text-gray-700">Need Help?</h3>
      <textarea
        className="w-full p-2 border rounded-md mb-2"
        value={assistantInput}
        onChange={(e) => setAssistantInput(e.target.value)}
        placeholder="Ask something like 'Which GPU is best for training LLMs?'"
      />
      <button className="bg-blue-600 text-white px-3 py-1 rounded-md" onClick={handleAssistantSubmit}>
        Ask
      </button>
      {assistantResponse && (
        <div className="mt-4 text-sm text-gray-800 whitespace-pre-wrap">
          {isStreaming ? <span className="animate-pulse">Typing...</span> : assistantResponse}
        </div>
      )}
    </div>
  );
}

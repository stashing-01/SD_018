import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">AceCloud GPU Finder</h1>
        <p className="mt-2 text-blue-100">Find the perfect GPU instance for your AI workload</p>
      </div>
    </header>
  );
}

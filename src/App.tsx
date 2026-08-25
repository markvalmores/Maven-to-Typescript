import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input, type: 'Java/Maven code' }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Conversion failed');
      }
      setOutput(data.ts);
    } catch (e) {
      console.error(e);
      setOutput(e instanceof Error ? e.message : 'Error converting');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-300 font-sans p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white tracking-tight">
          Maven<span className="text-indigo-400 font-normal">AI</span> Converter
        </h1>
        
        <div className="bg-[#0f1116] border border-white/5 rounded-lg p-4 mb-6">
          <textarea
            className="w-full h-40 p-4 bg-transparent border border-white/5 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your Java/Maven code here..."
          />
        </div>

        <button
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-semibold text-sm shadow-lg shadow-indigo-500/10 mb-6 transition-colors"
          onClick={convert}
          disabled={loading}
        >
          {loading ? 'Converting...' : 'Analyze & Convert'}
        </button>
        
        <pre className="p-6 bg-[#0c0d10] border border-white/5 rounded-lg font-mono text-sm overflow-auto text-slate-300">
          {output || '// Generated output will appear here...'}
        </pre>
      </div>
    </div>
  );
}

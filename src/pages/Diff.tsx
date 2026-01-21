import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Check, X, ArrowLeft, Download, Copy, CheckCircle } from 'lucide-react';

const originalCode = `function fetchUserData(userId) {
  const data = fetch('/api/users/' + userId).then(r => r.json());
  return data;
}`;

const refactoredCode = `async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`;

export default function Diff() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccept = () => {
    navigate('/dashboard');
  };

  const improvements = [
    'Added explicit TypeScript type annotations',
    'Converted to async/await for better readability',
    'Added comprehensive error handling',
    'Used template literals for string interpolation',
    'Added response status check',
    'Improved code structure and maintainability',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Code Comparison</h1>
            <p className="text-gray-400">Review the suggested changes</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopy}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <span className="text-white">Copy</span>
              </>
            )}
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4 text-white" />
            <span className="text-white">Download</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Changes Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 bg-gray-900/50 border border-gray-700 rounded-lg p-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-white mb-1">95</div>
              <div className="text-sm text-gray-400">Quality Score</div>
              <div className="mt-2 text-xs text-green-400">+23 from original</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-white mb-1">6</div>
              <div className="text-sm text-gray-400">Issues Fixed</div>
              <div className="mt-2 text-xs text-blue-400">100% resolution</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Original Code</h3>
              <span className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                Score: 72
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="typescript"
                value={originalCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Refactored Code</h3>
              <span className="bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                Score: 95
              </span>
            </div>
            <div className="border border-green-500/50 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="typescript"
                value={refactoredCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Reject</span>
          </button>
          <button
            onClick={handleAccept}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Accept Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

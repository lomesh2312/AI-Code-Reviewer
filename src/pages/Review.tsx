import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Code2, Sparkles, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Language, Context, Issue, Severity, Category } from '../types';
import { apiRequest } from '../api';

const sampleCode = `function fetchUserData(userId) {
  const data = fetch('/api/users/' + userId).then(r => r.json());
  return data;
}`;

export default function Review() {
  const navigate = useNavigate();
  const [code, setCode] = useState(sampleCode);
  const [language, setLanguage] = useState<Language>('TypeScript');
  const [context, setContext] = useState<Context>('Frontend');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const data = await apiRequest('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          code,
          language,
          context,
        }),
      });
      setIssues(data.issues);
    } catch (error) {
      console.error('Analysis failed:', error);
      // You might want to show an error notification here
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleIssue = (id: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIssues(newExpanded);
  };

  const getSeverityColor = (severity: Severity) => {
    const colors = {
      LOW: 'text-green-400 bg-green-500/20 border-green-500/30',
      MEDIUM: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      HIGH: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      CRITICAL: 'text-red-400 bg-red-500/20 border-red-500/30',
    };
    return colors[severity];
  };

  const getSeverityIcon = (severity: Severity) => {
    const icons = {
      LOW: Info,
      MEDIUM: AlertCircle,
      HIGH: AlertTriangle,
      CRITICAL: AlertCircle,
    };
    return icons[severity];
  };

  const getCategoryColor = (category: Category) => {
    const colors = {
      'Code Quality': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      'Performance': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      'Security': 'text-red-400 bg-red-500/20 border-red-500/30',
      'Best Practices': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      'Refactoring': 'text-green-400 bg-green-500/20 border-green-500/30',
    };
    return colors[category];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Code Review</h1>
        <p className="text-gray-400">Paste your code and get AI-powered feedback</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Code</h2>
              <Code2 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option>TypeScript</option>
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>Go</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Context</label>
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value as Context)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>API</option>
                  <option>Utility</option>
                </select>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="typescript"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">AI Feedback</h2>
              {issues.length > 0 && (
                <button
                  onClick={() => navigate('/diff/new')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                >
                  <span>View Refactored</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {issues.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400">Submit your code to see AI-powered feedback</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {issues.map((issue) => {
                  const SeverityIcon = getSeverityIcon(issue.severity);
                  const isExpanded = expandedIssues.has(issue.id);

                  return (
                    <div
                      key={issue.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleIssue(issue.id)}
                        className="w-full p-4 text-left hover:bg-gray-900/70 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(issue.category)}`}>
                              {issue.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                              <SeverityIcon className="w-3 h-3 inline mr-1" />
                              {issue.severity}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>

                        <h3 className="text-white font-semibold mb-1">{issue.title}</h3>
                        <p className="text-gray-400 text-sm">{issue.description}</p>
                        {issue.lineNumber && (
                          <p className="text-gray-500 text-xs mt-2">Line {issue.lineNumber}</p>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-700 p-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Explanation</h4>
                            <p className="text-gray-400 text-sm">{issue.explanation}</p>
                          </div>

                          {issue.refactoredExample && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-2">Suggested Fix</h4>
                              <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                                <pre className="text-sm text-gray-300 overflow-x-auto">
                                  <code>{issue.refactoredExample}</code>
                                </pre>
                              </div>
                            </div>
                          )}

                          <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors">
                            Apply Fix
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

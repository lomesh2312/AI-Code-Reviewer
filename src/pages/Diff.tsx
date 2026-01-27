import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Check, X, ArrowLeft, Download, Copy, CheckCircle } from 'lucide-react';
import { apiRequest } from '../api';
import { Review } from '../types';

export default function Diff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchReview = async () => {
        try {
          const data = await apiRequest(`/reviews/${id}`);
          setReview(data);
        } catch (error) {
          console.error('Failed to fetch review:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchReview();
    }
  }, [id]);

  const refactoredCode = useMemo(() => {
    if (!review) return '';
    // If we have a stored refactoredCode, use it. 
    // Otherwise, try to construct it or just show the last issue's example
    if (review.refactoredCode) return review.refactoredCode;

    const lastIssueWithFix = [...review.issues].reverse().find(i => i.refactoredExample);
    return lastIssueWithFix?.refactoredExample || review.code;
  }, [review]);

  const handleCopy = () => {
    if (refactoredCode) {
      navigator.clipboard.writeText(refactoredCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAccept = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Review not found</h2>
        <button
          onClick={() => navigate('/history')}
          className="text-blue-400 hover:text-blue-300"
        >
          Back to History
        </button>
      </div>
    );
  }

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
            <p className="text-gray-400">Review the suggested changes for {review.language}</p>
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
              {review.issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 bg-gray-900/50 border border-gray-700 rounded-lg p-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{issue.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-white mb-1">{review.severityScore}</div>
              <div className="text-sm text-gray-400">Quality Score</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-white mb-1">{review.issues.length}</div>
              <div className="text-sm text-gray-400">Issues Found</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Original Code</h3>
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                {review.language}
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage={review.language.toLowerCase()}
                value={review.code || review.originalCode}
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
                Optimized
              </span>
            </div>
            <div className="border border-green-500/50 rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage={review.language.toLowerCase()}
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

import { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { apiRequest } from '../api';

interface Review {
  _id: string;
  originalCode: string;
  language: string;
  context: string;
  issues: any[];
  severityScore: number;
  createdAt: string;
}

export default function History() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await apiRequest('/reviews');
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getSeverityColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'All' || review.language === filter;
    const matchesSearch = review.originalCode.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Review History</h1>
          <p className="text-gray-400">Track your code improvements over time</p>
        </div>

        <div className="flex space-x-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">{reviews.length}</div>
            <div className="text-xs text-gray-400">Total Reviews</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {reviews.length > 0
                ? Math.round(reviews.reduce((acc, r) => acc + r.severityScore, 0) / reviews.length)
                : 0}%
            </div>
            <div className="text-xs text-gray-400">Avg. Score</div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-gray-800/50 border border-gray-700 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option>All</option>
            <option>TypeScript</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading history...</div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No reviews found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  <th className="p-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Language</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Context</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Score</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Issues</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredReviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-white">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium border border-blue-500/30">
                        {review.language}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{review.context}</td>
                    <td className="p-4">
                      <div className={`font-bold ${getSeverityColor(review.severityScore)}`}>
                        {review.severityScore}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <AlertCircle className="w-4 h-4 text-orange-400" />
                        <span>{review.issues.length}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

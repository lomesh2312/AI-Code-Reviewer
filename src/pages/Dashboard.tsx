import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Code2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiRequest } from '../api';
import { Review, Category, Severity } from '../types';

export default function Dashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiRequest('/reviews');
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const analytics = useMemo(() => {
    const totalReviews = reviews.length;
    const avgSeverityScore = totalReviews > 0
      ? Math.round(reviews.reduce((acc, r) => acc + r.severityScore, 0) / totalReviews)
      : 0;

    const issuesByCategory: Record<Category, number> = {
      'Code Quality': 0,
      'Performance': 0,
      'Security': 0,
      'Best Practices': 0,
      'Refactoring': 0,
    };

    const severityDistribution: Record<Severity, number> = {
      'LOW': 0,
      'MEDIUM': 0,
      'HIGH': 0,
      'CRITICAL': 0,
    };

    reviews.forEach(review => {
      review.issues.forEach(issue => {
        if (issuesByCategory[issue.category] !== undefined) {
          issuesByCategory[issue.category]++;
        }
        if (severityDistribution[issue.severity] !== undefined) {
          severityDistribution[issue.severity]++;
        }
      });
    });

    const totalIssues = Object.values(severityDistribution).reduce((a, b) => a + b, 0);

    return {
      totalReviews,
      avgSeverityScore,
      totalIssues,
      issuesByCategory,
      severityDistribution,
    };
  }, [reviews]);

  const categoryData = Object.entries(analytics.issuesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const severityData = Object.entries(analytics.severityDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const trendData = reviews.slice(-5).reverse().map((r, i) => ({
    date: `Review ${reviews.length - reviews.slice(-5).length + i + 1}`,
    score: r.severityScore,
  }));

  const COLORS = {
    'LOW': '#10b981',
    'MEDIUM': '#f59e0b',
    'HIGH': '#f97316',
    'CRITICAL': '#ef4444',
  };

  const CATEGORY_COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your code quality and improvement over time</p>
        </div>
        <Link
          to="/review"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center space-x-2"
        >
          <Code2 className="w-5 h-5" />
          <span>New Review</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.totalReviews}</div>
          <div className="text-sm text-gray-400">Total Reviews</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{analytics.avgSeverityScore}</div>
          <div className="text-sm text-gray-400">Avg Quality Score</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {reviews.length > 1
              ? `${reviews[0].severityScore - reviews[reviews.length - 1].severityScore > 0 ? '+' : ''}${reviews[0].severityScore - reviews[reviews.length - 1].severityScore}`
              : 0}%
          </div>
          <div className="text-sm text-gray-400">Improvement</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {analytics.totalIssues}
          </div>
          <div className="text-sm text-gray-400">Total Issues Found</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quality Trend</h2>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No data yet</div>
          )}
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Issues by Category</h2>
          {categoryData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No data yet</div>
          )}
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Severity Distribution</h2>
          {severityData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">No data yet</div>
          )}
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Reviews</h2>
            <Link to="/history" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {reviews.length > 0 ? reviews.slice(0, 3).map((review) => (
              <Link
                key={review.id}
                to={`/review/${review.id}`}
                className="block bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{review.language}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-400">{review.context}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-white">{review.severityScore}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                        style={{ width: `${review.severityScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{review.issues.length} issues</div>
                </div>
              </Link>
            )) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No reviews yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

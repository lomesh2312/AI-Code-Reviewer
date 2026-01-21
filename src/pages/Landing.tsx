import { Link } from 'react-router-dom';
import { Code2, Shield, TrendingUp, Zap, CheckCircle, ArrowRight, Github, Twitter, Sparkles } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: 'Security Analysis',
      description: 'Detect SQL injections, XSS vulnerabilities, and unsafe patterns before they reach production.',
    },
    {
      icon: Zap,
      title: 'Performance Insights',
      description: 'Identify bottlenecks, redundant operations, and optimization opportunities instantly.',
    },
    {
      icon: TrendingUp,
      title: 'Quality Tracking',
      description: 'Monitor code quality trends and celebrate improvements over time with detailed analytics.',
    },
    {
      icon: Code2,
      title: 'Smart Refactoring',
      description: 'Get actionable suggestions with before/after comparisons and clear explanations.',
    },
  ];

  const categories = [
    'Code Quality',
    'Performance',
    'Security',
    'Best Practices',
    'Refactoring',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <nav className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CodeCoach
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">AI-Powered Code Analysis</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            AI Code Review That
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Thinks Like a Senior Engineer
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Get structured, opinionable, explainable code reviews with category-based analysis,
            severity scoring, and actionable refactoring suggestions.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-16">
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Review My Code</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-gray-700"
            >
              See How It Works
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-4 py-3 rounded-lg text-sm font-medium text-gray-300"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            How It <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Your Code',
                description: 'Paste your code or upload a file. Select language and context for targeted analysis.',
              },
              {
                step: '02',
                title: 'AI Analyzes',
                description: 'Our AI examines your code across 5 categories with severity scoring and detailed explanations.',
              },
              {
                step: '03',
                title: 'Review & Improve',
                description: 'See issues, apply suggestions, and track your code quality improvement over time.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl hover:border-blue-500/50 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl hover:border-blue-500/50 transition-all group"
                >
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-y border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Level Up Your Code?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join developers who are writing better, safer, and more maintainable code.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
          >
            <span>Start Reviewing Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900/50 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CodeCoach
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2024 CodeCoach. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

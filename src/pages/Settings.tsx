import { useState } from 'react';
import { User, Bell, Shield, Code, Save, CheckCircle } from 'lucide-react';
import { mockUser } from '../data/mockData';

export default function Settings() {
  const [preferences, setPreferences] = useState(mockUser.preferences);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your code review experience</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={mockUser.displayName}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={mockUser.email}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Code Review Preferences</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Analysis Strictness
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['lenient', 'moderate', 'strict'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPreferences({ ...preferences, strictness: level as any })}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        preferences.strictness === level
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-900/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {preferences.strictness === 'lenient' && 'Focus on critical issues only'}
                  {preferences.strictness === 'moderate' && 'Balanced analysis of code quality'}
                  {preferences.strictness === 'strict' && 'Comprehensive code review with all suggestions'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Coding Standard
                </label>
                <select
                  value={preferences.codingStandard}
                  onChange={(e) => setPreferences({ ...preferences, codingStandard: e.target.value as any })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="standard">Standard</option>
                  <option value="google">Google Style Guide</option>
                  <option value="airbnb">Airbnb Style Guide</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Choose your preferred coding style guide for reviews
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                <div>
                  <div className="font-medium text-white mb-1">Email Notifications</div>
                  <div className="text-sm text-gray-400">
                    Receive updates about your code reviews
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                <div>
                  <div className="font-medium text-white mb-1">Weekly Summary</div>
                  <div className="text-sm text-gray-400">
                    Get a weekly report of your code quality metrics
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors">
                <div>
                  <div className="font-medium text-white mb-1">Critical Issues Alert</div>
                  <div className="text-sm text-gray-400">
                    Immediate notification for critical security issues
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Security</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your code is analyzed securely and never stored permanently
            </p>
            <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors">
              Privacy Policy
            </button>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Member since</span>
                <span className="text-white font-medium">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total reviews</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Issues fixed</span>
                <span className="text-white font-medium">34</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
          >
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

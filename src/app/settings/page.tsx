'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download,
  Trash2,
  Save,
  Key,
  Smartphone,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      studyComplete: true,
      weeklyReport: true,
      insightsUnlock: true,
      systemUpdates: false
    },
    privacy: {
      dataRetention: '1year',
      shareAnalytics: false,
      allowCookies: true
    },
    appearance: {
      theme: 'light',
      compactMode: false
    },
    security: {
      twoFactorEnabled: false,
      securityQuestion1: '',
      securityAnswer1: '',
      securityQuestion2: '',
      securityAnswer2: '',
      lastPasswordChange: '2024-11-15'
    }
  });
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (!isLoggedIn || !email) {
      router.push('/login');
      return;
    }

    setUserEmail(email);

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load mock security data based on user
    const mockSecurityData = {
      'frederic@paperminds.ai': {
        twoFactorEnabled: true,
        securityQuestion1: 'What was the name of your first pet?',
        securityAnswer1: 'Buddy',
        securityQuestion2: 'In what city were you born?',
        securityAnswer2: 'Paris',
        lastPasswordChange: '2024-12-01'
      },
      'zhen@paperminds.ai': {
        twoFactorEnabled: false,
        securityQuestion1: 'What is your mother\'s maiden name?',
        securityAnswer1: 'Chen',
        securityQuestion2: 'What was your first car?',
        securityAnswer2: 'Honda Civic',
        lastPasswordChange: '2024-10-15'
      },
      'nicolas@paperminds.ai': {
        twoFactorEnabled: true,
        securityQuestion1: 'What elementary school did you attend?',
        securityAnswer1: 'Saint-Joseph',
        securityQuestion2: 'What is your favorite movie?',
        securityAnswer2: 'Inception',
        lastPasswordChange: '2024-11-20'
      }
    };

    const userSecurityData = mockSecurityData[email as keyof typeof mockSecurityData];
    if (userSecurityData) {
      setSettings(prev => ({
        ...prev,
        security: userSecurityData
      }));
    }
  }, [router]);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    // Show success message (you could add a toast here)
    alert('Settings saved successfully!');
  };

  const handlePasswordReset = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Mock password reset
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        lastPasswordChange: new Date().toISOString().split('T')[0]
      }
    }));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordReset(false);
    alert('Password updated successfully!');
  };

  const toggleTwoFactor = () => {
    if (!settings.security.twoFactorEnabled) {
      // Mock 2FA setup
      alert('2FA setup initiated. In a real app, you would scan a QR code or enter a phone number.');
    }
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        twoFactorEnabled: !prev.security.twoFactorEnabled
      }
    }));
  };

  const updateSecurityQuestion = (questionNum: number, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [`securityQuestion${questionNum}`]: field === 'question' ? value : prev.security[`securityQuestion${questionNum}` as keyof typeof prev.security],
        [`securityAnswer${questionNum}`]: field === 'answer' ? value : prev.security[`securityAnswer${questionNum}` as keyof typeof prev.security]
      }
    }));
  };

  const exportData = () => {
    // Mock data export
    const data = {
      user: userEmail,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paperminds-data-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.clear();
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5eb] via-[#f5f0e0] to-[#f9f5eb]">
      <Navigation userEmail={userEmail} showInsights={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </motion.div>

        <div className="space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Account</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {key === 'studyComplete' && 'Get notified when studies are completed'}
                      {key === 'weeklyReport' && 'Receive weekly summary reports'}
                      {key === 'insightsUnlock' && 'Notifications for new insights and features'}
                      {key === 'systemUpdates' && 'System maintenance and update notifications'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention</label>
                <select
                  value={settings.privacy.dataRetention}
                  onChange={(e) => handleSettingChange('privacy', 'dataRetention', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="indefinite">Indefinite</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Share Analytics</h3>
                  <p className="text-xs text-gray-500">Help improve our service by sharing anonymous usage data</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.shareAnalytics}
                    onChange={(e) => handleSettingChange('privacy', 'shareAnalytics', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Allow Cookies</h3>
                  <p className="text-xs text-gray-500">Enable cookies for better user experience</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.allowCookies}
                    onChange={(e) => handleSettingChange('privacy', 'allowCookies', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </div>
            
            <div className="space-y-6">
              {/* Password Reset */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Password</h3>
                    <p className="text-xs text-gray-500">Last changed: {settings.security.lastPasswordChange}</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordReset(!showPasswordReset)}
                    className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                </div>
                
                {showPasswordReset && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handlePasswordReset}
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordReset(false);
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center space-x-3">
                  {settings.security.twoFactorEnabled && (
                    <span className="text-xs text-green-600 font-medium">Enabled</span>
                  )}
                  <button
                    onClick={toggleTwoFactor}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      settings.security.twoFactorEnabled
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {settings.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>

              {/* Security Questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Security Questions
                    </h3>
                    <p className="text-xs text-gray-500">Used for account recovery</p>
                  </div>
                  <button
                    onClick={() => setShowSecurityQuestions(!showSecurityQuestions)}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {showSecurityQuestions ? 'Hide' : 'Manage'}
                  </button>
                </div>
                
                {showSecurityQuestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="space-y-6">
                      {/* Security Question 1 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Security Question 1</label>
                        <input
                          type="text"
                          value={settings.security.securityQuestion1}
                          onChange={(e) => updateSecurityQuestion(1, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2"
                          placeholder="Enter your security question"
                        />
                        <input
                          type="text"
                          value={settings.security.securityAnswer1}
                          onChange={(e) => updateSecurityQuestion(1, 'answer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your answer"
                        />
                      </div>
                      
                      {/* Security Question 2 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Security Question 2</label>
                        <input
                          type="text"
                          value={settings.security.securityQuestion2}
                          onChange={(e) => updateSecurityQuestion(2, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2"
                          placeholder="Enter your security question"
                        />
                        <input
                          type="text"
                          value={settings.security.securityAnswer2}
                          onChange={(e) => updateSecurityQuestion(2, 'answer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your answer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Compact Mode</h3>
                  <p className="text-xs text-gray-500">Use smaller spacing and elements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.appearance.compactMode}
                    onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data & Account</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={saveSettings}
                className="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
              
              <button
                onClick={exportData}
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              
              <button
                onClick={deleteAccount}
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

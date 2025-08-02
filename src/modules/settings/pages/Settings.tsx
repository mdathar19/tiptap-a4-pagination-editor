import React, { memo } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import Button from '../../../components/global/Button/Button';
import Input from '../../../components/global/Input/Input';
import Dropdown from '../../../components/global/Dropdown/Dropdown';

const Settings = memo(() => {
  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Settings</h1>
          <p className="text-secondary-600">Manage your application preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white rounded-lg border border-secondary-200">
          <div className="p-4 border-b border-secondary-200">
            <h2 className="font-semibold text-secondary-900">Categories</h2>
          </div>
          <nav className="p-4 space-y-2">
            {[
              { icon: User, label: 'Profile', active: true },
              { icon: Bell, label: 'Notifications' },
              { icon: Shield, label: 'Security' },
              { icon: Palette, label: 'Appearance' },
            ].map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  active
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg border border-secondary-200">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Profile Settings</h2>
              <p className="text-sm text-secondary-600">Update your personal information</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="John" />
                <Input label="Last Name" defaultValue="Doe" />
              </div>
              <Input label="Email" type="email" defaultValue="john.doe@example.com" />
              <Input label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />
              <div className="flex justify-end">
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg border border-secondary-200">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Appearance</h2>
              <p className="text-sm text-secondary-600">Customize how the app looks</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Theme"
                  options={themeOptions}
                  value="light"
                />
                <Dropdown
                  label="Language"
                  options={languageOptions}
                  value="en"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="primary">Apply Settings</Button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-secondary-200">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Notifications</h2>
              <p className="text-sm text-secondary-600">Manage your notification preferences</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Email notifications', description: 'Receive notifications via email' },
                { label: 'Push notifications', description: 'Receive push notifications' },
                { label: 'Document updates', description: 'Get notified when documents are updated' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-secondary-900">{item.label}</h3>
                    <p className="text-sm text-secondary-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Settings.displayName = 'Settings';

export default Settings;
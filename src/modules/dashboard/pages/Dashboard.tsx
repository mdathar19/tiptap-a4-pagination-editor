import React, { memo } from 'react';
import {
  FileText,
  Edit3,
  Users,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  Plus,
} from 'lucide-react';
import Button from '../../../components/global/Button/Button';
import { useAppSelector } from '../../../store';
import { useNavigate } from 'react-router-dom';

const Dashboard = memo(() => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const stats = [
    {
      title: 'Total Documents',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Words Written',
      value: '12.4K',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Edit3,
      color: 'bg-green-500',
    },
    {
      title: 'Collaborators',
      value: '8',
      change: '+2',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Hours Saved',
      value: '156',
      change: '+23%',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  const recentDocuments = [
    {
      id: '1',
      title: 'Municipal Corporation Guidelines',
      lastModified: '2 hours ago',
      author: 'John Doe',
      status: 'Draft',
      progress: 85,
    },
    {
      id: '2',
      title: 'Policy Documentation',
      lastModified: '1 day ago',
      author: 'Jane Smith',
      status: 'Review',
      progress: 100,
    },
    {
      id: '3',
      title: 'Project Proposal',
      lastModified: '3 days ago',
      author: 'Mike Johnson',
      status: 'Published',
      progress: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {currentUser?.name || 'User'}! 👋
            </h1>
            <p className="text-primary-100">
              Ready to create something amazing today? Let's get started with your documents.
            </p>
          </div>
          <Button
            onClick={() => navigate('/app/editor')}
            variant="ghost"
            className='text-white'
            leftIcon={<Plus size={20} />}
          >
            New Document
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg border border-secondary-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-secondary-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-secondary-200">
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900">Recent Documents</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{doc.title}</h3>
                      <p className="text-sm text-secondary-500">
                        by {doc.author} • {doc.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : doc.status === 'Review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                    <div className="w-16 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${doc.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-secondary-200">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Plus size={18} />}
                className="justify-start"
              >
                Create New Document
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<FileText size={18} />}
                className="justify-start"
              >
                Browse Templates
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Users size={18} />}
                className="justify-start"
              >
                Invite Collaborators
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<BarChart3 size={18} />}
                className="justify-start"
              >
                View Analytics
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Star size={18} />}
                className="justify-start"
              >
                Favorite Documents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
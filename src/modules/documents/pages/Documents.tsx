import React, { memo } from 'react';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import Button from '../../../components/global/Button/Button';
import Input from '../../../components/global/Input/Input';

const Documents = memo(() => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Documents</h1>
          <p className="text-secondary-600">Manage and organize your documents</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={20} />}
        >
          New Document
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-secondary-200 p-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search documents..."
            leftIcon={<Search size={16} />}
            className="flex-1"
          />
          <Button variant="outline" leftIcon={<Filter size={16} />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg border border-secondary-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Document {item}</h3>
            <p className="text-sm text-secondary-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex items-center justify-between text-xs text-secondary-500">
              <span>Modified 2 days ago</span>
              <span>1.2 KB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Documents.displayName = 'Documents';

export default Documents;
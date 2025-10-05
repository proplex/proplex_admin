import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Building2, FileText, BarChart2, Users, CreditCard, FileCheck, Settings,
  MoreHorizontal, ChevronRight, Check, X, Clock, AlertCircle, Mail, Phone, Globe,
  MapPin, Calendar, TrendingUp, Briefcase, DollarSign, Download, Upload, Trash2,
  Edit, Plus, Eye, Search, Filter
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
interface Contact {
  email: string;
  phone: string;
}

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  value: string;
  status: 'owned' | 'leased' | 'rented';
}

interface Financial {
  year: string;
  revenue: string;
  expenses: string;
  profit: string;
  growth: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: string;
}

interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  industry: string;
  status: 'active' | 'pending' | 'inactive';
  created_at: string;
  total_property: number;
  revenue: string;
  employees: number;
  description: string;
  address: string;
  website: string;
  contact: Contact;
  properties: Property[];
  financials: Financial[];
  documents: Document[];
}

/* ------------------------------------------------------------------ */
/* Mock                                                               */
/* ------------------------------------------------------------------ */
const mockCompanyData: Company = {
  id: 'DV003',
  name: 'TechCorp Solutions',
  registrationNumber: 'TC001',
  industry: 'Technology',
  status: 'active',
  created_at: '2024-01-15T08:30:00Z',
  total_property: 12,
  revenue: '2400000',
  employees: 45,
  description:
    'A leading technology solutions provider specializing in enterprise software development and IT consulting services.',
  address: '123 Tech Park, Bangalore, Karnataka 560001',
  website: 'www.techcorp.com',
  contact: {
    email: 'contact@techcorp.com',
    phone: '+91 80 1234 5678',
  },
  properties: [
    { id: 'P001', name: 'Tech Hub Building A', location: 'Bangalore', type: 'Office', value: '$1,200,000', status: 'owned' },
    { id: 'P002', name: 'Innovation Center', location: 'Hyderabad', type: 'Office', value: '$850,000', status: 'owned' },
    { id: 'P003', name: 'Data Center Complex', location: 'Mumbai', type: 'Industrial', value: '$2,100,000', status: 'leased' },
    { id: 'P004', name: 'Research Lab', location: 'Pune', type: 'Office', value: '$650,000', status: 'owned' },
  ],
  financials: [
    { year: '2024', revenue: '2,400,000', expenses: '1,800,000', profit: '600,000', growth: '+12%' },
    { year: '2023', revenue: '2,150,000', expenses: '1,650,000', profit: '500,000', growth: '+8%' },
    { year: '2022', revenue: '2,000,000', expenses: '1,600,000', profit: '400,000', growth: '+15%' },
  ],
  documents: [
    { id: 'D001', name: 'Company Registration Certificate', type: 'PDF', size: '2.4 MB', date: '2024-01-15', category: 'Legal' },
    { id: 'D002', name: 'Tax Returns 2024', type: 'PDF', size: '1.8 MB', date: '2024-03-30', category: 'Financial' },
    { id: 'D003', name: 'Annual Report 2023', type: 'PDF', size: '5.2 MB', date: '2024-02-01', category: 'Reports' },
    { id: 'D004', name: 'Insurance Policy', type: 'PDF', size: '1.2 MB', date: '2024-01-20', category: 'Legal' },
  ],
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const CompanyDetail: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'financials' | 'documents'>('overview');

  /* Modal states */
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        await new Promise((r) => setTimeout(r, 500));
        setCompany(mockCompanyData);
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h3>
          <p className="text-gray-600 mb-8">The company you're looking for doesn't exist or has been removed from our records.</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Modals                                                           */
  /* ---------------------------------------------------------------- */
  type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
  };

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'medium' }) => {
    if (!isOpen) return null;

    const sizeClasses = { small: 'max-w-md', medium: 'max-w-2xl', large: 'max-w-4xl' };
    const sizeClass = sizeClasses[size] ?? sizeClasses.medium;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className={`inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClass} w-full`}>
            <div className="bg-white px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EditCompanyModal: React.FC = () => (
    <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Company Details" size="large">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" defaultValue={company.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
            <input type="text" defaultValue={company.registrationNumber} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input type="text" defaultValue={company.industry} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select defaultValue={company.status} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea defaultValue={company.description} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" defaultValue={company.address} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input type="text" defaultValue={company.website} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" defaultValue={company.contact.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" defaultValue={company.contact.phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
            <input type="number" defaultValue={company.employees} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={() => setShowEditModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      </form>
    </Modal>
  );

  const DeleteCompanyModal: React.FC = () => (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Company" size="small">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="h-8 w-8 text-red-600" />
        </div>
        <p className="text-gray-700 mb-6">Are you sure you want to delete <strong>{company.name}</strong>? This action cannot be undone.</p>
        <div className="flex space-x-3">
          <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Delete</button>
        </div>
      </div>
    </Modal>
  );

  const PropertyModal: React.FC = () => (
    <Modal isOpen={showPropertyModal} onClose={() => { setShowPropertyModal(false); setSelectedProperty(null); }} title={selectedProperty ? 'Property Details' : 'Add New Property'} size="medium">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
            <input type="text" defaultValue={selectedProperty?.name} placeholder="Enter property name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property ID</label>
            <input type="text" defaultValue={selectedProperty?.id} placeholder="Auto-generated" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" defaultValue={selectedProperty?.location} placeholder="City, State" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select defaultValue={selectedProperty?.type} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select type</option>
              <option value="Office">Office</option>
              <option value="Industrial">Industrial</option>
              <option value="Retail">Retail</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input type="text" defaultValue={selectedProperty?.value} placeholder="$0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select defaultValue={selectedProperty?.status} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="owned">Owned</option>
              <option value="leased">Leased</option>
              <option value="rented">Rented</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={() => { setShowPropertyModal(false); setSelectedProperty(null); }} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">{selectedProperty ? 'Update' : 'Add'} Property</button>
        </div>
      </form>
    </Modal>
  );

  const DocumentModal: React.FC = () => (
    <Modal isOpen={showDocumentModal} onClose={() => setShowDocumentModal(false)} title="Upload Document" size="medium">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
          <input type="text" placeholder="Enter document name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Select category</option>
            <option value="Legal">Legal</option>
            <option value="Financial">Financial</option>
            <option value="Reports">Reports</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={() => setShowDocumentModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Upload</button>
        </div>
      </form>
    </Modal>
  );

  const ActionModal: React.FC = () => (
    <Modal isOpen={showActionModal} onClose={() => setShowActionModal(false)} title="Take Action" size="medium">
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Approve Company</p>
              <p className="text-sm text-gray-500">Verify and activate company profile</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Mark as Pending</p>
              <p className="text-sm text-gray-500">Request additional information</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Suspend Company</p>
              <p className="text-sm text-gray-500">Temporarily deactivate company</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Modal>
  );

  /* ---------------------------------------------------------------- */
  /* Tabs                                                             */
  /* ---------------------------------------------------------------- */
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'financials', label: 'Financials', icon: BarChart2 },
    { id: 'documents', label: 'Documents', icon: FileCheck },
  ] as const;

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Modals */}
      <EditCompanyModal />
      <DeleteCompanyModal />
      <PropertyModal />
      <DocumentModal />
      <ActionModal />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      company.status === 'active'
                        ? 'bg-green-100 text-green-700 ring-2 ring-green-200'
                        : company.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200'
                        : 'bg-red-100 text-red-700 ring-2 ring-red-200'
                    }`}
                  >
                    {company.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">ID: {company.registrationNumber} • {company.industry}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => setShowEditModal(true)} className="px-5 py-2.5 border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all">
                <Settings className="h-4 w-4 inline-block mr-2" />
                Edit
              </button>
              <button onClick={() => setShowActionModal(true)} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
                <Check className="h-4 w-4 inline-block mr-2" />
                Take Action
              </button>
              <button className="p-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-all ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <Building2 className="h-8 w-8 opacity-80" />
                      <ChevronRight className="h-5 w-5 opacity-60" />
                    </div>
                    <p className="text-blue-100 text-sm font-medium mb-1">Total Properties</p>
                    <p className="text-3xl font-bold">{company.total_property}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-8 w-8 opacity-80" />
                      <ChevronRight className="h-5 w-5 opacity-60" />
                    </div>
                    <p className="text-green-100 text-sm font-medium mb-1">Annual Revenue</p>
                    <p className="text-3xl font-bold">${(parseInt(company.revenue) / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-8 w-8 opacity-80" />
                      <ChevronRight className="h-5 w-5 opacity-60" />
                    </div>
                    <p className="text-purple-100 text-sm font-medium mb-1">Employees</p>
                    <p className="text-3xl font-bold">{company.employees}</p>
                  </div>
                </div>

                {/* Company Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                    Company Information
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                        <p className="text-gray-900">{company.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                        <a href={`https://${company.website}`} className="text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">
                          {company.website}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Mail className="h-6 w-6 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900 font-medium">{company.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900 font-medium">{company.contact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'properties' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                    Properties ({company.properties.length})
                  </h3>
                  <button onClick={() => setShowPropertyModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </button>
                </div>
                <div className="space-y-3">
                  {company.properties.map((property) => (
                    <div key={property.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{property.name}</h4>
                            <p className="text-sm text-gray-500">{property.location} • {property.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{property.value}</p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                property.status === 'owned' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {property.status.toUpperCase()}
                            </span>
                          </div>
                          <button onClick={() => { setSelectedProperty(property); setShowPropertyModal(true); }} className="p-2 hover:bg-gray-100 rounded-lg">
                            <Eye className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart2 className="h-6 w-6 mr-2 text-blue-600" />
                    Financial Overview
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Expenses</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Profit</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {company.financials.map((year, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium text-gray-900">{year.year}</td>
                            <td className="py-4 px-4 text-right text-gray-900">${parseInt(year.revenue.replace(/,/g, '')).toLocaleString()}</td>
                            <td className="py-4 px-4 text-right text-gray-900">${parseInt(year.expenses.replace(/,/g, '')).toLocaleString()}</td>
                            <td className="py-4 px-4 text-right font-semibold text-green-600">${parseInt(year.profit.replace(/,/g, '')).toLocaleString()}</td>
                            <td className="py-4 px-4 text-right">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{year.growth}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                    <DollarSign className="h-8 w-8 mb-2 opacity-80" />
                    <p className="text-green-100 text-sm font-medium mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">${(parseInt(company.revenue) / 1000000).toFixed(1)}M</p>
                    <p className="text-green-100 text-sm mt-2">Current Year</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <TrendingUp className="h-8 w-8 mb-2 opacity-80" />
                    <p className="text-blue-100 text-sm font-medium mb-1">Profit Margin</p>
                    <p className="text-3xl font-bold">25%</p>
                    <p className="text-blue-100 text-sm mt-2">Average</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <BarChart2 className="h-8 w-8 mb-2 opacity-80" />
                    <p className="text-purple-100 text-sm font-medium mb-1">Growth Rate</p>
                    <p className="text-3xl font-bold">+12%</p>
                    <p className="text-purple-100 text-sm mt-2">Year over Year</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <FileCheck className="h-6 w-6 mr-2 text-blue-600" />
                      Documents ({company.documents.length})
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Manage company documents and files</p>
                  </div>
                  <button onClick={() => setShowDocumentModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </button>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>

                <div className="space-y-2">
                  {company.documents.map((doc) => (
                    <div key={doc.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.size} • {doc.type} • Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{doc.category}</span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Download className="h-5 w-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Eye className="h-5 w-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg">
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Company Active</p>
                    <p className="text-xs text-gray-500">Current status</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Registered</p>
                    <p className="text-xs text-gray-500">{new Date(company.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={() => setActiveTab('properties')} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                  <span className="font-medium">View Properties</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setActiveTab('financials')} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                  <span className="font-medium">Financial Reports</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setActiveTab('documents')} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                  <span className="font-medium">Documents</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">Contact our support team for assistance with this company profile.</p>
              <button className="w-full bg-white text-blue-600 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border-2 border-red-200 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Danger Zone
              </h3>
              <p className="text-sm text-gray-600 mb-4">Irreversible and destructive actions</p>
              <button onClick={() => setShowDeleteModal(true)} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
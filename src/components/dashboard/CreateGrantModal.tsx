import React, { useState } from 'react';
import { X, Plus, Minus, DollarSign, Calendar, Users, FileText, Coins, Receipt } from 'lucide-react';

interface CreateGrantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGrantModal: React.FC<CreateGrantModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'USD',
    category: 'healthcare',
    deadline: '',
    maxApplications: '',
    eligibility: [''],
    requirements: ['']
  });

  const [calculatedFee, setCalculatedFee] = useState(0);

  React.useEffect(() => {
    if (formData.amount) {
      // Calculate 2.5% transaction fee
      const fee = parseFloat(formData.amount) * 0.025;
      setCalculatedFee(fee);
    } else {
      setCalculatedFee(0);
    }
  }, [formData.amount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit to your backend
    console.log('Creating grant:', { ...formData, transactionFee: calculatedFee });
    onClose();
  };

  const addField = (field: 'eligibility' | 'requirements') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeField = (field: 'eligibility' | 'requirements', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const updateField = (field: 'eligibility' | 'requirements', index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({
      ...formData,
      [field]: updated
    });
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Grant</h2>
              <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grant Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="Enter a descriptive title for your grant"
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="Describe the purpose and goals of your grant"
                    required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grant Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                        placeholder="0"
                        required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="SUI">SUI - Sui Token</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
              </div>

              {/* Transaction Fee Display */}
              {calculatedFee > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Receipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-900 dark:text-blue-300">Platform Fee (2.5%)</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center">
                          {formData.currency === 'SUI' && <Coins className="h-4 w-4 text-accent-500 mr-1" />}
                          {calculatedFee.toFixed(2)} {formData.currency}
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-400">
                          Helps maintain the platform
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  >
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="emergency">Emergency</option>
                    <option value="research">Research</option>
                    <option value="community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Applications
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="number"
                        value={formData.maxApplications}
                        onChange={(e) => setFormData({ ...formData, maxApplications: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                        placeholder="10"
                        required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Deadline
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      required
                  />
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eligibility Criteria</h3>
                <button
                    type="button"
                    onClick={() => addField('eligibility')}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Criteria</span>
                </button>
              </div>

              {formData.eligibility.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-2 animate-fade-in">
                    <input
                        type="text"
                        value={criteria}
                        onChange={(e) => updateField('eligibility', index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                        placeholder="Enter eligibility criteria"
                        required
                    />
                    {formData.eligibility.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeField('eligibility', index)}
                            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-110"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                    )}
                  </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Required Documents</h3>
                <button
                    type="button"
                    onClick={() => addField('requirements')}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Requirement</span>
                </button>
              </div>

              {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2 animate-fade-in">
                    <input
                        type="text"
                        value={requirement}
                        onChange={(e) => updateField('requirements', index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                        placeholder="Enter document requirement"
                        required
                    />
                    {formData.requirements.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeField('requirements', index)}
                            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-110"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                    )}
                  </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 transition-all duration-300 font-medium transform hover:scale-105"
              >
                Create Grant
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateGrantModal;
import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Grant } from '../../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  grant: Grant | null;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, grant }) => {
  const [formData, setFormData] = useState({
    message: '',
    additionalInfo: '',
    agreedToTerms: false,
    uploadedDocs: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !grant) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Auto close after success message
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        message: '',
        additionalInfo: '',
        agreedToTerms: false,
        uploadedDocs: []
      });
    }, 2000);
  };

  const handleFileUpload = (requirement: string) => {
    // Simulate file upload
    if (!formData.uploadedDocs.includes(requirement)) {
      setFormData({
        ...formData,
        uploadedDocs: [...formData.uploadedDocs, requirement]
      });
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success-600 dark:text-success-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Application Submitted!</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your application for "{grant.title}" has been successfully submitted. You'll hear back from the donor soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for Grant</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{grant.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Grant Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{grant.title}</h3>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                ${grant.amount.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{grant.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Deadline: {new Date(grant.deadline).toLocaleDateString()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Donor: {grant.donorName} ⭐ {grant.donorRating}
              </span>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Required Documents</h3>
            <div className="space-y-3">
              {grant.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{requirement}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {formData.uploadedDocs.includes(requirement) ? (
                      <span className="flex items-center space-x-1 text-success-600 dark:text-success-400 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileUpload(requirement)}
                        className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Check */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eligibility Criteria</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Please confirm you meet these criteria:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                    {grant.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Application Message */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Message</h3>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Explain how this grant will help you achieve your goals and make an impact..."
              required
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Information</h3>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreedToTerms}
              onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the grant terms and conditions, and I confirm that all information provided is accurate and complete. I understand that any false information may result in disqualification.
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.uploadedDocs.length !== grant.requirements.length}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg hover:from-primary-700 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
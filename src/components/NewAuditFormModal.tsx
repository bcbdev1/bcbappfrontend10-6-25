import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Send
} from 'lucide-react';

interface NewAuditFormModalProps {
  show: boolean;
  onClose: () => void;
  theme: string;
}

const NewAuditFormModal: React.FC<NewAuditFormModalProps> = ({
  show,
  onClose,
  theme
}) => {
  const [form, setForm] = React.useState({
    auditType: '',
    targetUrl: '',
    description: '',
    priority: 'medium',
    methodology: '',
    contactEmail: '',
    companyName: '',
    estimatedDuration: ''
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New audit request:', form);
    onClose();
    setForm({
      auditType: '',
      targetUrl: '',
      description: '',
      priority: 'medium',
      methodology: '',
      contactEmail: '',
      companyName: '',
      estimatedDuration: ''
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-surface-dark/95 border border-surface-secondary-dark/30 shadow-dark-elevated'
                : 'bg-surface-light/95 border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-surface-secondary-dark/30' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-dark to-accent-dark text-white">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Request New Audit</h2>
                    <p className={`${
                      theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'
                    }`}>Fill out the form to request a new security audit</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-surface-secondary-dark/50' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Audit Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Audit Type</label>
                  <select
                    value={form.auditType}
                    onChange={(e) => handleChange('auditType', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    required
                  >
                    <option value="">Select audit type</option>
                    <option value="web">Web Application</option>
                    <option value="network">Network Security</option>
                    <option value="cloud">Cloud Infrastructure</option>
                    <option value="mobile">Mobile Application</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Target URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Target URL/IP</label>
                <input
                  type="text"
                  value={form.targetUrl}
                  onChange={(e) => handleChange('targetUrl', e.target.value)}
                  placeholder="https://example.com  or 192.168.1.1"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                      : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                  } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Your company name"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    required
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    placeholder="contact@company.com"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Methodology */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Methodology</label>
                  <select
                    value={form.methodology}
                    onChange={(e) => handleChange('methodology', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                  >
                    <option value="">Select methodology</option>
                    <option value="owasp">OWASP Testing Guide</option>
                    <option value="nist">NIST Framework</option>
                    <option value="pci">PCI DSS</option>
                    <option value="iso27001">ISO 27001</option>
                  </select>
                </div>

                {/* Estimated Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Duration</label>
                  <select
                    value={form.estimatedDuration}
                    onChange={(e) => handleChange('estimatedDuration', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      theme === 'dark'
                        ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark'
                        : 'bg-gray-50 border-gray-200 text-text-light'
                    } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                  >
                    <option value="">Select duration</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description & Requirements</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your audit requirements, scope, and any specific concerns..."
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors resize-none ${
                    theme === 'dark'
                      ? 'bg-surface-secondary-dark/50 border-surface-secondary-dark text-text-dark placeholder:text-text-secondary-dark'
                      : 'bg-gray-50 border-gray-200 text-text-light placeholder:text-text-secondary-light'
                  } focus:outline-none focus:ring-2 focus:ring-secondary-dark/20`}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-surface-secondary-dark/50 hover:bg-surface-secondary-dark text-text-dark'
                      : 'bg-gray-100 hover:bg-gray-200 text-text-light'
                  }`}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-secondary-dark to-accent-dark text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewAuditFormModal;
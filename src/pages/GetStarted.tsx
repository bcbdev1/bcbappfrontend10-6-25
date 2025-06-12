import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Globe,
  Server,
  Smartphone,
  Database,
  Wifi,
  CheckCircle,
  Calendar,
  Clock,
  User,
  Mail,
  Building,
  Phone,
  MapPin,
  CreditCard,
  Send
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWorkflow } from '../context/WorkflowContext';
import HeroSection from '../components/get-started/HeroSection';
import FeaturesSection from '../components/get-started/FeaturesSection';
import ServicesSection from '../components/get-started/ServicesSection';

interface AuditRequestForm {
  auditType: string;
  targetUrl: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  methodology: string;
  estimatedDuration: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
  budget: string;
  preferredStartDate: string;
  additionalRequirements: string;
  userId: string;
}

const GetStarted: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { submitAuditRequest, currentUser } = useWorkflow();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AuditRequestForm>({
    auditType: '',
    targetUrl: '',
    description: '',
    priority: 'medium',
    methodology: '',
    estimatedDuration: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    contactName: '',
    budget: '',
    preferredStartDate: '',
    additionalRequirements: '',
    userId: currentUser.id
  });

  const auditTypes = [
    {
      id: 'web',
      name: 'Web Application Security',
      description: 'Comprehensive testing of web applications for OWASP Top 10 vulnerabilities',
      icon: Globe,
      price: 'Starting at $2,999',
      duration: '1-2 weeks'
    },
    {
      id: 'network',
      name: 'Network Security Audit',
      description: 'In-depth network infrastructure assessment and penetration testing',
      icon: Server,
      price: 'Starting at $4,999',
      duration: '2-3 weeks'
    },
    {
      id: 'mobile',
      name: 'Mobile App Security',
      description: 'Security testing for iOS and Android applications',
      icon: Smartphone,
      price: 'Starting at $2,499',
      duration: '1-2 weeks'
    },
    {
      id: 'cloud',
      name: 'Cloud Security Review',
      description: 'Cloud infrastructure security assessment for AWS, Azure, GCP',
      icon: Database,
      price: 'Starting at $3,999',
      duration: '2-4 weeks'
    },
    {
      id: 'wireless',
      name: 'Wireless Security',
      description: 'WiFi penetration testing and wireless network security assessment',
      icon: Wifi,
      price: 'Starting at $1,499',
      duration: '1 week'
    }
  ];

  const handleInputChange = (field: keyof AuditRequestForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuditTypeSelect = (auditType: string) => {
    setFormData(prev => ({ ...prev, auditType }));
    setCurrentStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      submitAuditRequest(formData);
      
      // Show success message and redirect
      alert('Audit request submitted successfully! You will receive a confirmation email shortly.');
      navigate('/dashboard');
    } catch (error: any) {
      alert('Failed to submit audit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.auditType !== '';
      case 2:
        return formData.targetUrl && formData.description && formData.companyName;
      case 3:
        return formData.contactName && formData.contactEmail && formData.contactPhone;
      case 4:
        return formData.preferredStartDate && formData.budget;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Audit Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Select the type of security audit that best fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auditTypes.map((audit, index) => (
                <motion.div
                  key={audit.id}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.auditType === audit.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  } ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAuditTypeSelect(audit.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                    <audit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {audit.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {audit.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {audit.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {audit.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Project Details
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tell us about your project and requirements
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target URL/IP Address *
                </label>
                <input
                  type="text"
                  value={formData.targetUrl}
                  onChange={(e) => handleInputChange('targetUrl', e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com or 192.168.1.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your project, scope, and any specific security concerns..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Duration
                  </label>
                  <select
                    value={formData.estimatedDuration}
                    onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300  mb-2">
                  Preferred Methodology
                </label>
                <select
                  value={formData.methodology}
                  onChange={(e) => handleInputChange('methodology', e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select methodology</option>
                  <option value="OWASP Testing Guide">OWASP Testing Guide</option>
                  <option value="NIST Framework">NIST Framework</option>
                  <option value="PCI DSS">PCI DSS</option>
                  <option value="ISO 27001">ISO 27001</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                How can we reach you about this audit?
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Schedule & Budget
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                When would you like to start and what's your budget?
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any specific requirements, compliance needs, or special considerations..."
                />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Review Your Request
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please review your audit request before submitting
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Audit Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {auditTypes.find(t => t.id === formData.auditType)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Target:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.targetUrl}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {formData.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.estimatedDuration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.contactName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.contactEmail}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.contactPhone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Company:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.companyName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Schedule & Budget
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.preferredStartDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.budget}
                        </span>
                      </div>
                      {formData.methodology && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Methodology:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formData.methodology}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {formData.description}
                    </p>
                    {formData.additionalRequirements && (
                      <>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white mt-4 mb-2">
                          Additional Requirements
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {formData.additionalRequirements}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent">
                Ready to Secure Your Business?
              </h2>
              <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
                Start your security audit journey today. Our experts are ready to help protect your digital assets.
              </p>
              <motion.button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step}</span>
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <motion.button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              disabled={currentStep === 1}
              whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
            >
              Previous
            </motion.button>

            {currentStep < 5 ? (
              <motion.button
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isStepValid()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}
                disabled={!isStepValid()}
                whileHover={isStepValid() ? { scale: 1.02 } : {}}
                whileTap={isStepValid() ? { scale: 0.98 } : {}}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isStepValid() && !isSubmitting
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}
                whileHover={isStepValid() && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={isStepValid() && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
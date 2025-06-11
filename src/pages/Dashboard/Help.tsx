import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileText,
  Video,
  Users,
  Zap,
  Shield,
  Settings,
  Send,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Download,
  Bookmark
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  views: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState('faqs');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', label: 'All Topics', icon: Book, color: 'from-blue-500 to-cyan-500' },
    { id: 'getting-started', label: 'Getting Started', icon: Zap, color: 'from-green-500 to-emerald-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-red-500 to-pink-500' },
    { id: 'account', label: 'Account', icon: Users, color: 'from-purple-500 to-indigo-500' },
    { id: 'technical', label: 'Technical', icon: Settings, color: 'from-orange-500 to-yellow-500' }
  ];

  const tabs = [
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'tutorials', label: 'Video Tutorials', icon: Video },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I start my first security audit?',
      answer: 'To start your first security audit, navigate to the Dashboard and click on "Request New Audit". Fill in the required information including target URL, audit type, and priority level. Our team will review your request and begin the audit process within 24 hours.',
      category: 'getting-started',
      helpful: 45
    },
    {
      id: '2',
      question: 'What types of security audits do you offer?',
      answer: 'We offer comprehensive security audits including Web Application Security, Network Security, Cloud Infrastructure, Mobile Application Security, Database Security, and Wireless Security assessments. Each audit type follows industry-standard methodologies and provides detailed remediation recommendations.',
      category: 'security',
      helpful: 38
    },
    {
      id: '3',
      question: 'How long does a typical audit take?',
      answer: 'Audit duration varies based on scope and complexity. Web application audits typically take 1-2 weeks, while comprehensive network audits may take 2-4 weeks. You can track progress in real-time through your dashboard and receive regular updates from our security team.',
      category: 'getting-started',
      helpful: 52
    },
    {
      id: '4',
      question: 'How do I change my account password?',
      answer: 'Go to Settings > Security, then scroll to the "Change Password" section. Enter your current password and your new password twice to confirm. Click "Save Security Settings" to update your password. We recommend using a strong password with at least 12 characters.',
      category: 'account',
      helpful: 29
    },
    {
      id: '5',
      question: 'Can I integrate BCBUZZ with my existing tools?',
      answer: 'Yes! BCBUZZ offers comprehensive API integration and webhook support. You can find your API key and configure integrations in Settings > API & Integrations. We support popular tools like Slack, JIRA, Microsoft Teams, and custom webhook endpoints for seamless workflow integration.',
      category: 'technical',
      helpful: 41
    },
    {
      id: '6',
      question: 'What should I do if a critical vulnerability is found?',
      answer: 'Critical vulnerabilities require immediate attention. You\'ll receive instant notifications via email and dashboard alerts. Review the detailed remediation recommendations provided in the audit report, prioritize fixes based on risk level, and implement patches as soon as possible. Our team is available for emergency consultation.',
      category: 'security',
      helpful: 67
    }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Complete Guide to Getting Started with BCBUZZ',
      description: 'Everything you need to know to set up your account, configure settings, and run your first comprehensive security audit',
      category: 'getting-started',
      readTime: '8 min read',
      icon: Zap,
      difficulty: 'Beginner',
      views: 1250
    },
    {
      id: '2',
      title: 'Understanding Vulnerability Severity Levels',
      description: 'Learn how we classify vulnerabilities using CVSS scores and how to prioritize remediation efforts for maximum security impact',
      category: 'security',
      readTime: '12 min read',
      icon: Shield,
      difficulty: 'Intermediate',
      views: 890
    },
    {
      id: '3',
      title: 'Advanced API Integration Techniques',
      description: 'Step-by-step instructions for integrating BCBUZZ with your existing security workflow using our comprehensive REST API',
      category: 'technical',
      readTime: '15 min read',
      icon: Settings,
      difficulty: 'Advanced',
      views: 567
    },
    {
      id: '4',
      title: 'Best Practices for Web Application Security',
      description: 'Essential security measures every web application should implement to protect against common vulnerabilities and attacks',
      category: 'security',
      readTime: '18 min read',
      icon: Shield,
      difficulty: 'Intermediate',
      views: 1456
    },
    {
      id: '5',
      title: 'Managing Your Security Team Effectively',
      description: 'How to add team members, assign roles, manage permissions, and collaborate effectively in your BCBUZZ account',
      category: 'account',
      readTime: '10 min read',
      icon: Users,
      difficulty: 'Beginner',
      views: 723
    },
    {
      id: '6',
      title: 'Automated Scanning and Continuous Monitoring',
      description: 'Configure automated security scans, set up continuous monitoring, and establish alerting for proactive security management',
      category: 'technical',
      readTime: '14 min read',
      icon: Settings,
      difficulty: 'Advanced',
      views: 445
    }
  ];

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Setting Up Your First Security Audit',
      description: 'Watch this step-by-step tutorial to learn how to configure and launch your first comprehensive security audit',
      duration: '12:34',
      thumbnail: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'getting-started'
    },
    {
      id: '2',
      title: 'Understanding Your Security Dashboard',
      description: 'Get familiar with the dashboard interface, key metrics, and how to interpret your security posture at a glance',
      duration: '8:45',
      thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'getting-started'
    },
    {
      id: '3',
      title: 'Advanced Vulnerability Analysis',
      description: 'Deep dive into vulnerability reports, learn to prioritize fixes, and understand remediation strategies',
      duration: '15:22',
      thumbnail: 'https://images.pexels.com/photos/5380792/pexels-photo-5380792.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'security'
    },
    {
      id: '4',
      title: 'API Integration Walkthrough',
      description: 'Complete guide to integrating BCBUZZ with your existing tools using our REST API and webhooks',
      duration: '18:56',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'technical'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tutorial.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'Intermediate': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Advanced': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark transition-all duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent mb-4">
            Help & Support Center
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto mb-8">
            Find answers to your questions, learn from our comprehensive guides, and get the support you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, FAQs, tutorials, or topics..."
              className="w-full pl-16 pr-6 py-5 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Live Chat Support',
              description: 'Get instant help from our expert support team',
              icon: MessageCircle,
              color: 'from-blue-500 to-cyan-500',
              action: 'Start Chat'
            },
            {
              title: 'Email Support',
              description: 'Send us a detailed message for complex issues',
              icon: Mail,
              color: 'from-green-500 to-emerald-500',
              action: 'Send Email'
            },
            {
              title: 'Schedule a Call',
              description: 'Book a consultation with our security experts',
              icon: Phone,
              color: 'from-purple-500 to-indigo-500',
              action: 'Book Call'
            }
          ].map((action, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white mb-4 w-fit`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{action.description}</p>
                <button className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${action.color} bg-clip-text text-transparent group-hover:text-white transition-all duration-300`}>
                  {action.action}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200/50 dark:border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-700/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{filteredFAQs.length} questions found</span>
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{faq.question}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {faq.helpful} people found this helpful
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </button>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <button className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                                <CheckCircle className="w-4 h-4" />
                                Helpful
                              </button>
                              <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                <Bookmark className="w-4 h-4" />
                                Save
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No FAQs found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or browse different categories</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help Articles</h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{filteredArticles.length} articles found</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => {
                    const Icon = article.icon;
                    return (
                      <motion.div
                        key={article.id}
                        className="group p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.02, y: -4 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                                {article.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{article.views} views</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                              {article.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                              </div>
                              <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                Read More
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or browse different categories</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Video Tutorials Tab */}
            {activeTab === 'tutorials' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Tutorials</h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{filteredTutorials.length} tutorials found</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      className="group bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={tutorial.thumbnail}
                          alt={tutorial.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PlayCircle className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                          {tutorial.duration}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {tutorial.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredTutorials.length === 0 && (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tutorials found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or browse different categories</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact Support Tab */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Our Support Team</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Can't find what you're looking for? Our expert support team is here to help you with any questions or issues.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Priority
                      </label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                        className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={6}
                      className="w-full p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Please describe your issue or question in detail..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Video Library',
                description: 'Comprehensive video tutorials covering all aspects of BCBUZZ',
                icon: Video,
                color: 'from-purple-500 to-indigo-500',
                action: 'Browse Videos'
              },
              {
                title: 'Documentation',
                description: 'Complete technical documentation and API references',
                icon: Book,
                color: 'from-green-500 to-emerald-500',
                action: 'Read Docs'
              },
              {
                title: 'Community Forum',
                description: 'Connect with other users and share experiences',
                icon: Users,
                color: 'from-orange-500 to-red-500',
                action: 'Join Community'
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-r ${resource.color} text-white w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <resource.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <motion.button
                  className={`text-sm font-medium bg-gradient-to-r ${resource.color} bg-clip-text text-transparent hover:text-white transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {resource.action} →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
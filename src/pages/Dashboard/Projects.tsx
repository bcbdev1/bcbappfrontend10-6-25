import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import {
  Search,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  FolderOpen,
  MoreVertical,
  Download,
  Eye,
  Filter,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Shield,
  Target
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import apiClient from '../../lib/api';

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      const [projectsRes, statsRes] = await Promise.all([
        apiClient.get('/projects'),
        apiClient.get('/projects/stats')
      ]);

      setProjects(projectsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch projects data:', error);
      setProjects([]);
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'in-progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'scheduled':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      case 'scheduled':
        return Calendar;
      default:
        return XCircle;
    }
  };

  const filteredProjects = projects.filter(({ name, client, type, status }: any) => {
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleProjectClick = (project: any) => {
    navigate(`/audit/${project.id}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary-dark"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-dark to-accent-dark dark:from-secondary-light dark:to-accent-light bg-clip-text text-transparent mb-2">
              Security Projects
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              Manage and track all your security audit projects and assessments
            </p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/get-started')}
          >
            <Plus className="w-5 h-5" />
            New Project
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat: any, index: number) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, clients, or types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-[150px]"
              >
                <option value="all">All Types</option>
                <option value="web">Web Application</option>
                <option value="network">Network Security</option>
                <option value="mobile">Mobile Security</option>
                <option value="cloud">Cloud Infrastructure</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project: any, index: number) => {
              const StatusIcon = getStatusIcon(project.status);
              const ProjectIcon = project.icon;
              const scoreValue = project.score ?? 0;

              return (
                <motion.div
                  key={project.id}
                  className="group relative bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => handleProjectClick(project)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {/* Project content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                          <ProjectIcon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{project.client}</p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{project.type}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(project.status).split(' ')[0]}`} />
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Date</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(project.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Security Score</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full transition-all duration-500 ${
                                scoreValue >= 90 ? 'bg-green-500' : scoreValue >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${scoreValue}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[35px]">{scoreValue}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Vulnerabilities Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Vulnerabilities Found</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {Object.values(project.vulnerabilities || {}).reduce((a: number, b: number) => a + b, 0)} total
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">{project.vulnerabilities?.critical || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">{project.vulnerabilities?.high || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">{project.vulnerabilities?.medium || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">{project.vulnerabilities?.low || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-800/90 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl">
                    <div className="flex space-x-2">
                      <motion.button
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </motion.button>
                      <motion.button
                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-full text-center py-16"
            >
              <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-12 border border-white/20 dark:border-gray-700/30 max-w-md mx-auto">
                <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria, or create a new project to get started.
                </p>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/get-started')}
                >
                  <Plus className="w-5 h-5" />
                  Create New Project
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
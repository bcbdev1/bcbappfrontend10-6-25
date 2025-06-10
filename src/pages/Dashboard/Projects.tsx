import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  FolderOpen,
  MoreVertical,
  Download,
} from 'lucide-react';
import { mockProjects } from '../../data/mockProjects';
import { useTheme } from '../../context/ThemeContext';

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-blue-500';
      case 'scheduled':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
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

  const filteredProjects = projects.filter(({ name, client, type, status }) => {
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="max-w-full lg:max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 truncate">Projects</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-full">
            Manage and track all your security audit projects
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full sm:w-auto gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[150px]"
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
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[150px]"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {filteredProjects.map((project: any) => {
          const StatusIcon = getStatusIcon(project.status);
          const ProjectIcon = project.icon;
          const scoreValue = project.score ?? 0;

          return (
            <motion.div
              key={project.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-300 cursor-pointer flex flex-col"
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0">
                    <ProjectIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-full">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">{project.client}</p>
                  </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Project Details */}
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[50%]">{project.type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(project.status)}`} />
                    <span className={`text-sm font-medium capitalize ${getStatusColor(project.status)} truncate max-w-[50%]`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Date</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[50%]">
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Security Score</span>
                  <div className="flex items-center space-x-2 min-w-[120px]">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          scoreValue >= 90 ? 'bg-green-500' : scoreValue >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${scoreValue}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[24px] text-right">{scoreValue}%</span>
                  </div>
                </div>
              </div>

              {/* Vulnerabilities Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs">
                <div className="flex items-center space-x-1 min-w-[20px]">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>{project.vulnerabilities.critical}</span>
                </div>
                <div className="flex items-center space-x-1 min-w-[20px]">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{project.vulnerabilities.high}</span>
                </div>
                <div className="flex items-center space-x-1 min-w-[20px]">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{project.vulnerabilities.medium}</span>
                </div>
                <div className="flex items-center space-x-1 min-w-[20px]">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{project.vulnerabilities.low}</span>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-800/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Projects;

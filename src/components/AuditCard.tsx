import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe } from 'lucide-react';

interface AuditCardProps {
  audit: any;
  onClick: () => void;
  theme: string;
  getColorClasses: (color: ColorKey, variant: 'bg' | 'text' | 'border') => string;
}

type ColorKey = 'info' | 'success' | 'warning' | 'error' | 'secondary';

const AuditCard: React.FC<AuditCardProps> = ({
  audit,
  onClick,
  theme,
  getColorClasses,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group backdrop-blur-sm ${
        theme === 'dark'
          ? 'border-surface-secondary-dark/30 hover:bg-surface-secondary-dark/30 hover:border-secondary-dark/50 shadow-dark-card'
          : 'border-gray-200 hover:bg-gray-50 hover:border-blue-200'
      }`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              audit.type === 'network'
                ? getColorClasses('info', 'bg') + ' ' + getColorClasses('info', 'text')
                : audit.type === 'web'
                ? getColorClasses('success', 'bg') +
                  ' ' +
                  getColorClasses('success', 'text')
                : getColorClasses('secondary', 'bg') +
                  ' ' +
                  getColorClasses('secondary', 'text')
            }`}
          >
            {audit.type === 'network' ? (
              <Shield className="w-4 h-4" />
            ) : audit.type === 'web' ? (
              <Globe className="w-4 h-4" />
            ) : (
              <Shield className="w-4 h-4" />
            )}
          </div>
          <div>
            <h4 className="font-medium">{audit.name}</h4>
            <p
              className={`text-sm ${
                theme === 'dark'
                  ? 'text-text-secondary-dark'
                  : 'text-text-secondary-light'
              }`}
            >
              {audit.date}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              audit.status === 'Completed'
                ? getColorClasses('success', 'bg') +
                  ' ' +
                  getColorClasses('success', 'text')
                : audit.status === 'In Progress'
                ? getColorClasses('info', 'bg') +
                  ' ' +
                  getColorClasses('info', 'text')
                : getColorClasses('warning', 'bg') +
                  ' ' +
                  getColorClasses('warning', 'text')
            }`}
          >
            {audit.status}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              audit.priority === 'high'
                ? getColorClasses('error', 'bg') +
                  ' ' +
                  getColorClasses('error', 'text')
                : audit.priority === 'medium'
                ? getColorClasses('warning', 'bg') +
                  ' ' +
                  getColorClasses('warning', 'text')
                : getColorClasses('success', 'bg') +
                  ' ' +
                  getColorClasses('success', 'text')
            }`}
          >
            {audit.priority}
          </span>
        </div>
      </div>
      {audit.progress > 0 && audit.progress < 100 && (
        <div
          className={`w-full rounded-full h-2 ${
            theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'
          }`}
        >
          <div
            className="bg-gradient-to-r from-secondary-dark to-accent-dark h-2 rounded-full transition-all duration-500"
            style={{ width: `${audit.progress}%` }}
          ></div>
        </div>
      )}
    </motion.div>
  );
};

export default AuditCard;
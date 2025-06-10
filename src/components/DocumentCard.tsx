import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Eye, FileText, MoreVertical } from 'lucide-react';
import { ColorKey, VariantType } from '../types/index';


interface DocumentCardProps {
  doc: any;
  onPreview: () => void;
  onDownload: () => void;
  theme: string;
  getColorClasses: (color: ColorKey, variant: VariantType) => string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  onPreview,
  onDownload,
  theme,
  getColorClasses,
}) => {
  return (
    <motion.div
      className={`p-3 rounded-lg border transition-all duration-200 group backdrop-blur-sm ${
        theme === 'dark'
          ? 'border-surface-secondary-dark/30 hover:bg-surface-secondary-dark/30 shadow-dark-card'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-lg ${getColorClasses('info', 'bg')} ${getColorClasses('info', 'text')}`}>
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{doc.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs ${theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'}`}>
                {doc.size}
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'}`}>
                •
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'}`}>
                {doc.type}
              </span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Calendar
                className={`w-3 h-3 ${theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'}`}
              />
              <span className={`text-xs ${theme === 'dark' ? 'text-text-secondary-dark' : 'text-text-secondary-light'}`}>
                {doc.uploadDate} at {doc.uploadTime}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            onClick={onPreview}
            className={`p-1.5 rounded transition-colors ${
              theme === 'dark'
                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark'
                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Preview"
          >
            <Eye className="w-3 h-3" />
          </motion.button>
          <motion.button
            onClick={onDownload}
            className={`p-1.5 rounded transition-colors ${
              theme === 'dark'
                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark'
                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Download"
          >
            <Download className="w-3 h-3" />
          </motion.button>
          <motion.button
            className={`p-1.5 rounded transition-colors ${
              theme === 'dark'
                ? 'hover:bg-surface-secondary-dark text-text-secondary-dark hover:text-text-dark'
                : 'hover:bg-gray-100 text-text-secondary-light hover:text-text-light'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="More options"
          >
            <MoreVertical className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
      {doc.status === 'processing' && (
        <div className="mt-2">
          <div className={`w-full rounded-full h-1 ${theme === 'dark' ? 'bg-surface-secondary-dark' : 'bg-gray-200'}`}>
            <div className="bg-gradient-to-r from-secondary-dark to-accent-dark h-1 rounded-full w-3/4 animate-pulse"></div>
          </div>
          <span className={`text-xs mt-1 ${getColorClasses('warning', 'text')}`}>Processing...</span>
        </div>
      )}
    </motion.div>
  );
};

export default DocumentCard;
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AuditDetailsContent from './AuditDetailsContent';

const AuditDetailsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <AuditDetailsContent />
    </DashboardLayout>
  );
};

export default AuditDetailsPage;
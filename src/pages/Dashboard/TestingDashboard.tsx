import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TestingDashboardContent from './TestingDashboardContent';

const TestingDashboard: React.FC = () => {
  return (
    <DashboardLayout userRole="tester">
      <TestingDashboardContent />
    </DashboardLayout>
  );
};

export default TestingDashboard;
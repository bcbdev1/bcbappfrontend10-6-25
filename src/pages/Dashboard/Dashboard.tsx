import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import UserDashboardContent from './UserDashboardContent';

const Dashboard: React.FC = () => {
  // Get user role from localStorage or context
  const userRole = localStorage.getItem('userRole') || 'user';

  return (
    <DashboardLayout userRole={userRole as 'user' | 'admin' | 'tester'}>
      <UserDashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
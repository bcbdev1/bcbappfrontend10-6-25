import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AdminDashboardContent from './AdminDashboardContent';

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout userRole="admin">
      <AdminDashboardContent />
    </DashboardLayout>
  );
};

export default AdminDashboard;
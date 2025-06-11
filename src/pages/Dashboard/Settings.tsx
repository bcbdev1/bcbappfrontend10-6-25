import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import SettingsPage from './SettingsContent';

const Settings: React.FC = () => {
  return (
    <DashboardLayout>
      <SettingsPage />
    </DashboardLayout>
  );
};

export default Settings;
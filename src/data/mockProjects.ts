import { Globe, Cloud, Smartphone, Server, Monitor } from 'lucide-react';

// Mock projects data
export const mockProjects = [
  {
    id: 1,
    name: "Corporate Website Security Audit",
    client: "ABC Corp",
    type: "web",
    status: "completed",
    date: "2024-01-12",
    score: 85,
    vulnerabilities: {
      critical: 1,
      high: 3,
      medium: 5,
      low: 8
    },
    icon: Globe
  },
  {
    id: 2,
    name: "Internal Network Penetration Test",
    client: "XYZ Ltd",
    type: "network",
    status: "in-progress",
    date: "2024-01-14",
    score: 72,
    vulnerabilities: {
      critical: 0,
      high: 2,
      medium: 4,
      low: 10
    },
    icon: Server
  },
  {
    id: 3,
    name: "Mobile Banking App Security Assessment",
    client: "FinSecure",
    type: "mobile",
    status: "scheduled",
    date: "2024-01-20",
    score: 0,
    vulnerabilities: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    },
    icon: Smartphone
  },
  {
    id: 4,
    name: "Cloud Infrastructure Security Review",
    client: "Cloudify Solutions",
    type: "cloud",
    status: "completed",
    date: "2024-01-10",
    score: 90,
    vulnerabilities: {
      critical: 0,
      high: 1,
      medium: 2,
      low: 5
    },
    icon: Cloud
  },
  {
    id: 5,
    name: "E-commerce Web App Audit",
    client: "ShopNow",
    type: "web",
    status: "in-progress",
    date: "2024-01-16",
    score: 78,
    vulnerabilities: {
      critical: 2,
      high: 4,
      medium: 6,
      low: 12
    },
    icon: Monitor
  }
];

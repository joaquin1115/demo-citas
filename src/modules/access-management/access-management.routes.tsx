import { RouteObject } from 'react-router-dom';
import AccessManagement from './pages/AccessManagement.tsx';

export const accessManagementRoutes: RouteObject[] = [
  {
    path: '/access-management/*',
    element: <AccessManagement />
  }
];
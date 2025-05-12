import { RouteObject } from 'react-router-dom';
import AccessManagement from './pages/AccessManagement';

export const accessManagementRoutes: RouteObject[] = [
  {
    path: '/access-management/*',
    element: <AccessManagement />
  }
];
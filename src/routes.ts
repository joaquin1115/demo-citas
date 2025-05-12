import { RouteObject } from 'react-router-dom';
import { authRoutes } from './modules/auth/auth.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { medicalRecordsRoutes } from './modules/medical-records/medical-records.routes';
import { appointmentsRoutes } from './modules/appointments/appointments.routes';
import { medicalServicesRoutes } from './modules/medical-services/medical-services.routes';
import { accessManagementRoutes } from './modules/access-management/access-management.routes';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  ...authRoutes,
  ...dashboardRoutes,
  ...medicalRecordsRoutes,
  ...appointmentsRoutes,
  ...medicalServicesRoutes,
  ...accessManagementRoutes,
  {
    path: '*',
    element: <NotFound />
  }
];
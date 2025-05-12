import { RouteObject } from 'react-router-dom';
import MedicalServices from './pages/MedicalServices';

export const medicalServicesRoutes: RouteObject[] = [
  {
    path: '/medical-services/*',
    element: <MedicalServices />
  }
];
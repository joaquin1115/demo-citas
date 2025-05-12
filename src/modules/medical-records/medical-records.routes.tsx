import { RouteObject } from 'react-router-dom';
import MedicalRecords from './pages/MedicalRecords';

export const medicalRecordsRoutes: RouteObject[] = [
  {
    path: '/medical-records/*',
    element: <MedicalRecords />
  }
];
import { RouteObject } from 'react-router-dom';
import Appointments from '../../pages/Appointments';

export const appointmentsRoutes: RouteObject[] = [
  {
    path: '/appointments/*',
    element: <Appointments/>
  }
];
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  X, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Appointments: React.FC = () => {
  const { user } = useUser();
  const [view, setView] = useState<'list' | 'create'>('list');
  
  if (!user) return null;

  let content;
  if (user.currentRole === 'patient') {
    content = view === 'list' 
      ? <PatientAppointmentsList onCreateNew={() => setView('create')} /> 
      : <CreateAppointment onCancel={() => setView('list')} onSuccess={() => setView('list')} />;
  } else if (user.currentRole === 'admin') {
    content = <AdminAppointmentsList />;
  } else if (user.currentRole === 'medical') {
    content = <MedicalAppointmentsList />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {view === 'list' ? 'Citas Médicas' : 'Programar Nueva Cita'}
        </h1>
        
        {user.currentRole === 'patient' && view === 'list' && (
          <button 
            onClick={() => setView('create')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Programar Cita
          </button>
        )}
      </div>

      {content}
    </div>
  );
};

const PatientAppointmentsList: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
  const appointments = [
    { 
      id: '1', 
      doctor: 'Dr. María González', 
      specialty: 'Cardiología', 
      date: '15 Jun 2025', 
      time: '09:30 AM',
      location: 'Centro Médico Norte, Consultorio 302',
      status: 'scheduled'
    },
    { 
      id: '2', 
      doctor: 'Dr. Carlos Ruiz', 
      specialty: 'Oftalmología', 
      date: '22 Jun 2025', 
      time: '11:00 AM',
      location: 'Centro Médico Sur, Consultorio 105',
      status: 'scheduled'
    },
    { 
      id: '3', 
      doctor: 'Dra. Ana Martínez', 
      specialty: 'Dermatología', 
      date: '05 May 2025', 
      time: '10:15 AM',
      location: 'Centro Médico Norte, Consultorio 210',
      status: 'completed'
    },
  ];

  // Filter appointments by status
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Próximas Citas</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                    <button className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors text-sm w-full md:w-auto">
                      Cancelar Cita
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm w-full md:w-auto">
                      Reprogramar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No tienes citas programadas</p>
              <button 
                onClick={onCreateNew}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
              >
                Programar una cita
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Historial de Citas</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {pastAppointments.map(appointment => (
              <div key={appointment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-green-600">Completada</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateAppointment: React.FC<{ onCancel: () => void, onSuccess: () => void }> = ({ onCancel, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
  });
  
  const specialties = [
    'Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología',
    'Neurología', 'Oftalmología', 'Oncología', 'Pediatría', 'Psiquiatría',
    'Traumatología', 'Urología'
  ];
  
  const doctors = [
    { id: '1', name: 'Dr. María González', specialty: 'Cardiología', available: true },
    { id: '2', name: 'Dr. Carlos Ruiz', specialty: 'Cardiología', available: true },
    { id: '3', name: 'Dra. Ana Martínez', specialty: 'Cardiología', available: false },
  ];
  
  const availableDates = ['20 Jun 2025', '21 Jun 2025', '22 Jun 2025', '23 Jun 2025'];
  
  const availableTimes = ['09:00 AM', '10:30 AM', '11:45 AM', '02:15 PM', '03:30 PM'];
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const submitAppointment = () => {
    // Here you would submit the appointment data to your backend
    console.log('Appointment data:', formData);
    // Show success message and redirect
    onSuccess();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Progress Steps */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button 
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-10 h-1 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-10 h-1 ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
          
          <div className="w-5"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Seleccione Especialidad</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialties.map(specialty => (
                <button
                  key={specialty}
                  className={`p-4 border rounded-md text-left focus:outline-none transition-colors ${
                    formData.specialty === specialty 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleInputChange('specialty', specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!formData.specialty}
                className={`px-6 py-2 rounded-md flex items-center ${
                  formData.specialty
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Seleccione Médico y Fecha</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccione un médico
                </label>
                <div className="space-y-3">
                  {doctors.map(doctor => (
                    <button
                      key={doctor.id}
                      disabled={!doctor.available}
                      className={`w-full p-4 border rounded-md text-left focus:outline-none transition-colors ${
                        formData.doctor === doctor.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : doctor.available
                            ? 'border-gray-200 hover:bg-gray-50'
                            : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => doctor.available && handleInputChange('doctor', doctor.id)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{doctor.name}</span>
                        {!doctor.available && (
                          <span className="text-red-500 text-sm">No disponible</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccione una fecha
                </label>
                <div className="space-y-3">
                  {availableDates.map(date => (
                    <button
                      key={date}
                      className={`w-full p-4 border rounded-md text-left focus:outline-none transition-colors ${
                        formData.date === date 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleInputChange('date', date)}
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <span>{date}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="mr-2" />
                Anterior
              </button>
              
              <button
                onClick={nextStep}
                disabled={!formData.doctor || !formData.date}
                className={`px-6 py-2 rounded-md flex items-center ${
                  formData.doctor && formData.date
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800">Seleccione Horario y Confirme</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccione un horario
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      className={`p-3 border rounded-md text-center focus:outline-none transition-colors ${
                        formData.time === time 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleInputChange('time', time)}
                    >
                      <span>{time}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-3">Resumen de la Cita</h3>
                  
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-28">Especialidad:</span>
                      <span className="font-medium">{formData.specialty}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-28">Médico:</span>
                      <span className="font-medium">
                        {doctors.find(d => d.id === formData.doctor)?.name || ''}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-28">Fecha:</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-28">Hora:</span>
                      <span className="font-medium">{formData.time || 'No seleccionada'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      Recuerde llegar 15 minutos antes de su cita programada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="mr-2" />
                Anterior
              </button>
              
              <button
                onClick={submitAppointment}
                disabled={!formData.time}
                className={`px-6 py-2 rounded-md flex items-center ${
                  formData.time
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle size={16} className="mr-2" />
                Confirmar Cita
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminAppointmentsList: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample appointments for the admin view
  const adminAppointments = [
    { 
      id: '1', 
      patient: 'Juan Pérez',
      doctor: 'Dr. María González', 
      specialty: 'Cardiología', 
      date: '15 Jun 2025', 
      time: '09:30 AM',
      status: 'scheduled'
    },
    { 
      id: '2', 
      patient: 'Laura Gómez',
      doctor: 'Dr. Carlos Ruiz', 
      specialty: 'Oftalmología', 
      date: '15 Jun 2025', 
      time: '10:00 AM',
      status: 'scheduled'
    },
    { 
      id: '3', 
      patient: 'Miguel Sánchez',
      doctor: 'Dra. Ana Martínez', 
      specialty: 'Dermatología', 
      date: '15 Jun 2025', 
      time: '11:15 AM',
      status: 'canceled'
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3 md:mb-0">Calendario de Citas</h2>
          
          <div className="flex space-x-3">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center px-4 font-medium">
              {currentDate.toLocaleDateString('es-ES', { 
                month: 'long', 
                year: 'numeric'
              })}
            </div>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Calendar would go here */}
        <div className="h-64 border border-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Visualización de calendario</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Listado de Citas</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Médico
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{appointment.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'scheduled' 
                        ? 'bg-green-100 text-green-800' 
                        : appointment.status === 'canceled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status === 'scheduled' 
                        ? 'Programada' 
                        : appointment.status === 'canceled'
                        ? 'Cancelada'
                        : 'Completada'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MedicalAppointmentsList: React.FC = () => {
  // Sample appointments for the medical personnel view
  const doctorAppointments = [
    { 
      id: '1', 
      patient: 'Juan Pérez',
      time: '09:30 AM',
      reason: 'Control rutinario',
      status: 'scheduled'
    },
    { 
      id: '2', 
      patient: 'Laura Gómez',
      time: '10:00 AM',
      reason: 'Dolor en el pecho',
      status: 'in-progress'
    },
    { 
      id: '3', 
      patient: 'Miguel Sánchez',
      time: '11:15 AM',
      reason: 'Seguimiento tratamiento',
      status: 'completed'
    },
    { 
      id: '4', 
      patient: 'Ana Rodríguez',
      time: '12:00 PM',
      reason: 'Primera consulta',
      status: 'scheduled'
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Agenda de Hoy</h2>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {doctorAppointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className={`p-6 ${
                appointment.status === 'in-progress' 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="font-medium text-gray-800">{appointment.patient}</h3>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{appointment.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Motivo:</span> {appointment.reason}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className={`px-2 py-1 mr-3 text-xs font-semibold rounded-full ${
                    appointment.status === 'scheduled' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : appointment.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {appointment.status === 'scheduled' 
                      ? 'Pendiente' 
                      : appointment.status === 'in-progress'
                      ? 'En progreso'
                      : 'Completada'}
                  </span>
                  
                  {appointment.status === 'scheduled' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Iniciar Atención
                    </button>
                  )}
                  
                  {appointment.status === 'in-progress' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                      Completar
                    </button>
                  )}
                  
                  {appointment.status === 'completed' && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      Ver Detalles
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics and Quick Actions */}
      <div className="col-span-1 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Resumen del Día</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="text-2xl font-bold text-blue-700">4</div>
              <div className="text-sm text-blue-700">Citas Totales</div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="text-2xl font-bold text-yellow-700">2</div>
              <div className="text-sm text-yellow-700">Pendientes</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="text-2xl font-bold text-blue-700">1</div>
              <div className="text-sm text-blue-700">En Progreso</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <div className="text-2xl font-bold text-green-700">1</div>
              <div className="text-sm text-green-700">Completadas</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Acciones Rápidas</h2>
          
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Ver Agenda Completa
            </button>
            
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
              <User className="h-5 w-5 mr-2" />
              Buscar Paciente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
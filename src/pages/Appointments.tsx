import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  X, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  FileText,
  Plus
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
                        <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
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
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
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
                        <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
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
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  
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
  
  const availableTimes = ['09:00 AM', '10:30 AM', '11:45 AM', '02:15 PM', '03:30 PM'];

  const handleSubmit = () => {
    // Here you would submit the appointment data
    onSuccess();
  };

  if (!selectedSpecialty) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-6">Seleccione Especialidad</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialties.map(specialty => (
            <button
              key={specialty}
              className="p-4 border rounded-md text-left hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button 
            onClick={() => setSelectedSpecialty('')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Cambiar especialidad
          </button>
          <h2 className="text-lg font-medium text-gray-800">
            Programar cita - {selectedSpecialty}
          </h2>
        </div>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Selection */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Seleccione Médico</h3>
          {doctors.map(doctor => (
            <button
              key={doctor.id}
              disabled={!doctor.available}
              onClick={() => setSelectedDoctor(doctor.id)}
              className={`w-full p-4 border rounded-md text-left transition-colors ${
                selectedDoctor === doctor.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : doctor.available
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Seleccione Fecha</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Horarios Disponibles</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 border rounded-md transition-colors ${
                  selectedTime === time
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedDoctor && selectedDate && selectedTime && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2">Resumen de la Cita</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Especialidad:</span> {selectedSpecialty}</p>
                  <p><span className="text-gray-500">Médico:</span> {doctors.find(d => d.id === selectedDoctor)?.name}</p>
                  <p><span className="text-gray-500">Fecha:</span> {selectedDate.toLocaleDateString()}</p>
                  <p><span className="text-gray-500">Hora:</span> {selectedTime}</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirmar Cita
              </button>
            </div>
          )}
        </div>
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
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  
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
  ];

  const handleStartService = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setShowServiceForm(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Appointments List */}
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
              <div className="flex justify-between items-start">
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
                
                <div className="flex items-center">
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
                    <button 
                      onClick={() => handleStartService(appointment.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Iniciar Atención
                    </button>
                  )}
                  
                  {appointment.status === 'in-progress' && (
                    <button 
                      onClick={() => handleStartService(appointment.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      Continuar Atención
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
      
      {/* Service Form or Stats */}
      <div className="col-span-1 space-y-6">
        {showServiceForm ? (
          <ServiceForm 
            appointmentId={selectedAppointment!}
            onClose={() => {
              setShowServiceForm(false);
              setSelectedAppointment(null);
            }}
            appointment={doctorAppointments.find(a => a.id === selectedAppointment)!}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

interface ServiceFormProps {
  appointmentId: string;
  onClose: () => void;
  appointment: any;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ appointmentId, onClose, appointment }) => {
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleCreateOrder = () => {
    setShowOrderForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800">Atención Médica</h2>
          <p className="text-sm text-gray-600">Paciente: {appointment.patient}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {!showOrderForm ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setServiceType('consultation')}
              className={`p-4 border rounded-md text-left transition-colors ${
                serviceType === 'consultation' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium">Consulta Médica</p>
                  <p className="text-sm text-gray-500">Registro de consulta y diagnóstico</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleCreateOrder}
              className="p-4 border rounded-md text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium">Generar Orden</p>
                  <p className="text-sm text-gray-500">Exámenes, terapias o cirugías</p>
                </div>
              </div>
            </button>
          </div>

          {serviceType === 'consultation' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo de Consulta
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describa el motivo de la consulta..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnóstico
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ingrese el diagnóstico..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tratamiento
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describa el tratamiento..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Guardar Consulta
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Orden
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Seleccione un tipo</option>
              <option value="exam">Examen Médico</option>
              <option value="therapy">Terapia</option>
              <option value="surgery">Intervención Quirúrgica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Describa los detalles de la orden..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instrucciones
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Instrucciones adicionales..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowOrderForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generar Orden
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
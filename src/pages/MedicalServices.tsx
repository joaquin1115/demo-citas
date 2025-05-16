import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import {
  Calendar,
  Clock,
  User,
  FileText,
  ChevronRight,
  Plus,
  X,
  Save,
  Stethoscope,
  Heart,
  Activity,
  Brain
} from 'lucide-react';

const MedicalServices: React.FC = () => {
  const { user } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderType, setOrderType] = useState<'exam' | 'surgery' | 'therapy' | 'consultation' | null>(null);

  if (!user) return null;

  // Sample appointments data
  const appointments = [
    {
      id: '1',
      patientName: 'Carlos Sánchez',
      date: '2025-06-15',
      time: '09:00',
      status: 'pending',
      reason: 'Control mensual'
    },
    {
      id: '2',
      patientName: 'Ana García',
      date: '2025-06-15',
      time: '10:30',
      status: 'in-progress',
      reason: 'Dolor de espalda'
    }
  ];

  const handleStartAppointment = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
  };

  const handleCreateOrder = () => {
    // Here you would submit the order to your backend
    setShowOrderForm(false);
    setOrderType(null);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Citas Médicas</h1>
      </div>

      {selectedAppointment ? (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <button
                  onClick={() => {
                    setSelectedAppointment(null);
                    setShowOrderForm(false);
                    setOrderType(null);
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <span className="mr-1">←</span> Volver
                </button>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {appointments.find(a => a.id === selectedAppointment)?.patientName}
                </h2>
                <p className="text-gray-600">
                  {appointments.find(a => a.id === selectedAppointment)?.reason}
                </p>
              </div>
              {!showOrderForm && (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus size={20} className="mr-2" />
                  Generar Orden
                </button>
              )}
            </div>

            {showOrderForm ? (
              <div className="space-y-6">
                {!orderType ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Seleccionar Tipo de Orden
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button
                        onClick={() => setOrderType('exam')}
                        className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center mb-3">
                          <Activity className="h-8 w-8 text-blue-600 mr-3" />
                          <h4 className="text-lg font-medium">Examen Médico</h4>
                        </div>
                        <p className="text-gray-600">
                          Solicitar exámenes de laboratorio, radiografías, ecografías, etc.
                        </p>
                      </button>

                      <button
                        onClick={() => setOrderType('surgery')}
                        className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center mb-3">
                          <Heart className="h-8 w-8 text-red-600 mr-3" />
                          <h4 className="text-lg font-medium">Intervención Quirúrgica</h4>
                        </div>
                        <p className="text-gray-600">
                          Programar cirugías y procedimientos quirúrgicos.
                        </p>
                      </button>

                      <button
                        onClick={() => setOrderType('therapy')}
                        className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center mb-3">
                          <Brain className="h-8 w-8 text-green-600 mr-3" />
                          <h4 className="text-lg font-medium">Terapia</h4>
                        </div>
                        <p className="text-gray-600">
                          Solicitar terapia física, ocupacional, del lenguaje, etc.
                        </p>
                      </button>

                      <button
                        onClick={() => setOrderType('consultation')}
                        className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center mb-3">
                          <Stethoscope className="h-8 w-8 text-purple-600 mr-3" />
                          <h4 className="text-lg font-medium">Consulta Especializada</h4>
                        </div>
                        <p className="text-gray-600">
                          Derivar a consulta con un especialista.
                        </p>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-800">
                        {orderType === 'exam' && 'Orden de Examen Médico'}
                        {orderType === 'surgery' && 'Orden de Intervención Quirúrgica'}
                        {orderType === 'therapy' && 'Orden de Terapia'}
                        {orderType === 'consultation' && 'Orden de Consulta Especializada'}
                      </h3>
                      <button
                        onClick={() => setOrderType(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Especialidad
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Seleccionar especialidad</option>
                          {orderType === 'exam' && (
                            <>
                              <option value="laboratory">Laboratorio Clínico</option>
                              <option value="radiology">Radiología</option>
                              <option value="ultrasound">Ecografía</option>
                              <option value="cardiology">Cardiología</option>
                            </>
                          )}
                          {orderType === 'surgery' && (
                            <>
                              <option value="general">Cirugía General</option>
                              <option value="orthopedics">Traumatología</option>
                              <option value="ophthalmology">Oftalmología</option>
                              <option value="cardiology">Cirugía Cardiovascular</option>
                            </>
                          )}
                          {orderType === 'therapy' && (
                            <>
                              <option value="physical">Terapia Física</option>
                              <option value="occupational">Terapia Ocupacional</option>
                              <option value="speech">Terapia del Lenguaje</option>
                              <option value="respiratory">Terapia Respiratoria</option>
                            </>
                          )}
                          {orderType === 'consultation' && (
                            <>
                              <option value="cardiology">Cardiología</option>
                              <option value="neurology">Neurología</option>
                              <option value="endocrinology">Endocrinología</option>
                              <option value="dermatology">Dermatología</option>
                              <option value="traumatology">Traumatología</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción/Motivo
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder={
                            orderType === 'exam'
                              ? 'Detallar los exámenes requeridos...'
                              : orderType === 'surgery'
                              ? 'Describir el procedimiento quirúrgico...'
                              : orderType === 'therapy'
                              ? 'Especificar el tipo de terapia y objetivo...'
                              : 'Describir el motivo de la consulta...'
                          }
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instrucciones/Preparación
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Instrucciones específicas para el paciente..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Diagnóstico
                        </label>
                        <textarea
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Diagnóstico que justifica la orden..."
                        ></textarea>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setShowOrderForm(false);
                            setOrderType(null);
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleCreateOrder}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <Save size={20} className="mr-2" />
                          Generar Orden
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Appointment details and medical record form would go here */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Detalles de la Cita</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">
                        {appointments.find(a => a.id === selectedAppointment)?.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hora</p>
                      <p className="font-medium">
                        {appointments.find(a => a.id === selectedAppointment)?.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add your medical record form components here */}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Citas del Día</h2>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`flex items-center justify-between p-4 rounded-md ${
                    appointment.status === 'completed'
                      ? 'bg-green-50 border-l-4 border-green-500'
                      : appointment.status === 'in-progress'
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'bg-gray-50 border-l-4 border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div className="text-sm font-medium mt-1">{appointment.time}</div>
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-gray-500">{appointment.reason}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartAppointment(appointment.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      appointment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-white text-blue-600 border border-blue-600'
                    }`}
                  >
                    {appointment.status === 'completed'
                      ? 'Ver detalles'
                      : appointment.status === 'in-progress'
                      ? 'Continuar'
                      : 'Iniciar atención'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalServices;
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  Search, 
  User, 
  FileText, 
  Thermometer, 
  Heart, 
  Stethoscope, 
  Clipboard,
  Plus,
  ChevronDown,
  X,
  Save,
  Plus as PlusIcon
} from 'lucide-react';

const MedicalServices: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceType, setServiceType] = useState<string | null>(null);
  
  if (!user || user.currentRole !== 'medical') {
    return (
      <div className="container mx-auto text-center py-12">
        <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Acceso Restringido</h2>
        <p className="text-gray-600">
          Solo el personal médico puede acceder a esta sección.
        </p>
      </div>
    );
  }

  // Sample patients for search
  const patients = [
    { id: '1', name: 'Juan Pérez', dni: '40582934', age: 38 },
    { id: '2', name: 'María González', dni: '35421678', age: 45 },
    { id: '3', name: 'Carlos Rodríguez', dni: '42563198', age: 29 },
  ];

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dni.includes(searchTerm)
  );

  const handleSelectServiceType = (type: string) => {
    setServiceType(type);
    setShowServiceForm(true);
  };

  const handleCancelService = () => {
    setShowServiceForm(false);
    setServiceType(null);
  };

  const handleSubmitService = () => {
    // Here you would submit the service data to your backend
    console.log('Service submitted for patient:', selectedPatient, 'Type:', serviceType);
    // Reset form
    setShowServiceForm(false);
    setServiceType(null);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Registrar Servicio Médico</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Search */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Buscar Paciente</h2>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Nombre o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  className={`w-full p-4 border rounded-md text-left focus:outline-none transition-colors ${
                    selectedPatient === patient.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-600">DNI: {patient.dni} • {patient.age} años</p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p>No se encontraron pacientes</p>
                <p className="text-sm mt-1">Intente con otro término de búsqueda</p>
              </div>
            )}
          </div>
        </div>

        {/* Service Selection */}
        {selectedPatient && !showServiceForm && (
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Seleccionar Servicio Médico</h2>
              <p className="text-sm text-gray-600">
                Paciente: <span className="font-medium">
                  {patients.find(p => p.id === selectedPatient)?.name}
                </span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectServiceType('triage')}
                className="p-6 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">Triaje</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Registro de signos vitales, peso, talla y evaluación inicial del paciente.
                </p>
              </button>
              
              <button
                onClick={() => handleSelectServiceType('exam')}
                className="p-6 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Clipboard className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">Examen Médico</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Registro de exámenes médicos y resultados de laboratorio.
                </p>
              </button>
              
              <button
                onClick={() => handleSelectServiceType('diagnosis')}
                className="p-6 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Stethoscope className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">Diagnóstico</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Registro de síntomas, diagnóstico y morbilidades según CIE-10.
                </p>
              </button>
              
              <button
                onClick={() => handleSelectServiceType('hospitalization')}
                className="p-6 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">Hospitalización</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Ingreso hospitalario, controles y seguimiento.
                </p>
              </button>
              
              <button
                onClick={() => handleSelectServiceType('treatment')}
                className="p-6 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">Tratamiento</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Registro de medicamentos, terapias e intervenciones quirúrgicas.
                </p>
              </button>
            </div>
          </div>
        )}
        
        {/* Service Form */}
        {selectedPatient && showServiceForm && (
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {serviceType === 'triage' && 'Registro de Triaje'}
                  {serviceType === 'exam' && 'Registro de Examen Médico'}
                  {serviceType === 'diagnosis' && 'Registro de Diagnóstico'}
                  {serviceType === 'hospitalization' && 'Registro de Hospitalización'}
                  {serviceType === 'treatment' && 'Registro de Tratamiento'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Paciente: <span className="font-medium">
                    {patients.find(p => p.id === selectedPatient)?.name}
                  </span>
                </p>
              </div>
              <button 
                onClick={handleCancelService}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            {serviceType === 'triage' && <TriageForm />}
            {serviceType === 'exam' && <ExamForm />}
            {serviceType === 'diagnosis' && <DiagnosisForm />}
            {serviceType === 'hospitalization' && <HospitalizationForm />}
            {serviceType === 'treatment' && <TreatmentForm />}
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={handleCancelService}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitService}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save size={18} className="inline mr-2" />
                Guardar Registro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TriageForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperatura (°C)
          </label>
          <input
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="36.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presión Arterial (mmHg)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="120"
            />
            <span className="flex items-center">/</span>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="80"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frecuencia Cardíaca (lpm)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="75"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frecuencia Respiratoria (rpm)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="16"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saturación de Oxígeno (%)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="98"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Glicemia (mg/dL)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="85"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="70.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Talla (cm)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="170"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IMC
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            placeholder="24.3"
            disabled
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese observaciones adicionales..."
        ></textarea>
      </div>
    </div>
  );
};

const ExamForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Examen
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccione un tipo</option>
            <option value="blood">Análisis de Sangre</option>
            <option value="urine">Análisis de Orina</option>
            <option value="xray">Radiografía</option>
            <option value="ultrasound">Ecografía</option>
            <option value="ekg">Electrocardiograma</option>
            <option value="ct">Tomografía Computarizada</option>
            <option value="mri">Resonancia Magnética</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha del Examen
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Solicitado por
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre del médico solicitante"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivo del Examen
          </label>
          <textarea
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Razón por la que se solicita el examen..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resultados
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describa los resultados del examen..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interpretación
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Interpretación médica de los resultados..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const DiagnosisForm: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  
  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom('');
    }
  };
  
  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Síntomas Reportados
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese un síntoma..."
            onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
          />
          <button
            type="button"
            onClick={addSymptom}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        
        {symptoms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <div 
                key={index}
                className="flex items-center bg-blue-50 px-3 py-1 rounded-full"
              >
                <span className="text-blue-800">{symptom}</span>
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diagnóstico Principal
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar en CIE-10..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diagnósticos Secundarios
        </label>
        <div className="border border-gray-300 rounded-md p-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="diag1"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="diag1" className="ml-2 block text-sm text-gray-900">
                E11 - Diabetes mellitus tipo 2
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="diag2"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="diag2" className="ml-2 block text-sm text-gray-900">
                I10 - Hipertensión esencial (primaria)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="diag3"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="diag3" className="ml-2 block text-sm text-gray-900">
                E78.0 - Hipercolesterolemia pura
              </label>
            </div>
          </div>
          
          <button
            type="button"
            className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" />
            Añadir otro diagnóstico
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas Adicionales
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Observaciones adicionales sobre el diagnóstico..."
        ></textarea>
      </div>
    </div>
  );
};

const HospitalizationForm: React.FC = () => {
  const [isNewHospitalization, setIsNewHospitalization] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-medium text-blue-800">Estado de Hospitalización</h3>
            <p className="text-sm text-blue-700 mt-1">
              {isNewHospitalization 
                ? 'No hay una hospitalización activa para este paciente.' 
                : 'El paciente tiene una hospitalización activa desde 10/06/2025.'
              }
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsNewHospitalization(!isNewHospitalization)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isNewHospitalization ? 'Ver activa' : 'Nueva hospitalización'}
            </button>
          </div>
        </div>
      </div>
      
      {isNewHospitalization ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Ingreso
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora de Ingreso
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo de Hospitalización
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describa el motivo de la hospitalización..."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área/Departamento
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione un área</option>
                <option value="internal">Medicina Interna</option>
                <option value="surgery">Cirugía</option>
                <option value="cardiology">Cardiología</option>
                <option value="pediatrics">Pediatría</option>
                <option value="icu">UCI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                N° de Habitación
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 302-A"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Médico Responsable
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre del médico a cargo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas de Ingreso
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Observaciones adicionales sobre el ingreso..."
            ></textarea>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-gray-800">Detalles de Hospitalización Activa</h3>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex">
                <span className="text-gray-600 w-36">Fecha de Ingreso:</span>
                <span>10/06/2025 - 14:30</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-36">Motivo:</span>
                <span>Neumonía aguda</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-36">Área/Habitación:</span>
                <span>Medicina Interna - 205-B</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-36">Médico Responsable:</span>
                <span>Dr. Fernando Méndez</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Registrar Nuevo Control</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evolución del Paciente
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describa la evolución del paciente..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signos Vitales
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="T: 36.7°C"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="PA: 120/80"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="FC: 72 lpm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="FR: 16 rpm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicaciones
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Instrucciones y tratamiento indicado..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="alta"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="alta" className="ml-2 block text-sm text-gray-900">
                  Dar de alta al paciente
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TreatmentForm: React.FC = () => {
  const [selectedTreatmentType, setSelectedTreatmentType] = useState<string | null>(null);
  const [medications, setMedications] = useState<any[]>([]);
  
  const addMedication = () => {
    setMedications([...medications, { id: Date.now() }]);
  };
  
  const removeMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  return (
    <div className="space-y-6">
      {!selectedTreatmentType ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedTreatmentType('medication')}
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            <PlusIcon className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <h3 className="text-gray-800 font-medium">Agregar Medicamento</h3>
          </button>
          
          <button
            onClick={() => setSelectedTreatmentType('therapy')}
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            <PlusIcon className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <h3 className="text-gray-800 font-medium">Agregar Terapia</h3>
          </button>
          
          <button
            onClick={() => setSelectedTreatmentType('surgery')}
            className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            <PlusIcon className="h-8 w-8 mx-auto text-red-500 mb-2" />
            <h3 className="text-gray-800 font-medium">Agregar Intervención Quirúrgica</h3>
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              {selectedTreatmentType === 'medication' && 'Registro de Medicamentos'}
              {selectedTreatmentType === 'therapy' && 'Registro de Terapia'}
              {selectedTreatmentType === 'surgery' && 'Registro de Intervención Quirúrgica'}
            </h3>
            <button
              onClick={() => setSelectedTreatmentType(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {selectedTreatmentType === 'medication' && (
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="border border-gray-200 rounded-md p-4 relative">
                  <button
                    type="button"
                    onClick={() => removeMedication(med.id)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Medicamento
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Paracetamol"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Presentación
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Tabletas 500mg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosis
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 1 tableta"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frecuencia
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Cada 8 horas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duración
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 5 días"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Indicaciones Especiales
                    </label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Tomar después de las comidas..."
                    ></textarea>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addMedication}
                className="w-full py-3 border border-dashed border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
              >
                <Plus size={20} className="inline mr-2" />
                Agregar otro medicamento
              </button>
            </div>
          )}
          
          {selectedTreatmentType === 'therapy' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Terapia
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="physical">Terapia Física</option>
                    <option value="respiratory">Terapia Respiratoria</option>
                    <option value="occupational">Terapia Ocupacional</option>
                    <option value="speech">Terapia del Lenguaje</option>
                    <option value="psychological">Terapia Psicológica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: 3 veces por semana"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duración Estimada
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: 4 semanas"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivos de la Terapia
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describa los objetivos a lograr con la terapia..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instrucciones Específicas
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Indique instrucciones específicas para el terapeuta o el paciente..."
                ></textarea>
              </div>
            </div>
          )}
          
          {selectedTreatmentType === 'surgery' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Intervención
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Apendicectomía"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Programada
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cirujano Principal
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre del cirujano principal"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnóstico Pre-Quirúrgico
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Diagnóstico que justifica la intervención..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Procedimiento
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describa el procedimiento quirúrgico..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consideraciones Especiales
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Alergias, condiciones médicas relevantes, etc."
                ></textarea>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MedicalServices;
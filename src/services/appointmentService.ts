
export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  purpose: 'general-viewing' | 'specific-item' | 'custom-order';
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
};

const APPOINTMENTS_STORAGE_KEY = 'admin_appointments';

// Helper function to get appointments from localStorage
const getAppointmentsFromStorage = (): Appointment[] => {
  try {
    const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!stored) return [];
    
    const appointments = JSON.parse(stored);
    // Convert date strings back to Date objects
    return appointments.map((appointment: any) => ({
      ...appointment,
      date: new Date(appointment.date),
      createdAt: new Date(appointment.createdAt)
    }));
  } catch (error) {
    console.error('Error reading appointments from localStorage:', error);
    return [];
  }
};

// Helper function to save appointments to localStorage
const saveAppointmentsToStorage = (appointments: Appointment[]): void => {
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Error saving appointments to localStorage:', error);
  }
};

// Get all appointments
export const getAppointments = async (): Promise<Appointment[]> => {
  console.log('Fetching appointments from localStorage...');
  const appointments = getAppointmentsFromStorage();
  return appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Get appointment by ID
export const getAppointmentById = async (id: string): Promise<Appointment | undefined> => {
  console.log('Fetching appointment by ID:', id);
  const appointments = getAppointmentsFromStorage();
  return appointments.find(appointment => appointment.id === id);
};

// Create a new appointment
export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> => {
  console.log('Creating appointment with data:', appointment);
  
  // Validate required fields
  if (!appointment.name?.trim()) {
    throw new Error('Name is required');
  }
  if (!appointment.email?.trim()) {
    throw new Error('Email is required');
  }
  if (!appointment.phone?.trim()) {
    throw new Error('Phone is required');
  }
  if (!appointment.date) {
    throw new Error('Date is required');
  }
  if (!appointment.time?.trim()) {
    throw new Error('Time is required');
  }
  
  const appointments = getAppointmentsFromStorage();
  
  const newAppointment: Appointment = {
    ...appointment,
    id: crypto.randomUUID(),
    name: appointment.name.trim(),
    email: appointment.email.trim().toLowerCase(),
    phone: appointment.phone.trim(),
    message: appointment.message?.trim() || undefined,
    status: 'pending',
    createdAt: new Date()
  };
  
  appointments.push(newAppointment);
  saveAppointmentsToStorage(appointments);
  
  console.log('Successfully created appointment:', newAppointment);
  return newAppointment;
};

// Update an appointment status
export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<Appointment | undefined> => {
  console.log('Updating appointment status:', { id, status });
  
  if (!id) {
    throw new Error('Appointment ID is required');
  }
  
  const appointments = getAppointmentsFromStorage();
  const appointmentIndex = appointments.findIndex(appointment => appointment.id === id);
  
  if (appointmentIndex === -1) {
    console.log('No appointment found to update with ID:', id);
    return undefined;
  }
  
  appointments[appointmentIndex].status = status;
  saveAppointmentsToStorage(appointments);
  
  console.log('Successfully updated appointment status:', appointments[appointmentIndex]);
  return appointments[appointmentIndex];
};

// Get available time slots for a specific date
export const getAvailableTimeSlots = async (date: Date): Promise<string[]> => {
  try {
    // Business hours: 10 AM to 6 PM with 30-minute slots
    const allTimeSlots = [
      '10:00', '10:30',
      '11:00', '11:30',
      '12:00', '12:30',
      '13:00', '13:30',
      '14:00', '14:30',
      '15:00', '15:30',
      '16:00', '16:30',
      '17:00', '17:30'
    ];

    // Get booked appointments for the selected date
    const appointments = getAppointmentsFromStorage();
    const dateString = date.toISOString().split('T')[0];
    console.log('Fetching booked slots for date:', dateString);
    
    const bookedSlots = appointments
      .filter(appointment => 
        appointment.date.toISOString().split('T')[0] === dateString && 
        appointment.status !== 'cancelled'
      )
      .map(appointment => appointment.time);
    
    console.log('Booked slots:', bookedSlots);

    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    console.log('Available slots:', availableSlots);

    return availableSlots;
  } catch (error) {
    console.error('Error in getAvailableTimeSlots:', error);
    // Return all slots if there's an error
    return [
      '10:00', '10:30',
      '11:00', '11:30',
      '12:00', '12:30',
      '13:00', '13:30',
      '14:00', '14:30',
      '15:00', '15:30',
      '16:00', '16:30',
      '17:00', '17:30'
    ];
  }
};

// Delete an appointment
export const deleteAppointment = async (id: string): Promise<boolean> => {
  console.log('Deleting appointment with ID:', id);
  
  if (!id) {
    throw new Error('Appointment ID is required for deletion');
  }
  
  const appointments = getAppointmentsFromStorage();
  const filteredAppointments = appointments.filter(appointment => appointment.id !== id);
  
  if (filteredAppointments.length === appointments.length) {
    console.log('No appointment found to delete with ID:', id);
    return false;
  }
  
  saveAppointmentsToStorage(filteredAppointments);
  console.log('Successfully deleted appointment');
  return true;
};

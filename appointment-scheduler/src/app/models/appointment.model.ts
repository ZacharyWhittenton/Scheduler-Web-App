export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  userId: string; // links appointment to the client
}
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'client';
}

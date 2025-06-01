import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([]);

  getAppointments(): Observable<Appointment[]> {
    return this.appointments.asObservable();
  }

  addAppointment(appt: Appointment) {
    const updated = [...this.appointments.value, appt];
    this.appointments.next(updated);
  }

  deleteAppointment(id: string) {
    const updated = this.appointments.value.filter(a => a.id !== id);
    this.appointments.next(updated);
  }
}

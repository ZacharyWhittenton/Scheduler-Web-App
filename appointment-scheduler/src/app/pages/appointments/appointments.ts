import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
export class AppointmentsComponent implements OnInit {
  appointmentForm!: ReturnType<FormBuilder['group']>;
  appointments$ = new Observable<Appointment[]>();

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}
  

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      clientName: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });

    this.appointments$ = this.appointmentService.getAppointments();
  }

  save() {
    const formValue = this.appointmentForm.value;
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      clientName: formValue.clientName!,
      service: formValue.service!,
      date: formValue.date!,
      time: formValue.time!,
      notes: formValue.notes ?? '',
      userId: ''
    };
    this.appointmentService.addAppointment(appointment);
    this.appointmentForm.reset();
  }

  delete(id: string) {
    this.appointmentService.deleteAppointment(id);
  }
}

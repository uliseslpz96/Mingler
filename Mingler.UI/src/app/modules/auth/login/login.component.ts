import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validateForm: FormGroup; // Evita usar `!` para inicialización forzada

  constructor(
    private fb: NonNullableFormBuilder,
    private modal: NzModalService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.showConfirm();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>¿Desea brindar su ubicación?</i>',
      nzContent:
        '<b>Atención</b><p>Esta plataforma hace uso de tu ubicación concede los permisos para poder continuar.</p>',
      nzOkText: 'Permitir',
      nzOnOk: () => this.getUserLocation(),
    });
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const userData = {
            username: this.validateForm.value.userName,
            lat: latitude,
            lon: longitude,
          };

          const jsonValue = JSON.stringify(userData);
          localStorage.setItem('data-user', jsonValue);

          this.router.navigate(['/news/local']);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('La geolocalización no está soportada por este navegador.');
    }
  }

  toRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}

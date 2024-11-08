import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(private mainService: MainServiceService,
              private router: Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    const userData = {
      username: this.registerForm.value.username?.trim(),
      password: this.registerForm.value.password?.trim()
    }
    //validate username and password not empty
    if (!userData.username || !userData.password) {
      Swal.fire({
        title: 'Error!',
        text: 'Ingrese un Usuario y una Contraseña.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      return;
    }
    this.mainService.registerUser(userData).subscribe(
      (res: AuthResponse) => {
        Swal.fire({
          title: 'Usuario Creado!',
          text: 'Usuario creado exitosamente. Sesión iniciada.',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['/home'])
      },
      (err) => {
        console.log(err)
      }
    )
  }


}

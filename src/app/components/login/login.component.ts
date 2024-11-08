import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainServiceService } from '../../services/main-service.service';
import { AuthResponse } from '../../interfaces/auth-response.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup
  errorMessage: string | null = null

  constructor(private mainService: MainServiceService,
              private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    const userData = {
      username: this.loginForm.value.username?.trim(),
      password: this.loginForm.value.password?.trim()
    }
    
    if (!userData.username || !userData.password) {
      return
    }

    this.mainService.loginUser(userData).subscribe(
      (res: AuthResponse) => {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['/home'])
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Usuario o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      }
    )
    console.log(this.loginForm.value)
  }

}

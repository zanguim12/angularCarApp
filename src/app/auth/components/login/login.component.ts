import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzMessageModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res)

      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        }

        StorageService.saveUser(user)
        StorageService.saveToken(res.jwt)

        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard')
          return
        }

         if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('/customer/dashboard')
          return
         }

        this.message.error('Bad credentials', {
          nzDuration: 3000
        })
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning: boolean = false

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    })
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  register(): void {
    console.log(this.signupForm.value)
    this.authService.register(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe(
      res => {
        console.log('res', res)

        if (res.id !== null) {
          this.message.success('User registered successfully', {
            nzDuration: 5000
          })
          this.router.navigateByUrl('/login')
        } else {
          this.message.error('User registration failed', {
            nzDuration: 5000
          })
        }
      },
      err => {
        console.log(err)
      }
    )
  }
}

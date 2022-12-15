import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  register() {
    const user = {
      username: this.registerForm.value.username,

      password: this.registerForm.value.password,

      confirmPassword: this.registerForm.value.confirmPassword,

      email: this.registerForm.value.email,

      phone: this.registerForm.value.phone
    };
    this.authService.register(user).subscribe((data) => {
      alert('Tạo tài khoản thành công!');
    });
  }
}

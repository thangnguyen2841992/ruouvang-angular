import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  user: User = {};
  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.currentUser.subscribe(value => this.user = value);
  }

  ngOnInit() {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
      sessionStorage.setItem('user', JSON.stringify(this.user));
      switch (this.user.roles[0].authority) {
        case 'ROLE_ADMIN': {
          this.router.navigateByUrl('/admin/all');
          break;
        }
        case 'ROLE_USER': {
          this.router.navigateByUrl('/home');
          break;
        }
      }
    });
  }
}

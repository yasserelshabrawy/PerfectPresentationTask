import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: any[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      },
    });
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      this.toaster.error('Email or Password is incorrect');
    } else {
      const model = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.service.login(model).subscribe({
        next: (res: any) => {
          this.service.user.next(res);
          console.log(res);
          this.toaster.success('logged in successfully');
          this.router.navigate(['']);
        },
      });
    }
  }
}

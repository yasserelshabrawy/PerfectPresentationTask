import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private translate:TranslateService
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
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z 0-9])(?=.{4,})/),
        ],
      ],
    });
  }

  login() {
    let index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      this.toaster.error(this.translate.instant('toaster.emailPassword'));
    } else {
      const model = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        username:'Admin',
      };
      this.service.login(model).subscribe({
        next: (res: any) => {
          this.service.user.next(res);
          this.toaster.success(this.translate.instant('toaster.login'));
          this.router.navigate(['']);
          localStorage.setItem('token', res?.username)
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  users: any[] = [];
  selectedRole: string = '';
  date: Date = new Date();
  country : string =''
  city : string =''
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster:ToastrService
  ) {}
  roles: any = [{ name: 'Admin' }, { name: 'Viewer' }, { name: 'contributer' }];

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
    this.service.getLocation().subscribe((res:any)=>{
      this.country = res.country_name;
      this.city = res.city;
    })
  }
  updateSelectedRole() {
    this.selectedRole = this.registerForm.get('role')?.value;
  }
  createForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{5,})/),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{5,})/),
          ],
        ],
        role: [''],
      },
      { validators: this.checkPassword }
    );
  }
  getUsers() {
    this.service.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      },
    });
  }
  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    return password == confirmPassword ? null : { notmatch: true };
  };
  formatMediumDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  }

  register() {

    const model = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.selectedRole,
      createdAt: this.formatMediumDate(this.date),
      location: `${this.country} , ${this.city}`,
    };
    let index = this.users.findIndex(
      (item) => item.email == this.registerForm.value.email
    );
    if (index !== -1) {
      this.toaster.error('Email already exist');
    } else {
      this.service.register(model as User).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/home']);
          this.toaster.success('Account successfully created');
        },
      });
    }
  }
}

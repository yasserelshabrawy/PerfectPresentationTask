import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
})
export class NewUserDialogComponent {
  users: any[] = [];
  selectedRole: string = '';
  date: Date = new Date();
  country: string = '';
  city: string = '';
  userList!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  onNoClick(user: any): void {
    this.dialogRef.close(user);
  }
  roles: any = [{ name: 'Admin' }, { name: 'Viewer' }, { name: 'contributer' }];
  ngOnInit(): void {
    this.createForm();
    this.service.getLocation().subscribe((res: any) => {
      this.country = res.country_name;
      this.city = res.city;
    });
  }
  updateSelectedRole() {
    this.selectedRole = this.userList.get('role')?.value;
  }
  createForm() {
    this.userList = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
    });
  }
  formatMediumDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
  userform() {
    const model = {
      username: this.userList.value.username,
      email: this.userList.value.email,
      role: this.selectedRole,
      createdAt: this.formatMediumDate(this.date),
      location: `${this.country} , ${this.city}`,
    };
    this.service.userList(model).subscribe({
      next: (res) => {
        console.log(res);
        this.onNoClick(res);
      },
    });
  }
}

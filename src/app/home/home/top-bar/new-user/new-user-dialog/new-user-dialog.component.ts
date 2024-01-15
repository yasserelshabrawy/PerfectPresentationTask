import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
})
export class NewUserDialogComponent {
  user: any[] = [];
  selectedRole: string = '';
  date: Date = new Date();
  country: string = '';
  city: string = '';
  userList!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toaster: ToastrService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {}
  dataSource = new MatTableDataSource<User>(this.user);


  close() {
    this.dialogRef.close();
  }
  roles: any = [
    { name: this.translate.instant('option.all')  },
    { name: this.translate.instant('option.viewer') },
    { name: this.translate.instant('option.contributer') },
  ];
  ngOnInit(): void {
    this.createForm();
    this.service.getLocation().subscribe((res: any) => {
      this.country = res.country_name;
      this.city = res.city;
    });
    console.log(this.data?.role);


  }
  updateSelectedRole() {
    this.selectedRole = this.userList.get('role')?.value;
  }
  createForm() {
    this.userList = this.fb.group({
      username: [
        this.data?.username || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      role: [this.data?.role || '', Validators.required],
      joined: [
        this.data && this.data.createdAt
          ? new Date(this.data.createdAt).toISOString()
          : '',
        [Validators.required],
      ],
    });


  }

  userform() {
    const model = {
      username: this.userList.value.username,
      email: this.userList.value.email,
      role: this.selectedRole,
      createdAt: moment(this.userList.value['joined']).format('MMM DD, YYYY'),
      location: `${this.country} , ${this.city}`,
    };
    this.service.userList(model).subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res;
        this.toaster.success(this.translate.instant('toaster.newUser'))
        // this.dataSource = new MatTableDataSource<User>(this.user);
        // console.log(this.dataSource);

        this.close();
      },
    });
  }
  update(){
    const model = {
      username: this.userList.value.username,
      email: this.userList.value.email,
      role: this.selectedRole,
      createdAt: moment(this.userList.value['joined']).format('MMM DD, YYYY'),
      location: `${this.country} , ${this.city}`,
    };
    this.service.updateUser(model , this.data?.id).subscribe({
      next:(res:any)=>{
        this.close()
      }
    })
  }
}

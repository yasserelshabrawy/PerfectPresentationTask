import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  constructor(public dialog: MatDialog, private service: UserService) {}
  @Output() userEventEmitter = new EventEmitter<User>();

  addUser(user: User) {
    this.userEventEmitter.emit(user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addUser(result);
    });
  }
}

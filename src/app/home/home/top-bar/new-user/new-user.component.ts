import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  constructor(public dialog: MatDialog) {}

  @Output() userEventEmitter = new EventEmitter<User>();

  emitSearch(user:User) {
    this.userEventEmitter.emit(user);
    console.log('emitted', user)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('recieved from dialog', result)
      this.emitSearch(result);

      // this.animal = result;
    });
  }
}


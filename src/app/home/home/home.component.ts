import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NewUserDialogComponent } from './top-bar/new-user/new-user-dialog/new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  permission: string = 'all';
  user: User[] = [];
  searchText: string = '';
  constructor(private service: UserService, public dialog: MatDialog) {}
  dataSource = new MatTableDataSource<User>(this.user); // Initialize with an empty array

  displayedColumns: string[] = [
    'position',
    'Full Name',
    'Email Address',
    'location',
    'Joined',
    'Permissions',
    'edit',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service.getUserList().subscribe((res: any) => {
      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
    });
  }

  search(search: string) {
    this.searchText = search;
    this.filterUsers();
  }

  private filterUsers() {
    const searchTerm = this.searchText.toLowerCase();

    if (searchTerm) {
      this.dataSource.data = this.user.filter((user) =>
        user.username.toLowerCase().includes(searchTerm)
      );
    } else {
      this.dataSource.data = this.user;
    }
  }

  filterViaPermission(permission: string) {
    this.permission = permission;
    this.filterPermission();
  }

  private filterPermission() {
    if (this.permission === 'all') {
      this.dataSource.data = this.user;
    } else {
      this.dataSource.data = this.user.filter(
        (user) => user.role.toLowerCase() === this.permission
      );
    }
  }
  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getUser();
      },
    });
  }
  update(element: any): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '650px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getUser();
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}

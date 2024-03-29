import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NewUserDialogComponent } from './top-bar/new-user/new-user-dialog/new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  permission: string = 'all';
  date: string = 'all';
  user: User[] = [];
  searchText: string = '';
  selectedOption: string = 'anytime';
  selectedUsers: User[] = [];
  selectAll: boolean = false;
  constructor(
    private service: UserService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private toaster: ToastrService,
    private translate: TranslateService
  ) {}
  dataSource = new MatTableDataSource<User>(this.user);

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
    this.matPaginaotr()
  }

  
  matPaginaotr() {
    this._MatPaginatorIntl.itemsPerPageLabel =
    this.translate.instant('page.itemsPerPageLabel');
    this._MatPaginatorIntl.firstPageLabel =
    this.translate.instant('page.firstPageLabel');
    this._MatPaginatorIntl.itemsPerPageLabel =
      this.translate.instant('page.itemPerPage');
    this._MatPaginatorIntl.lastPageLabel =
      this.translate.instant('page.lastPageLabel');
    this._MatPaginatorIntl.nextPageLabel =
      this.translate.instant('page.nextPageLabel');
    this._MatPaginatorIntl.previousPageLabel =
    this.translate.instant('page.previousPageLabel');
 this._MatPaginatorIntl.  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('page.of') + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex +  this.translate.instant('page.of') + length;
  };
}


  getUser() {
    this.service.getUserList().subscribe((res: any) => {
      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
    });
  }

  addUser(user: User) {
    if (user) {
      this.user.push(user);
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
    }
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

  onFilterOptionChange(selectedOption: string) {
    if (this.selectedOption === selectedOption) {
      this.filterDate('anytime');
    }
  }
  filterDate(date: string) {
    this.date = date;
    this.filterViaDate();
  }
  private filterViaDate() {
    if (this.date === 'anytime') {
      this.dataSource.data = this.user;
    } else {
      const selectedDate = new Date(this.date);

      this.dataSource.data = this.user.filter((user) => {
        const userCreatedAt = new Date(user.createdAt);
        return userCreatedAt.toDateString() === selectedDate.toDateString();
      });
    }
  }

  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe({
      next: (res) => {
        this.toaster.success('Delete Successfully');
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

  toggleSelectAll(): void {
    if (this.selectAll) {
      this.selectedUsers = [...this.user];
    } else {
      this.selectedUsers = [];
    }
  }

  checkBox(user: User): void {
    const index = this.selectedUsers.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  deleteSelectedUsers() {
    if (this.selectedUsers.length === 0) {
      this.toaster.warning('Select at least one user to delete.');
      return;
    }
    this.selectedUsers.forEach((user: User) => {
      this.service.deleteUser(user.id).subscribe({
        next: (res) => {
          this.toaster.success('Selected users deleted successfully');
          this.getUser();
        },
        error: (err) => {
          console.error('Error deleting user:');
        },
      });
    });
    this.user = [];
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

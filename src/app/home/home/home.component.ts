import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  permission:string = 'all';
  user: User[] = [];
  searchText: string = '';
  constructor(private service: AuthService) {}
  dataSource = new MatTableDataSource<User>(this.user); // Initialize with an empty array

  displayedColumns: string[] = [
    'position',
    'Full Name',
    'Email Address',
    'Joined',
    'Permissions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getUser();
  }

  addUser(user:User){
    this.user.push(user);
    this.dataSource = new MatTableDataSource<User>(this.user);
  }
  getUser() {
    this.service.getUserList().subscribe((res: any) => {
      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
      console.log(this.user);
    });
  }

  search(search: string) {
    this.searchText = search;
    this.filterUsers();
  }

  private filterUsers() {
    const searchTerm = this.searchText.toLowerCase();

    if (searchTerm) {

      this.dataSource.data = this.user.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm)
          // ||
          // user.email.toLowerCase().includes(searchTerm)
      );
    } else {

      this.dataSource.data = this.user;
    }
  }

  filterViaPermission(permission:string){
    this.permission = permission;
  this.filterPermission(); // Apply permission filter when permission changes
  }

  private filterPermission() {
    if (this.permission === 'all') {
      this.dataSource.data = this.user;
    } else {
      this.dataSource.data = this.user.filter((user) => user.role.toLowerCase() === this.permission);
    }
  }
}


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

  getUser() {
    this.service.getUsers().subscribe((res: any) => {
      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user); // Update dataSource with the retrieved data
      this.dataSource.paginator = this.paginator; // Set the paginator after updating the dataSource
      console.log(this.user);
    });
  }

  search(search: string) {
    this.searchText = search;
    this.filterUsers();
  }

  private filterUsers() {
    const searchTerm = this.searchText.toLowerCase(); // Convert to lowercase for case-insensitive matching

    if (searchTerm) {
      // Filter users based on the search term
      this.dataSource.data = this.user.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm)
          // ||
          // user.email.toLowerCase().includes(searchTerm)
      );
    } else {
      // If search term is empty, show all users
      this.dataSource.data = this.user;
    }
  }
}


import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any = null;
  constructor(public service: AuthService) {}

  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      if (res.email) {
        this.user = res;
      }
    });
  }
  logOut() {
    const model = {};
    this.service.login(model).subscribe({
      next: (res) => {
        this.user = null;
        this.service.user.next(res);
      },
    });
  }
}

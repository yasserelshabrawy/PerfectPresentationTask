import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private service: AuthService) {}
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.service.getDataUser().subscribe((res) => {
      this.service.user.next(res);
    });
  }
}

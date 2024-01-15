import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lang: any;
  constructor(
    private service: UserService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    if ('language' in localStorage) {
      this.lang = localStorage.getItem('language');
      translate.use(this.lang);
    } else {
      translate.use(translate.defaultLang);
    }
  }
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.service.getDataUser().subscribe((res) => {
      this.authService.user.next(res);
    });
  }
}

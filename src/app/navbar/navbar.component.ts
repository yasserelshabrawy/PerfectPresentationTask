import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any = null;
  lang: any;
  constructor(
    public service: AuthService,
    private translate: TranslateService
  ) {
    this.lang = translate.currentLang;
  }

  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      if (res.email) {
        this.user = res;
        console.log(this.user.username);
        console.log(this.user);
      }
    });
  }
  changeLang() {
    if (this.lang == 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
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

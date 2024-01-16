import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private translate: TranslateService,
    private router:Router,
    private toaster: ToastrService
  ) {
    this.lang = translate.currentLang;
  }

  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      if (res.email) {
        this.user = res;
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
    this.router.navigate(['login'])
    this.toaster.success(this.translate.instant('toaster.logout'))
    return localStorage.removeItem('token')
  }
}

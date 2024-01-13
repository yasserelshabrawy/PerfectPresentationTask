import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.user.pipe(
      map((user: any) => {
        if (user.email) {
          return true;
        } else {
          return this.router.navigate(['auth/login']);
        }
      })
    );
  }
}

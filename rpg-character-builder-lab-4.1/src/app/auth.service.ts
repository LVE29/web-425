import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieService = inject(CookieService);
  private readonly sessionCookie = 'session_user';

  isAuthenticated(): boolean {
    return Boolean(this.cookieService.get(this.sessionCookie));
  }

  signin(username: string): void {
    this.cookieService.set(this.sessionCookie, username, 1);
  }

  signout(): void {
    this.cookieService.delete(this.sessionCookie);
  }
}

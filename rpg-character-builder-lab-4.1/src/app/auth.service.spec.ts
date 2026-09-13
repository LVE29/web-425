import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let sessionUser: string;

  beforeEach(() => {
    sessionUser = '';

    cookieServiceSpy = jasmine.createSpyObj<CookieService>('CookieService', [
      'get',
      'set',
      'delete',
    ]);

    cookieServiceSpy.get.and.callFake((name: string) => {
      return name === 'session_user' ? sessionUser : '';
    });

    cookieServiceSpy.set.and.callFake((name: string, value: string) => {
      if (name === 'session_user') {
        sessionUser = value;
      }
    });

    cookieServiceSpy.delete.and.callFake((name: string) => {
      if (name === 'session_user') {
        sessionUser = '';
      }
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: CookieService,
          useValue: cookieServiceSpy,
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should begin unauthenticated when no session cookie exists', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should authenticate and store the username after sign in', () => {
    service.signin('Aria');

    expect(cookieServiceSpy.set).toHaveBeenCalled();
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should clear authentication after sign out', () => {
    service.signin('Aria');
    service.signout();

    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('session_user');
    expect(service.isAuthenticated()).toBeFalse();
  });
});

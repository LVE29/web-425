import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  function runGuard(requestedUrl: string) {
    return TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url: requestedUrl } as RouterStateSnapshot),
    );
  }

  it('should allow an authenticated user to open the protected route', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    expect(runGuard('/builder')).toBeTrue();
  });

  it('should return a sign-in UrlTree for an unauthenticated user', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    expect(runGuard('/builder')).toBeInstanceOf(UrlTree);
  });

  it('should preserve the requested URL for navigation after sign in', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = runGuard('/builder') as UrlTree;

    expect(router.serializeUrl(result)).toBe('/signin?returnUrl=%2Fbuilder');
  });
});

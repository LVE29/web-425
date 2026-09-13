import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let returnUrl: string | null;

  beforeEach(async () => {
    returnUrl = null;

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['signin']);

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    routerSpy.navigate.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => returnUrl,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should begin with an invalid form', () => {
    expect(component.signinForm.invalid).toBeTrue();
  });

  it('should reject a short username and invalid access code', () => {
    component.signinForm.setValue({
      username: 'Al',
      accessCode: '12-456',
    });

    expect(component.signinForm.invalid).toBeTrue();
  });

  it('should accept a valid username and six-character access code', () => {
    component.signinForm.setValue({
      username: 'Aria',
      accessCode: 'A1B2C3',
    });

    expect(component.signinForm.valid).toBeTrue();
  });

  it('should sign in and navigate to the builder by default', () => {
    component.signinForm.setValue({
      username: 'Aria',
      accessCode: 'A1B2C3',
    });

    component.signin();

    expect(authServiceSpy.signin).toHaveBeenCalledOnceWith('Aria');
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/builder']);
  });

  it('should navigate to the preserved return URL after sign in', () => {
    returnUrl = '/classes';

    component.signinForm.setValue({
      username: 'Aria',
      accessCode: 'A1B2C3',
    });

    component.signin();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/classes']);
  });
});

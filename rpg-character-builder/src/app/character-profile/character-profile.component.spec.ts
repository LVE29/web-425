import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  let component: CharacterProfileComponent;
  let fixture: ComponentFixture<CharacterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterProfileComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should begin with an invalid form', () => {
    expect(component.profileForm.invalid).toBeTrue();
    expect(component.profiles.length).toBe(0);
  });

  it('should become valid after all required input is provided', () => {
    component.profileForm.setValue({
      backstory: 'Raised beneath the oldest tree in the forest.',
      alignment: 'adventurous',
      skills: [true, false, false, false],
      homeland: 'whispering-woods',
    });

    expect(component.profileForm.valid).toBeTrue();
  });

  it('should transform selected skill booleans into skill labels', () => {
    component.profileForm.setValue({
      backstory: 'A keeper of forgotten forest paths.',
      alignment: 'mischievous',
      skills: [true, false, true, false],
      homeland: 'silver-fields',
    });

    component.saveProfile();

    expect(component.profiles[0].skills).toEqual(['Healing Magic', 'Animal Communication']);

    expect(component.profiles[0].skills).not.toContain('true');
  });

  it('should render a stored character profile', () => {
    component.profileForm.setValue({
      backstory: 'A quiet traveler guided by fireflies.',
      alignment: 'kindhearted',
      skills: [false, true, false, true],
      homeland: 'misty-hollow',
    });

    component.saveProfile();
    fixture.detectChanges();

    const profileList = fixture.nativeElement.querySelector(
      '[data-testid="profile-list"]',
    ) as HTMLElement;

    expect(profileList.textContent).toContain('Misty Hollow');

    expect(profileList.textContent).toContain('Kindhearted');

    expect(profileList.textContent).toContain('Potion Making, Forest Tracking');

    expect(profileList.textContent).toContain('A quiet traveler guided by fireflies.');
  });
});

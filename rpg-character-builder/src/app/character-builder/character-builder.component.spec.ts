import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update the model through two-way binding', () => {
    const nameInput = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]',
    ) as HTMLInputElement;

    nameInput.value = 'Aria';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('Aria');
  });

  it('should not store a character when the form is invalid', () => {
    const form = fixture.nativeElement.querySelector(
      '[data-testid="character-form"]',
    ) as HTMLFormElement;

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.characters.length).toBe(0);
  });

  it('should store a valid character with calculated starting hit points', async () => {
    component.name = 'Aria';
    component.characterClass = 'Dream Pixie';
    component.level = 3;
    component.veteran = true;
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector(
      '[data-testid="character-form"]',
    ) as HTMLFormElement;

    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.characters.length).toBe(1);
    expect(component.characters[0]).toEqual({
      name: 'Aria',
      characterClass: 'Dream Pixie',
      level: 3,
      veteran: true,
      startingHitPoints: 13,
    });
  });

  it('should reset the form model after a successful submission', async () => {
    component.name = 'Aria';
    component.characterClass = 'Dream Pixie';
    component.level = 3;
    component.veteran = true;
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector(
      '[data-testid="character-form"]',
    ) as HTMLFormElement;

    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.name).toBe('');
    expect(component.characterClass).toBe('');
    expect(component.level).toBe(1);
    expect(component.veteran).toBeFalse();
  });
});

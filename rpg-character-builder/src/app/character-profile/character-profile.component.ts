import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { CharacterProfile, ProfileOption } from '../models/character-profile';

const atLeastOneSelected: ValidatorFn = (
  control: AbstractControl<boolean[]>,
): ValidationErrors | null => {
  const selections = control.value;

  return selections.some(Boolean) ? null : { skillRequired: true };
};

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-profile.component.html',
  styleUrl: './character-profile.component.css',
})
export class CharacterProfileComponent {
  readonly skillOptions: ProfileOption[] = [
    {
      id: 'healing-magic',
      label: 'Healing Magic',
    },
    {
      id: 'potion-making',
      label: 'Potion Making',
    },
    {
      id: 'animal-communication',
      label: 'Animal Communication',
    },
    {
      id: 'forest-tracking',
      label: 'Forest Tracking',
    },
  ];

  readonly alignmentOptions: ProfileOption[] = [
    {
      id: 'kindhearted',
      label: 'Kindhearted',
    },
    {
      id: 'adventurous',
      label: 'Adventurous',
    },
    {
      id: 'mischievous',
      label: 'Mischievous',
    },
  ];

  readonly homelandOptions: ProfileOption[] = [
    {
      id: 'whispering-woods',
      label: 'Whispering Woods',
    },
    {
      id: 'misty-hollow',
      label: 'Misty Hollow',
    },
    {
      id: 'silver-fields',
      label: 'Silver Fields',
    },
  ];

  readonly profileForm = new FormGroup({
    backstory: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    alignment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    skills: new FormArray<FormControl<boolean>>(
      this.skillOptions.map(
        () =>
          new FormControl(false, {
            nonNullable: true,
          }),
      ),
      {
        validators: [atLeastOneSelected],
      },
    ),

    homeland: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly profiles: CharacterProfile[] = [];

  get skillControls(): FormControl<boolean>[] {
    return this.profileForm.controls.skills.controls;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const rawProfile = this.profileForm.getRawValue();

    const selectedSkills = this.skillOptions
      .filter((_, index) => rawProfile.skills[index])
      .map((skill) => skill.label);

    this.profiles.push({
      backstory: rawProfile.backstory.trim(),

      alignment: this.optionLabel(this.alignmentOptions, rawProfile.alignment),

      skills: selectedSkills,

      homeland: this.optionLabel(this.homelandOptions, rawProfile.homeland),
    });

    this.profileForm.reset({
      backstory: '',
      alignment: '',
      skills: this.skillOptions.map(() => false),
      homeland: '',
    });
  }

  private optionLabel(options: ProfileOption[], id: string): string {
    return options.find((option) => option.id === id)?.label ?? id;
  }
}

import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Character } from '../models/character';

@Component({
  selector: 'app-character-builder',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-builder.component.html',
  styleUrl: './character-builder.component.css',
})
export class CharacterBuilderComponent {
  name = '';
  characterClass = '';
  level = 1;
  veteran = false;

  characterClasses: string[] = ['Dream Pixie', 'Mushroom Witch', 'Scarlet Sorceress'];

  characters: Character[] = [];

  createCharacter(form: NgForm): void {
    if (form.invalid || !Number.isInteger(this.level) || this.level < 1 || this.level > 20) {
      return;
    }

    const character: Character = {
      name: this.name,
      characterClass: this.characterClass,
      level: this.level,
      veteran: this.veteran,
      startingHitPoints: 10 + this.level,
    };

    this.characters.push(character);

    form.resetForm({
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
    });
  }
}

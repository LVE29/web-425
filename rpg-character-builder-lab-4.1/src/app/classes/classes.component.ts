import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'app-classes',
  imports: [RouterLink],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  characterClasses: CharacterClass[] = [
    {
      id: 'dream-pixie',
      name: 'Dream Pixie',
      description:
        'Slips into dreams, creates powerful illusions, and turns hidden fears into either healing or a weapon against enemies.',
    },
    {
      id: 'mushroom-witch',
      name: 'Mushroom Witch',
      description:
        'Brews spells from enchanted mushrooms, commands twisting vines, and awakens the forest to defend against enemies.',
    },
    {
      id: 'scarlet-sorceress',
      name: 'Scarlet Sorceress',
      description:
        'Summons crimson flames, transforms enemy magic against them, and tears open portals between worlds.',
    },
  ];
}

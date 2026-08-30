import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  imports: [],
  templateUrl: './ability-roller.component.html',
  styleUrl: './ability-roller.component.css',
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  sides = 6;
  result: number | null = null;

  constructor() {
    const routeValue = this.route.snapshot.paramMap.get('sides');
    const routedSides = Number(routeValue);

    if (!Number.isInteger(routedSides) || routedSides < 2) {
      console.warn('Invalid dice route value. Defaulting to 6 sides.');
      return;
    }

    this.sides = routedSides;
  }

  rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}

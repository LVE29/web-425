import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  let component: AbilityRollerComponent;
  let fixture: ComponentFixture<AbilityRollerComponent>;

  async function configureTest(routeValue: string): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                sides: routeValue,
              }),
            },
          },
        },
      ],
    }).compileComponents();
  }

  it('should create', async () => {
    await configureTest('6');

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should call DiceService.roll with the routed number of sides', async () => {
    await configureTest('20');

    const diceService = TestBed.inject(DiceService);
    const rollSpy = spyOn(diceService, 'roll').and.returnValue(14);

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
    component.rollAbility();

    expect(rollSpy).toHaveBeenCalledOnceWith(20);
  });

  it('should use 6 and warn once when the route value is invalid', async () => {
    await configureTest('invalid');

    const warningSpy = spyOn(console, 'warn');
    const diceService = TestBed.inject(DiceService);
    const rollSpy = spyOn(diceService, 'roll').and.returnValue(4);

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
    component.rollAbility();

    expect(rollSpy).toHaveBeenCalledOnceWith(6);
    expect(warningSpy).toHaveBeenCalledTimes(1);
  });
});

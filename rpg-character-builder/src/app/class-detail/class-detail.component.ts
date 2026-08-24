import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface CharacterAbility {
  name: string;
  description: string;
  image?: string;
}

interface CharacterProfile {
  id: string;
  name: string;
  image: string;
  gemstone: string;
  abilities: CharacterAbility[];
  strength: string;
  weakness: string;
  strengthImage?: string;
  weaknessImage?: string;
}

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css',
})
export class ClassDetailComponent {
  classId: string;

  characterProfiles: Record<string, CharacterProfile> = {
    'dream-pixie': {
      id: 'dream-pixie',
      name: 'Dream Pixie',
      image: '/assets/dream-pixie.png',
      gemstone: '/assets/rose-quartz-gem.png',

      abilities: [
        {
          name: 'Dreamwalking',
          description:
            'Slips into dreams to uncover hidden thoughts and forgotten memories.',
          image: '/assets/dreamwalking.png',
        },
        {
          name: 'Illusion Weaving',
          description:
            'Creates convincing visions that confuse enemies and conceal allies.',
          image: '/assets/illusion-weaving.png',
        },
        {
          name: 'Fear Turning',
          description:
            'Helps allies overcome their fears or turns those fears against enemies.',
          image: '/assets/fear-turning.png',
        },
      ],

      strength: 'Imagination and emotional insight.',
      weakness: 'Strong-willed enemies can resist her illusions.',

      strengthImage: '/assets/dream-pixie-strength.png',
      weaknessImage: '/assets/dream-pixie-weakness.png',
    },

    'mushroom-witch': {
      id: 'mushroom-witch',
      name: 'Mushroom Witch',
      image: '/assets/mushroom-witch.png',
      gemstone: '/assets/emerald-gem.png',

      abilities: [
        {
          name: 'Spore Magic',
          description:
            'Releases enchanted spores that weaken enemies and protect allies.',
          image: '/assets/spore-magic.png',
        },
        {
          name: 'Vine Control',
          description:
            'Commands twisting vines to trap intruders or shield the forest.',
          image: '/assets/vine-control.png',
        },
        {
          name: 'Forest Awakening',
          description:
            'Calls upon plants and mushrooms to rise against approaching threats.',
          image: '/assets/forest-awakening.png',
        },
      ],

      strength: 'A powerful connection with plants and nature.',
      weakness: 'Her magic weakens when she is far from the forest.',

      strengthImage: '/assets/mushroom-witch-strength.png',
      weaknessImage: '/assets/mushroom-witch-weakness.png',
    },

    'scarlet-sorceress': {
      id: 'scarlet-sorceress',
      name: 'Scarlet Sorceress',
      image: '/assets/scarlet-sorceress.png',
      gemstone: '/assets/ruby-gem.png',

      abilities: [
        {
          name: 'Crimson Flames',
          description:
            'Summons scarlet fire that grows stronger with her determination.',
          image: '/assets/crimson-flames.png',
        },
        {
          name: 'Spell Reversal',
          description:
            'Redirects enemy magic and transforms it into a weapon of her own.',
          image: '/assets/spell-reversal.png',
        },
        {
          name: 'Portal Casting',
          description:
            'Tears open glowing passages between distant places and worlds.',
          image: '/assets/portal-casting.png',
        },
      ],

      strength: 'Command of powerful offensive and defensive magic.',
      weakness: 'Opening portals quickly drains her magical energy.',

      strengthImage: '/assets/scarlet-sorceress-strength.png',
      weaknessImage: '/assets/scarlet-sorceress-weakness.png',
    },
  };

  character: CharacterProfile | undefined;

  constructor(private route: ActivatedRoute) {
    this.classId = this.route.snapshot.paramMap.get('id') ?? '';
    this.character = this.characterProfiles[this.classId];
  }
}

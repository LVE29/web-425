import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  title: string;

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'];
  }
}

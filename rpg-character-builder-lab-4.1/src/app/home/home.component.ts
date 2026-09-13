import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home-page" data-testid="home-page">
      <div class="firefly firefly-one" aria-hidden="true"></div>
      <div class="firefly firefly-two" aria-hidden="true"></div>
      <div class="firefly firefly-three" aria-hidden="true"></div>
      <div class="firefly firefly-four" aria-hidden="true"></div>
      <div class="firefly firefly-five" aria-hidden="true"></div>

      <div class="page-layout">
        <div class="hero-content home-frame">
          <span class="home-frame-ornament home-frame-top">✦</span>

          <h1>{{ pageTitle }}</h1>

          <h2>Create a Unique Character for Your Next Adventure</h2>

          <a class="begin-button" routerLink="/classes">
            <span class="begin-button-gem"></span>
            <span class="begin-button-text">Begin Building</span>
          </a>

          <span class="home-frame-ornament home-frame-bottom">✦</span>
        </div>

        <div class="features home-frame" id="character-features">
          <span class="home-frame-ornament home-frame-top">✦</span>

          <h3>Build Your Character</h3>

          <ul data-testid="character-features">
            <li>Choose a character class</li>
            <li>Select magical abilities</li>
            <li>Create a character backstory</li>
            <li>Choose weapons and equipment</li>
            <li>Customize appearance</li>
            <li>Select strengths and weaknesses</li>
          </ul>

          <h4>Follow the Fireflies</h4>

          <span class="home-frame-ornament home-frame-bottom">✦</span>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  pageTitle = 'Firefly Forest Character Builder';
}

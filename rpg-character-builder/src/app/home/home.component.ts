import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section class="home-page" data-testid="home-page">
      <div class="firefly firefly-one" aria-hidden="true"></div>
      <div class="firefly firefly-two" aria-hidden="true"></div>
      <div class="firefly firefly-three" aria-hidden="true"></div>
      <div class="firefly firefly-four" aria-hidden="true"></div>
      <div class="firefly firefly-five" aria-hidden="true"></div>

      <div class="page-layout">
        <div class="hero-content">
          <h1>{{ pageTitle }}</h1>

          <h2>Create a Unique Character for Your Next Adventure</h2>

          <a class="begin-button" href="#character-features">
            Begin Building
          </a>
        </div>

        <div class="features" id="character-features">
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
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  pageTitle = 'Firefly Forest Character Builder';
}

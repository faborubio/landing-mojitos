import { Component } from '@angular/core';
import { Hero } from './features/hero/hero';
import { SectionCocktails } from './features/section-cocktails/section-cocktails';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Hero, SectionCocktails],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

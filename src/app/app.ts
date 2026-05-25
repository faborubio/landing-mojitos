import { Component } from '@angular/core';
import { Hero } from './features/hero/hero';
import { SectionCocktails } from './features/section-cocktails/section-cocktails';
import { SectionAbout } from './features/section-about/section-about';
import { SectionArt } from './features/section-art/section-art';
import { SectionMenu } from './features/section-menu/section-menu';
import { NavBar } from './shared/components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBar, Hero, SectionCocktails, SectionAbout, SectionArt, SectionMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

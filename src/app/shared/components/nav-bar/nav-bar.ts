import { Component, signal } from '@angular/core';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'vp-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  protected readonly links = signal<NavLink[]>([
    { label: 'Cócteles', href: '#cocteles' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'El Arte', href: '#arte' },
    { label: 'Contacto', href: '#contacto' },
  ]);

  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

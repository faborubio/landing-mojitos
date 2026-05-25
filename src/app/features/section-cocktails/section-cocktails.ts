import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';

interface DrinkItem {
  name: string;
  origin: string;
  format: string;
  price: string;
}

@Component({
  selector: 'vp-section-cocktails',
  standalone: true,
  imports: [],
  templateUrl: './section-cocktails.html',
  styleUrl: './section-cocktails.scss',
})
export class SectionCocktails implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationService);

  @ViewChild('sectionRoot', { static: true }) sectionRoot!: ElementRef<HTMLElement>;

  protected readonly cocktails = signal<DrinkItem[]>([
    { name: 'Shiraz de Chapel Hill', origin: 'AU', format: 'Botella', price: '$10.000' },
    { name: 'Malbec Catena', origin: 'AR', format: 'Botella', price: '$49.000' },
    { name: 'Cerveza Pale Ale Rhino', origin: 'CA', format: '750 ml', price: '$20.000' },
    { name: 'Guinness Irlandesa', origin: 'IE', format: '600 ml', price: '$29.000' },
  ]);

  protected readonly mocktails = signal<DrinkItem[]>([
    { name: 'Brisa Tropical', origin: 'US', format: 'Botella', price: '$10.000' },
    { name: 'Maracuyá Mentolada', origin: 'US', format: 'Botella', price: '$49.000' },
    { name: 'Aurora Cítrica', origin: 'CA', format: '750 ml', price: '$20.000' },
    { name: 'Lavanda Burbujeante', origin: 'IE', format: '600 ml', price: '$29.000' },
  ]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const gsap = this.animations.gsap;
    const ScrollTrigger = this.animations.ScrollTrigger;
    const root = this.sectionRoot.nativeElement;

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      },
    })
      .from(root.querySelector('[data-anim="c-leaf-left"]'), { x: -100, y: 100 })
      .from(root.querySelector('[data-anim="c-leaf-right"]'), { x: 100, y: 100 });

    gsap.from(root.querySelectorAll('[data-anim="column"]'), {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(root.querySelectorAll('[data-anim="drink"]'), {
      opacity: 0,
      x: (index) => (index < 4 ? -30 : 30),
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();
  }
}

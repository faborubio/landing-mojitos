import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';

interface Cocktail {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'vp-section-menu',
  standalone: true,
  imports: [],
  templateUrl: './section-menu.html',
  styleUrl: './section-menu.scss',
})
export class SectionMenu implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationService);

  @ViewChild('sectionRoot', { static: true }) sectionRoot!: ElementRef<HTMLElement>;

  protected readonly cocktails = signal<Cocktail[]>([
    {
      id: 1,
      name: 'Mojito Clásico',
      image: '/images/drink1.png',
      title: 'Ingredientes simples, sabor audaz',
      description:
        'Preparado con ron blanco, jugo de lima y hojas de menta recién mordidas, el mojito es fácil de servir y lleno de carácter. Añade un toque de azúcar y soda para refrescar cualquier noche de verano.',
    },
    {
      id: 2,
      name: 'Mojito de Frambuesa',
      image: '/images/drink2.png',
      title: 'Un clásico vibrante que nunca falla',
      description:
        'Equilibra la acidez de la lima con la dulzura de la frambuesa y la suavidad del ron. Agitado, frappé o en las rocas — siempre crujiente y refrescante.',
    },
    {
      id: 3,
      name: 'Brisa de Violeta',
      image: '/images/drink3.png',
      title: 'Aroma floral en cada sorbo',
      description:
        'Una mezcla delicada de gin, jarabe de violeta y limón. Sutil, elegante y perfecto para los paladares que buscan algo distinto a lo tradicional.',
    },
    {
      id: 4,
      name: 'Mojito Curaçao',
      image: '/images/drink4.png',
      title: 'Hecho con cuidado, servido con amor',
      description:
        'Cada cóctel se prepara con ingredientes frescos y la pasión de perfeccionar cada vertido, ya sea para celebrar o para relajarte.',
    },
  ]);

  protected readonly currentIndex = signal(0);

  protected readonly current = computed(() => this.cocktails()[this.currentIndex()]);
  protected readonly prev = computed(() => {
    const list = this.cocktails();
    const len = list.length;
    return list[(this.currentIndex() - 1 + len) % len];
  });
  protected readonly next = computed(() => {
    const list = this.cocktails();
    const len = list.length;
    return list[(this.currentIndex() + 1) % len];
  });

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      effect(() => {
        // Re-run el current para triggear la animación de entrada
        const _ = this.current();
        queueMicrotask(() => this.runSlideAnimation());
      });
    }
  }

  goToSlide(index: number): void {
    const len = this.cocktails().length;
    this.currentIndex.set(((index % len) + len) % len);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.runSlideAnimation();
  }

  private runSlideAnimation(): void {
    const gsap = this.animations.gsap;
    const root = this.sectionRoot.nativeElement;

    gsap.fromTo(
      root.querySelector('[data-anim="cocktail-img"]'),
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' },
    );

    gsap.fromTo(
      root.querySelector('[data-anim="recipe-title"]'),
      { opacity: 0 },
      { opacity: 1, duration: 1 },
    );

    gsap.fromTo(
      root.querySelectorAll('[data-anim="details-text"]'),
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: 'power1.inOut', duration: 0.9, stagger: 0.1 },
    );
  }
}

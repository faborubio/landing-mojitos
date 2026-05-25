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

@Component({
  selector: 'vp-section-art',
  standalone: true,
  imports: [],
  templateUrl: './section-art.html',
  styleUrl: './section-art.scss',
})
export class SectionArt implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationService);

  @ViewChild('sectionRoot', { static: true }) sectionRoot!: ElementRef<HTMLElement>;

  protected readonly goodList = signal<string[]>([
    'Ingredientes seleccionados a mano',
    'Técnicas exclusivas',
    'Artesanía coctelera en acción',
    'Sabores recién mezclados',
  ]);

  protected readonly featureList = signal<string[]>([
    'Mezclas perfectamente equilibradas',
    'Decoración impecable',
    'Siempre helado al servir',
    'Agitado por expertos',
  ]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const gsap = this.animations.gsap;
    const ScrollTrigger = this.animations.ScrollTrigger;
    const root = this.sectionRoot.nativeElement;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      gsap.from(root.querySelectorAll('[data-anim="will-fade"]'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });

      gsap.from(root.querySelector('[data-anim="masked-img"]'), {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });

      ScrollTrigger.refresh();
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5,
        pin: true,
      },
    })
      .to(root.querySelectorAll('[data-anim="will-fade"]'), {
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
      })
      .to(root.querySelector('[data-anim="masked-img"]'), {
        scale: 1.3,
        maskSize: '400%',
        webkitMaskSize: '400%',
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(root.querySelectorAll('[data-anim="side-drink"]'), {
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power1.inOut',
      }, '<')
      .to(root.querySelector('[data-anim="masked-content"]'), {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      });

    ScrollTrigger.refresh();
  }
}

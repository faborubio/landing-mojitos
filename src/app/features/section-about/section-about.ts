import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'vp-section-about',
  standalone: true,
  imports: [],
  templateUrl: './section-about.html',
  styleUrl: './section-about.scss',
})
export class SectionAbout implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationService);

  @ViewChild('sectionRoot', { static: true }) sectionRoot!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const gsap = this.animations.gsap;
    const ScrollTrigger = this.animations.ScrollTrigger;
    const root = this.sectionRoot.nativeElement;

    const titleWords = root.querySelectorAll('[data-anim="title-word"]');

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    })
      .from(titleWords, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.04,
      })
      .from(
        root.querySelectorAll('[data-anim="grid-item"]'),
        {
          opacity: 0,
          duration: 0.9,
          ease: 'power1.inOut',
          stagger: 0.06,
        },
        '-=0.6',
      );

    ScrollTrigger.refresh();
  }
}

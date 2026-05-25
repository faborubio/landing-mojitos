import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'vp-hero',
  standalone: true,
  imports: [NavBar],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationService);

  @ViewChild('heroRoot', { static: true }) heroRoot!: ElementRef<HTMLElement>;
  @ViewChild('heroVideo', { static: true }) heroVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.runIntroTimeline();
    this.setupVideoBehavior();
  }

  private runIntroTimeline(): void {
    const gsap = this.animations.gsap;
    const root = this.heroRoot.nativeElement;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(root.querySelectorAll('[data-anim="leaf"]'), {
      opacity: 0,
      scale: 0.7,
      rotate: -20,
      stagger: 0.15,
      duration: 1.1,
    })
      .from(
        root.querySelector('[data-anim="title"]'),
        { y: 80, opacity: 0, duration: 1.2 },
        '-=0.6',
      )
      .from(
        root.querySelectorAll('[data-anim="text-block"]'),
        { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 },
        '-=0.6',
      )
      .from(
        root.querySelector('[data-anim="scroll-cue"]'),
        { opacity: 0, duration: 0.6 },
        '-=0.2',
      );
  }

  private setupVideoBehavior(): void {
    const video = this.heroVideo.nativeElement;

    const start = () => {
      video.pause();
      video.currentTime = 0;
      this.bindAllScrolls(video);
    };

    if (video.readyState >= 1 && !Number.isNaN(video.duration)) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }
  }

  private bindAllScrolls(video: HTMLVideoElement): void {
    const gsap = this.animations.gsap;
    const ScrollTrigger = this.animations.ScrollTrigger;
    const hero = this.heroRoot.nativeElement;

    gsap.to(video, {
      currentTime: video.duration,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    gsap.to(hero.querySelector('[data-anim="hero-bottom"]'), {
      opacity: 0,
      y: -30,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom 40%',
        scrub: 0.5,
      },
    });

    gsap.to(video, {
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#cocteles',
        start: 'bottom 60%',
        end: 'bottom 10%',
        scrub: 0.5,
      },
    });

    ScrollTrigger.refresh();
  }
}

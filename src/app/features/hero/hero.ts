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
  selector: 'vp-hero',
  standalone: true,
  imports: [],
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
    this.runHeroParallax();
    this.setupVideoBehavior();
  }

  private runIntroTimeline(): void {
    const gsap = this.animations.gsap;
    const root = this.heroRoot.nativeElement;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(
      root.querySelector('[data-anim="title"]'),
      { yPercent: 100, opacity: 0, duration: 1.8 },
    ).from(
      root.querySelectorAll('[data-anim="text-block"]'),
      { yPercent: 100, opacity: 0, stagger: 0.1, duration: 1.4 },
      '-=1.2',
    );
  }

  private runHeroParallax(): void {
    const gsap = this.animations.gsap;
    const root = this.heroRoot.nativeElement;

    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
      .to(root.querySelector('[data-anim="leaf-right"]'), { y: 200 }, 0)
      .to(root.querySelector('[data-anim="leaf-left"]'), { y: -200 }, 0);
  }

  private setupVideoBehavior(): void {
    const video = this.heroVideo.nativeElement;

    const start = () => {
      video.pause();
      video.currentTime = 0;
      this.bindVideoScrub(video);
    };

    if (video.readyState >= 1 && !Number.isNaN(video.duration)) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
    }
  }

  private bindVideoScrub(video: HTMLVideoElement): void {
    const gsap = this.animations.gsap;
    const ScrollTrigger = this.animations.ScrollTrigger;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    }).to(video, {
      currentTime: video.duration,
      ease: 'none',
    });

    ScrollTrigger.refresh();
  }
}

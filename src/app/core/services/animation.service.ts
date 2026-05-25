import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private registered = false;

  constructor() {
    if (isPlatformBrowser(this.platformId) && !this.registered) {
      gsap.registerPlugin(ScrollTrigger);
      this.registered = true;
    }
  }

  get gsap() {
    return gsap;
  }

  get ScrollTrigger() {
    return ScrollTrigger;
  }
}

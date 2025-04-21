// src/app/site/components/rmd/rmd.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-rmd',
  templateUrl: './rmd.component.html',
  styleUrls: ['./rmd.component.scss']
})
export class RMDComponent implements OnInit, AfterViewInit {
  /** replace with real data later */
  clientCount = 1234;
  projectCount = 567;

  @ViewChild('clientEl', { static: true }) clientEl!: ElementRef<HTMLElement>;
  @ViewChild('projectEl', { static: true }) projectEl!: ElementRef<HTMLElement>;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // 1) Fade‑up scroll animations
    const cards = this.el.nativeElement.querySelectorAll('.fade-up-card');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-up-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((c: Element) => observer.observe(c));

    // 2) Counter animations
    this.animateCounterEl(this.clientEl, this.clientCount, 2000);
    this.animateCounterEl(this.projectEl, this.projectCount, 2000);
  }

  /**
   * Smoothly counts from 0 up to `end` over `duration` ms,
   * writing into elRef.nativeElement.innerText
   */
  private animateCounterEl(
    elRef: ElementRef<HTMLElement>,
    end: number,
    duration: number
  ) {
    const el = elRef.nativeElement;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.innerText = Math.floor(progress * end).toString();

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.innerText = end.toString();
      }
    };

    requestAnimationFrame(frame);
  }

  scrollToSection(id: string) {
    const anchor = document.getElementById(id);
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

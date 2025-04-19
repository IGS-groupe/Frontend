// rmd.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rmd',
  templateUrl: './rmd.component.html',
  styleUrls: ['./rmd.component.scss']
})
export class RMDComponent implements OnInit, AfterViewInit {
  /** replace with real data later */
  clientCount = 1234;
  projectCount = 567;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const cards = this.el.nativeElement.querySelectorAll('.fade-up-card');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-up-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c: Element) => observer.observe(c));
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

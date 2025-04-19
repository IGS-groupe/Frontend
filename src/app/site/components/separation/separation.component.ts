import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-separation',
  templateUrl: './separation.component.html',
  styleUrls: ['./separation.component.scss']
})
export class SeparationComponent implements OnInit, AfterViewInit {
  showNavigationIndicators = true;
  showNavigationArrows    = true;

  constructor(
    private elRef:   ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const cards = this.elRef.nativeElement.querySelectorAll('.fade-up-card');
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

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

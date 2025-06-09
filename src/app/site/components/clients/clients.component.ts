import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements AfterViewInit {
  clientCount = 1234;

  @ViewChild('clientCounterEl', { static: true }) clientCounterEl!: ElementRef<HTMLElement>;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Fade-up animations
    const elements = this.el.nativeElement.querySelectorAll('.fade-up-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-up-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => observer.observe(el));

    // Counter animation
    this.animateCounter(this.clientCounterEl, this.clientCount, 2000);
  }

  private animateCounter(elRef: ElementRef<HTMLElement>, end: number, duration: number) {
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
}

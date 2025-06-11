import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projectCount: number = 0;

  @ViewChild('projectCounterEl', { static: true }) projectCounterEl!: ElementRef<HTMLElement>;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.getCompleteResultDemandesCount().subscribe({
      next: (data) => {
        this.projectCount = data.completeResultsCount;
        // If DOM already loaded, animate it
        if (this.projectCounterEl) {
          this.animateCounter(this.projectCounterEl, this.projectCount, 2000);
        }
      },
      error: (err) => {
        console.error('Failed to load complete result demandes count:', err);
      }
    });
  }

  ngAfterViewInit(): void {
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

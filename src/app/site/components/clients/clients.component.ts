import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {
  clientCount: number = 0;
  clients: any[] = []; // Store real client users from backend

  @ViewChild('clientCounterEl', { static: true }) clientCounterEl!: ElementRef<HTMLElement>;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Get count for counter
    this.authService.getUserCount().subscribe({
      next: (data) => {
        this.clientCount = data.userCount;
        if (this.clientCounterEl) {
          this.animateCounter(this.clientCounterEl, this.clientCount, 2000);
        }
      },
      error: (err) => console.error('Failed to fetch user count:', err)
    });

    // Get real clients (users with role ROLE_USER)
    this.authService.getUsersWithRoleUser().subscribe({
      next: (users) => {
        this.clients = users;
      },
      error: (err) => console.error('Failed to fetch users by role:', err)
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

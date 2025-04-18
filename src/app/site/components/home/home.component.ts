import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showNavigationIndicators = true;
  showNavigationArrows = true;

  constructor() {}

  ngOnInit(): void {
    this.initScrollAnimation();
  }

  // Optional: Scroll animation for fade-up elements
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.initScrollAnimation();
  }

  private initScrollAnimation(): void {
    const elements = document.querySelectorAll('.fade-up-card');
    elements.forEach((el: any) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('fade-up-visible');
      }
    });
  }
}

// news-detail.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, AfterViewInit {
  title   = '';
  date    = '';
  slug    = '';
  content = '';
  image   = '';

  constructor(
    private router:   Router,
    private elRef:    ElementRef,
    private renderer: Renderer2
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.title   = state?.['title']   || 'Titre non défini';
    this.date    = state?.['date']    || new Date().toISOString();
    this.slug    = state?.['slug']    || 'demo-slug-001';
    this.content = state?.['content'] || `Ceci est un contenu fictif pour tester la page de détail de l'actualité.`;
    this.image   = state?.['image']   || 'assets/images/small/news.jpg';
  }

  ngOnInit(): void {
    // any setup before view init
  }

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

    cards.forEach((card: Element) => observer.observe(card));
  }
}

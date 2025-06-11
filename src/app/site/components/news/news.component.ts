import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService, NewsItem } from '../../services/news.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {
  newsItems: NewsItem[] = [];
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  pageSize = 6;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const cards = this.el.nativeElement.querySelectorAll('.fade-up-card');
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, 'fade-up-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      cards.forEach((c: Element) => observer.observe(c));
    }, 0); // ✅ Wrap in setTimeout to wait for rendering
  }


  loadPage(page: number): void {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;

  this.newsService.getNews().subscribe({
    next: (news) => {
      this.totalPages = Math.ceil(news.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      const startIndex = (page - 1) * this.pageSize;
      this.newsItems = news.slice(startIndex, startIndex + this.pageSize);

      // ✅ Wait until Angular has rendered the view
      setTimeout(() => this.runFadeAnimation(), 0);
    },
    error: (error) => {
      this.newsItems = [];
    }
  });
}

runFadeAnimation(): void {
  const cards = this.el.nativeElement.querySelectorAll('.fade-up-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.renderer.addClass(entry.target, 'fade-up-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach((c: Element) => observer.observe(c));
}


  goToPage(page: number): void {
    this.loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToDetail(item: NewsItem): void {
    this.router.navigate(['/igs/news-detail', item.slug]);
  }
}
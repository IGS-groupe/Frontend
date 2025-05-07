import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router'; // ✅ Add this import

interface NewsItem {
  title: string;
  date: string;
  slug: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {
  newsItems: NewsItem[] = [];
  currentPage = 1;
  totalPages = 22;
  pages: number[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router // ✅ Inject router
  ) {}

  ngOnInit(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.loadPage(this.currentPage);
  }

  ngAfterViewInit(): void {
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
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    this.newsItems = Array.from({ length: 6 }, (_, idx) => ({
      title: `Demo News #${(page - 1) * 6 + idx + 1}`,
      date: new Date().toISOString(),
      slug: `demo-news-${(page - 1) * 6 + idx + 1}`
    }));
  }

  goToPage(page: number): void {
    this.loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✅ New method to navigate to detail page
  goToDetail(item: NewsItem): void {
    this.router.navigate(['/igs/news-detail'], {
      state: {
        title: item.title,
        date: item.date
      }
    });
  }
}

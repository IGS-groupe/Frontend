import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';

interface NewsItem {
  title: string;
  date: string;    // ISO string or whatever format your backend returns
  slug: string;    // for linking to detail pages
  // add other fields here (e.g. category, excerpt, imageUrl) as needed
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {
  newsItems: NewsItem[] = [];
  currentPage = 1;
  totalPages = 22;       // set this to the real total from your API
  pages: number[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    // private newsService: NewsService   // uncomment & implement your data service
  ) {}

  ngOnInit(): void {
    // build an array [1,2,3…totalPages]
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // load the first page
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

  /**
   * Load a given page of news.
   * Replace the stub below with your API call.
   */
  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;

    // TODO: replace this stub with a call to your backend,
    // e.g. this.newsService.getNews(page).subscribe(resp => {
    //         this.newsItems = resp.items;
    //         this.totalPages = resp.totalPages;
    //         this.pages = Array.from({length: this.totalPages}, (_, i) => i+1);
    //       });

    // STUB: demo items
    this.newsItems = Array.from({ length: 6 }, (_, idx) => ({
      title: `Demo News #${(page - 1) * 6 + idx + 1}`,
      date: new Date().toISOString(),
      slug: `demo-news-${(page - 1) * 6 + idx + 1}`
    }));
  }

  /**
   * Trigger navigation to a different page.
   * Scrolls back up and reloads data.
   */
  goToPage(page: number): void {
    this.loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

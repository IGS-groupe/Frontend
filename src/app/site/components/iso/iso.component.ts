import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-iso',
  templateUrl: './iso.component.html',
  styleUrls: ['./iso.component.scss']
})
export class IsoComponent implements OnInit, AfterViewInit {

  showNavigationIndicators = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.fade-up-card');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-up-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => observer.observe(el));
  }

  scrollToSection(id: string): void {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  downloadPDF(): void {
    const link = document.createElement('a');
    link.href = 'assets/pdfs/iso.pdf'; // Your PDF path
    link.download = 'ISO-Certification.pdf';
    link.click();
  }
}

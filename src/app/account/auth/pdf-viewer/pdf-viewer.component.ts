import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  // the raw URL for download
  pdfSrc = '/assets/pdfs/pdfeeeeet.pdf';

  // a sanitized URL for embedding
  pdfUrl: SafeResourceUrl;

  // whether the user has confirmed
  confirmed = false;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }

  confirmDownload() {
    // flip the flag to show the PDF and download link
    this.confirmed = true;
  }
}

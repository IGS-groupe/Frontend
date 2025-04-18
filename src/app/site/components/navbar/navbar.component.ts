import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {}

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  /** expose the current language to the template */
  get currentLang(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}

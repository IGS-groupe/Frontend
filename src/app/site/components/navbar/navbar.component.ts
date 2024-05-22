import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private translate: TranslateService) {
    // Optional: set default language
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

}

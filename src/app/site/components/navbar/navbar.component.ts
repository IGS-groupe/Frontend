import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  navigateToDemande(): void {
    this.router.navigate(['/account/Listdemande']);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  get currentLang(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }
}

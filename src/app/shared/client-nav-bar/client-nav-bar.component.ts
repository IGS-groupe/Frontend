import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/account/auth/user.service';

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.scss']
})
export class ClientNavBarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        localStorage.clear();
        this.router.navigate(['/account/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}

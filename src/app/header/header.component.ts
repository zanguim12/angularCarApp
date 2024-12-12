import { Component } from '@angular/core';
import { StorageService } from '../auth/services/storage/storage.service';
import { Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn()
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn()

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn()
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn()
      }
    })
  }

  logout() {
    StorageService.logout()
    this.router.navigateByUrl('/login')
  }
}

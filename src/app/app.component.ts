import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    // RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularCarApp';

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

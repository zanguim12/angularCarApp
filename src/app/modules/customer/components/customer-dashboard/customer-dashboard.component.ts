import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  constructor(private service: CustomerService) {}

  cars: any[] = []
  activeSlide: number = 0;
  currentSlideIndex: number = 0;
  totalSlides: number = 3;
  currentSlide = 0;

  images = [
    { src: '/car1.jpeg', alt: 'Image 1' },
    { src: '/car2.jpeg', alt: 'Image 2' },
    { src: '/car3.jpeg', alt: 'Image 3' }
  ];

  ngOnInit() {
    this.getAllCars()
    
  }

  getAllCars() {
    this.service.getAllCars().subscribe(res => {
      this.cars = res;
    });
  }
   // Navigue vers une diapositive spécifique
   goToSlide(index: number) {
    this.activeSlide = index;
  }

  // Passe à la diapositive suivante
  goToNextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.images.length;
  }

  // Revient à la diapositive précédente
  goToPreviousSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.images.length) % this.images.length;
  }


  // getAllCars() {
  //   this.service.getAllCars().subscribe(res => {
  //     res.forEach((car: any) => {
  //       car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`
  //       this.cars.push(car)
  //     })
  //   })
  // }
}

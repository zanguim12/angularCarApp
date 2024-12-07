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

  ngOnInit() {
    this.getAllCars()
  }

  getAllCars() {
    this.service.getAllCars().subscribe(res => {
      this.cars = res;
    });
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

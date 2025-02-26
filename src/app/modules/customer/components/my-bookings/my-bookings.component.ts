import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    NzSpinModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  constructor(private service: CustomerService) {}

  bookings: any[] = []
  isSpinning = false

  ngOnInit() {
    this.getBookingsByUserId()
  }

  private getBookingsByUserId() {
    this.isSpinning = true

    this.service.getBookingsByUserId().subscribe(
      data => {
        this.bookings = data
        this.isSpinning = false
      },
      error => {
        console.log(error)
        this.isSpinning = false
      }
    )
  }
}

import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  cars: any[] = []

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getAllCars()
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe({
      next: (res) => {
        this.cars = res;
      },
      error: (err) => {
        this.message.error('Failed to load cars');
        console.error('Error fetching cars:', err);
      }
    });
  }


  // getAllCars() {
  //   this.adminService.getAllCars().subscribe(res => {
  //     res.forEach((car: any) => {
  //       car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`
  //       this.cars.push(car)
  //     })
  //   })
  // }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe(res => {
      this.cars = this.cars.filter(car => car.id !== id)

      this.message.success('Car deleted successfully', { nzDuration: 3000 })
    })
  }
}

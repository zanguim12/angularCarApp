import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    //RouterLink,
    CardModule,
    ChartModule,
    CarouselModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  cars: any[] = []
  data: any;

  options: any;


  platformId = inject(PLATFORM_ID);

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.getAllCars();
    this.initChart();
    console.log(this.cars);
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

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        this.cd.markForCheck();
    }
}
responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
];

}

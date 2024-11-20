import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';  // Ensure correct import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss'] // Corrected styleUrls
})
export class BookCarComponent {
  carId!: number;

  car: any;
  validateForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carId = this.activeRoute.snapshot.params['id'];  // Initialize carId here in ngOnInit()

    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    });

    this.getCarById();
  }

  bookACar(data: any) {
    this.isSpinning = true;

    let bookACarDto = {
      fromDate: Date.now(),
      toDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
      userId: StorageService.getUserId(),
      carId: this.carId
    };

    this.service.bookACar(bookACarDto).subscribe(
      res => {
        this.isSpinning = false;
        this.message.success('Car booked successfully');
        this.router.navigateByUrl('/customer/dashboard');
      },

      error => {
        this.isSpinning = false;
        this.message.error('Error occurred while booking the car');
      }
    );
  }

  private getCarById() {
    this.service.getCarById(this.carId).subscribe(res => {
      this.car = res;
      this.car.processedImage = `data:image/jpeg;base64,${res.returnedImage}`;
    });
  }
}

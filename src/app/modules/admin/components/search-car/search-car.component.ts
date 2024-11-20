import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzSpinModule,
  ],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  searchCarForm!: FormGroup
  listOfOption: Array<{ label: string; value: string }> = []
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus']
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car']
  listOfColor = ['Red', 'Blue', 'Brown', 'Green']
  listOfTransmission = ['Manual', 'Automatic']
  isSpinning = false
  cars: any[] = []

  constructor(
    private fb: FormBuilder,
    private service: AdminService
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    })
  }

  searchCar() {
    this.isSpinning = true
    this.service.searchCar(this.searchCarForm.value).subscribe(
      res => {
        this.isSpinning = false

        const carDtoList = res.carDtoList

        carDtoList.forEach((car: any) => {
          car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`
          this.cars.push(car)
        })
      },
      err => {
        this.isSpinning = false
      }
    )
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus', 'ford'];
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car','Tesla'];
  listOfColor = ['Red', 'Blue', 'Brown', 'Green'];
  listOfTransmission = ['Manual', 'Automatic'];
  isSpinning = false;
  cars: any[] = []; // This holds all cars
  results: any[] = []; // This holds the search results

  constructor(
    private fb: FormBuilder,
    private service: AdminService
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }

  searchCar() {
    this.isSpinning = true;
    // Collect the form values as searchDto
    const searchDto = this.searchCarForm.value;

    console.log(this.searchCar);

    this.service.searchCar(searchDto).subscribe(
      (response) => {
        this.isSpinning = false; // Stop spinner
        if (response && Array.isArray(response)) {
          this.results = response.map(item => item); // Assign the response to results
        } else {
          this.results = [];
          console.error('No cars found');
        }
      },
      (error) => {
        this.isSpinning = false; // Stop spinner on error
        console.error('Search error:', error);
      }
    );
  }
}

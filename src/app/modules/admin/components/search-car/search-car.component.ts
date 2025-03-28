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
    
    const searchDto = this.searchCarForm.value;
    console.log("🔎 Données envoyées à l'API:", searchDto);
  
    this.service.searchCar(searchDto).subscribe(
      (response) => {
        this.isSpinning = false;
        console.log("✅ Réponse de l'API:", response);
  
        if (response && Array.isArray(response)) {
          this.results = response; // Stocker les résultats
        } else {
          this.results = [];
          console.error('❌ Aucun résultat trouvé');
        }
      },
      (error) => {
        this.isSpinning = false;
        console.error('❌ Erreur lors de la recherche:', error);
      }
    );
  }
  
}

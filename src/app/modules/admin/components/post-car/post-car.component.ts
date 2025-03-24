import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  defaultImage: string = '';
  
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus'];
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car'];
  listOfColor = ['Red', 'Blue', 'Brown', 'Green'];
  listOfTransmission = ['Manual', 'Automatic'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
      processedImage: [null, Validators.required]  // ✅ Associe l’image au formulaire
    });
  }

  postCar() {
    this.isSpinning = true;

    // Vérifie si une image a été ajoutée (URL ou fichier)
    if (!this.postCarForm.value.processedImage) {
      this.message.error("Veuillez ajouter une image de la voiture.");
      this.isSpinning = false;
      return;
    }

    console.log(this.postCarForm.value);

    this.adminService.postCar(this.postCarForm.value).subscribe(
      res => {
        this.message.success('Car posted successfully', { nzDuration: 3000 });
        this.isSpinning = false;
        this.router.navigateByUrl('/admin/dashboard');
      },
      error => {
        this.message.error('Error posting car', { nzDuration: 3000 });
        console.error(error);
        this.isSpinning = false;
      }
    );
  }

  // 🔹 Quand une URL est entrée
  onImageUrlChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imagePreview = input.value;
    this.postCarForm.patchValue({ processedImage: input.value });
  }

  // 🔹 Quand un fichier est sélectionné
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.previewImage();
    }
  }

  // 🔹 Prévisualisation d’un fichier image
  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.postCarForm.patchValue({ processedImage: this.imagePreview }); // ✅ Ajoute l’image encodée dans le formulaire
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}

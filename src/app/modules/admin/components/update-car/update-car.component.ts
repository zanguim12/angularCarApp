import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzSpinModule,
  ],
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {
  carId: number = 0; // Initialize carId here
  isSpinning: boolean = false;
  imgChanged: boolean = false;
  selectedFile: any = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  selectedBrand: string = '';
    listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus'];
  listOfType = ['Sports Car', 'Diesel', 'Crossover', 'Luxury Car'];
  listOfColor = ['Red', 'Blue', 'Brown', 'Green'];
  listOfTransmission = ['Manual', 'Automatic'];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params['id'];  // Set carId in ngOnInit()
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });

    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;

    this.adminService.getCarById(this.carId).subscribe(res => {
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = `data:image/jpeg;base64,${carDto.returnedImage}`;
      this.updateForm.patchValue(carDto);
    });
  }

  updateCar() {
    this.isSpinning = true;

    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile as Blob);
    }

    formData.append('brand', this.updateForm.value.brand);
    formData.append('name', this.updateForm.value.name);
    formData.append('type', this.updateForm.value.type);
    formData.append('color', this.updateForm.value.color);
    formData.append('year', this.updateForm.value.year);
    formData.append('transmission', this.updateForm.value.transmission);
    formData.append('description', this.updateForm.value.description);
    formData.append('price', this.updateForm.value.price);

    this.adminService.updateCar(this.carId, formData).subscribe(
      res => {
        this.message.success('Car updated successfully', { nzDuration: 3000 });
        this.isSpinning = false;
        this.router.navigateByUrl('/admin/dashboard');
      },
      error => {
        this.message.error('Error updating car', { nzDuration: 3000 });
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

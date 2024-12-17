import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminService } from '../../services/admin.service';

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
     // id: [null],
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
      //processedImage: [null]
    });

    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;

    this.adminService.getCarById(this.carId).subscribe(res => {
      this.isSpinning = false;
      console.log(res);
      const carDto = res;
      this.existingImage = carDto.processedImage;
      this.updateForm.patchValue(carDto);
    });
  }

  updateCar() {
    this.isSpinning = true;

    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      //formData.append('image', this.selectedFile as Blob);
    }
    console.log(this.updateForm.value);
    //this.updateForm.value.id = this.carId;
    //this.updateForm.value.processedImage = this.existingImage;


    console.log(formData.get('brand'));

    this.adminService.updateCar(this.carId, this.updateForm.value).subscribe(
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

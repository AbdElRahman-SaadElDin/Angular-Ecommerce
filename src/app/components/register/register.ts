import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

function confirmPassword(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    const mismatch = password.value !== confirmPassword.value;
    const errors = confirmPassword.errors || {};
    if (mismatch) {
      confirmPassword.setErrors({ ...errors, passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Remove only the passwordMismatch error
      if ('passwordMismatch' in errors) {
        const { passwordMismatch, ...rest } = errors;
        confirmPassword.setErrors(Object.keys(rest).length ? rest : null);
      }
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]+$/),
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\S+$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\*@%$#]).{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        addresses: new FormArray([this.createAddressGroup()]),
      },
      { validators: confirmPassword() }
    );
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  onSubmit() {
    this.submitted = true;
    // Mark all address controls as touched to show errors
    this.addresses.controls.forEach((addressGroup) => {
      addressGroup.get('address')?.markAsTouched();
      addressGroup.get('street')?.markAsTouched();
      addressGroup.get('city')?.markAsTouched();
      addressGroup.get('country')?.markAsTouched();
    });
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    alert('Registration successful!');
    // Reset Form
    this.registerForm.reset();
    // Reset addresses group
    while (this.addresses.length > 1) {
      this.addresses.removeAt(0);
    }
    this.addresses.at(0).reset();
    this.submitted = false;
  }
}

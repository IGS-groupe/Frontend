import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import countryData from 'country-telephone-data';

interface CountryOption {
  iso: string;
  name: string;
  dialCode: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  successmsg = false;
  messageError = '';
  countryCodes: CountryOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // build reactive form
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
    });

    // disable phone input until country code is selected
    this.signupForm.get('phoneNumber')!.disable();
    this.signupForm.get('countryCode')!.valueChanges.subscribe((val) => {
      const phoneCtrl = this.signupForm.get('phoneNumber')!;
      if (val) {
        phoneCtrl.enable();
      } else {
        phoneCtrl.disable();
      }
    });

    // prepare country code list (exclude Israel)
    this.countryCodes = countryData.allCountries
      .map((c: any) => ({
        iso: c.iso2.toUpperCase(),
        name: c.name,
        dialCode: '+' + c.dialCode,
      }))
      .filter((c: CountryOption) => c.iso !== 'IL')
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // shortcut to form controls
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.toastr.error(
        'Veuillez corriger les erreurs du formulaire.',
        'Formulaire invalide',
        {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true,
        }
      );
      return;
    }

    // concatenate countryCode + phoneNumber
    const { countryCode, phoneNumber, ...rest } = this.signupForm.value;
    const fullPhone = countryCode + phoneNumber;
    const payload = { ...rest, phone: fullPhone };

    this.authService.signup(payload).subscribe(
      () => {
        this.toastr.success('Inscription réussie !', 'Succès', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true,
        });
        this.router.navigate(['/account/validation']);
      },
      (err) => {
        this.toastr.error(err.error || 'Une erreur est survenue.', 'Échec', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}

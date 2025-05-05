import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/account/auth/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;

  locations = [/* your locations here */];
  states = [/* your states here */];
  industries = [/* your industries here */];
  enquiryTypes = [/* your enquiry types here */];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      serviceLocation: ['', Validators.required],
      stateProvince: [''],
      serviceIndustry: [''],
      enquiryType: ['', Validators.required],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  ngAfterViewInit(): void {
    const cards = this.el.nativeElement.querySelectorAll('.fade-up-card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'fade-up-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card: Element) => observer.observe(card));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.toastr.error('', 'Veuillez vérifier votre formulaire', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
      return;
    }

    this.authService.createContact(this.contactForm.value).subscribe({
      next: res => {
        this.toastr.success('', 'Votre message envoyé avec succès', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Error saving contact', err);
        this.toastr.error('', 'Une erreur est survenue, réessayez plus tard', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
      }
    });
  }
}

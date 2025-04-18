import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/account/auth/services/auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;

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
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfComplaint: ['', [Validators.required]],
      issueDescription: ['', [Validators.required]],
      contactPerson: ['']
    });
  }

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.fade-up-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-up-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el: Element) => observer.observe(el));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.authService.createContact(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Contact saved', response);
          this.toastr.success("", 'Votre message envoyer avec succès', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            closeButton: true
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error saving contact', error);
        }
      });
    } else {
      this.toastr.error("", 'Veuillez vérifier votre formulaire', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
    }
  }
}

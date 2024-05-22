import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProposComponent } from './components/propos/propos.component';
import { GouvernanceComponent } from './components/gouvernance/gouvernance.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CollaborateursComponent } from './components/collaborateurs/collaborateurs.component';
import { ConsultingComponent } from './components/consulting/consulting.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RMDComponent } from './components/rmd/rmd.component';
import { EnvironmentalComponent } from './components/environmental/environmental.component';
import { EnergyComponent } from './components/energy/energy.component';
import { RdComponent } from './components/rd/rd.component';
import { GoldComponent } from './components/gold/gold.component';
import { TestingComponent } from './components/testing/testing.component';
import { LabComponent } from './components/lab/lab.component';
import { PreparationComponent } from './components/preparation/preparation.component';
import { CommunitionComponent } from './components/communition/communition.component';
import { GravityComponent } from './components/gravity/gravity.component';
import { GoldTestingComponent } from './components/gold-testing/gold-testing.component';
import { FloatationComponent } from './components/floatation/floatation.component';
import { HydrometComponent } from './components/hydromet/hydromet.component';
import { SeparationComponent } from './components/separation/separation.component';
import { MagneticComponent } from './components/magnetic/magnetic.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IsoComponent } from './components/iso/iso.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [NavbarComponent, HomeComponent, FooterComponent, ProposComponent, GouvernanceComponent, CollaborateursComponent, ConsultingComponent, RMDComponent, EnvironmentalComponent, EnergyComponent, RdComponent, GoldComponent, TestingComponent, LabComponent, PreparationComponent, CommunitionComponent, GravityComponent, GoldTestingComponent, FloatationComponent, HydrometComponent, SeparationComponent, MagneticComponent, ProjectsComponent, ClientsComponent, NewsComponent, ContactComponent,IsoComponent],
  imports: [
    CommonModule,
    SiteRoutingModule, 
    CarouselModule,
    NgbCarouselModule,
    NgbDropdownModule, 
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,  
        deps: [HttpClient]
      }
    }),
    
  ]
})
export class SiteModule { }

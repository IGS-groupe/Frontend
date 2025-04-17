import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { EchantillonFormComponent } from './echantillon-form/echantillon-form.component';
import { ParameterListComponent } from './parameter-list/parameter-list.component';
import { ParameterFormComponent } from './paramater-form/paramater-form.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';
import { ResultParameterComponent } from './result-parameter/result-parameter.component';
import { ResultDemandeComponent } from './result-demande/result-demande.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ListEchantillonComponent } from './list-echantillon/list-echantillon.component';
import { UpdateEchanttillonComponent } from './update-echanttillon/update-echanttillon.component';
import { UpdateListParameterComponent } from './update-list-parameter/update-list-parameter.component';
import { ListEchantillonsComponent } from './list-echantillons/list-echantillons.component';
import { ValidationComponent } from './validation/validation.component';
import { ResetPasswordMessageComponent } from './reset-password-message/reset-password-message.component';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    
    {
        path: 'validation',
        component: ValidationComponent
    },
    {
        path: 'restpassword',
        component: RestPasswordComponent
    },
    {
        path: 'restpasswordmessage',
        component: ResetPasswordMessageComponent
    },
    {
        path: 'updatePassword',
        component: UpdatePasswordComponent
    },
    {
        path :'profile',
        component:UpdateProfileComponent
    },
    {
        path: 'demande',
        component:DemandeFormComponent
    },
    {
        path: 'Listdemande',
        component:ListDemandeComponent
    },
    {
        path: 'Listechantillon',
        component: ListEchantillonComponent
    },
    {
        path: 'Listechantillons',
        component: ListEchantillonsComponent
    },
    {
        path: 'echantillon',
        component: EchantillonFormComponent
    },
    {
        path: 'updateechantillon',
        component: UpdateEchanttillonComponent
    },
    {
        path: 'updateparameter',
        component: UpdateListParameterComponent
    },
    {
        path :'paramter',
        component:ParameterFormComponent
    },
    {
        path :'ListParamter',
        component:ParameterListComponent
    },
    {
        path :'ResultParamter',
        component:ResultParameterComponent
    },
    {
        path :'ResultDemande',
        component:ResultDemandeComponent
    },
    {
        path :'pdf',
        component:PdfViewerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

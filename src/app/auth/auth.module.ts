import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    title: 'login',
    component:LoginComponent
  },

];

@NgModule({
  declarations: [LoginComponent, ],
  imports: [CommonModule, MaterialModule, SharedModule, RouterModule.forChild(routes) , ]
})
export class AuthModule {}

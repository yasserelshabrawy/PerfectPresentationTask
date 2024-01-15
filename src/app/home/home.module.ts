import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './home/top-bar/search/search.component';
import { NewUserComponent } from './home/top-bar/new-user/new-user.component';
import { NewUserDialogComponent } from './home/top-bar/new-user/new-user-dialog/new-user-dialog.component';
import { FilterComponent } from './home/top-bar/filter/filter.component';
import { AuthGuard } from '../guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title:'home',
    canActivate: [AuthGuard],
  },
];


@NgModule({
  declarations: [HomeComponent, SearchComponent, NewUserComponent, NewUserDialogComponent, FilterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],

})
export class HomeModule {}

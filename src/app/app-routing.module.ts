import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', title: 'home' },
  {
    path: 'home',
    loadChildren: () => import(`./home/home.module`).then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

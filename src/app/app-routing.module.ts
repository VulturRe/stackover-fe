import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/components/pages/register-page/register-page.component';
import { RestorePageComponent } from 'src/app/components/pages/restore-page/restore-page.component';
import { SearchPageComponent } from 'src/app/components/pages/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'restore', component: RestorePageComponent },
  { path: 'register', component: RegisterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

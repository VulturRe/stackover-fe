import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { RestoreTokenGuard } from 'src/app/_guards/restore-token.guard';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/components/pages/register-page/register-page.component';
import { ResetPageComponent } from 'src/app/components/pages/reset-page/reset-page.component';
import { RestorePageComponent } from 'src/app/components/pages/restore-page/restore-page.component';
import { SearchPageComponent } from 'src/app/components/pages/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'restore', component: RestorePageComponent },
  { path: 'reset', component: ResetPageComponent, canActivate: [RestoreTokenGuard] },
  { path: 'register', component: RegisterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    RestoreTokenGuard
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { UnAuthGuard } from './guards/unauth/unauth.guard';
import { LoginPage } from './pages/account/login/login.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/account/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    canActivate: [UnAuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/account/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [UnAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/exercises/exercises.module').then(
        (m) => m.ExercisesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginPage,
    canActivate: [UnAuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/account/login/login.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/account/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/account/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/exercises/exercises.module').then(
        (m) => m.ExercisesPageModule
      ),
  },
  {
    path: '**',
    component: LoginPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

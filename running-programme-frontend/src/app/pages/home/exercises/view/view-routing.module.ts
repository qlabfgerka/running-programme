import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPage } from './view.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPage,
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('./progress/progress.module').then((m) => m.ProgressPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPageRoutingModule {}

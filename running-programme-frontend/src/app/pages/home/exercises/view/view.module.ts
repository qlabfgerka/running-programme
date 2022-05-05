import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { NumberToMinutesPipeModule } from 'src/app/pipes/number-to-minutes/number-to-minutes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPageRoutingModule,
    NumberToMinutesPipeModule,
  ],
  declarations: [ViewPage],
})
export class ViewPageModule {}

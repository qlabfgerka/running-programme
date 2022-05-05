import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressPageRoutingModule } from './progress-routing.module';

import { ProgressPage } from './progress.page';
import { NumberToMinutesPipeModule } from 'src/app/pipes/number-to-minutes/number-to-minutes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressPageRoutingModule,
    NumberToMinutesPipeModule,
  ],
  declarations: [ProgressPage],
})
export class ProgressPageModule {}

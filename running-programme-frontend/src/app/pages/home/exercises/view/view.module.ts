import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { MinuteSecondsPipe } from 'src/app/pipes/number-to-minutes/number-to-minutes.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ViewPageRoutingModule],
  declarations: [ViewPage, MinuteSecondsPipe],
})
export class ViewPageModule {}

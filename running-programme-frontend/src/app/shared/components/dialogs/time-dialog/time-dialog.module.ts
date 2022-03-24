import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TimeDialogComponent } from './time-dialog.component';

@NgModule({
  declarations: [TimeDialogComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [TimeDialogComponent],
})
export class TimeDialogModule {}

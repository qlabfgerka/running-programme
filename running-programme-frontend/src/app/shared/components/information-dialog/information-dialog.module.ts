import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InformationDialogComponent } from './information-dialog.component';

@NgModule({
  declarations: [InformationDialogComponent],
  imports: [CommonModule, IonicModule],
  exports: [InformationDialogComponent],
})
export class InformationDialogModule {}

import { NgModule } from '@angular/core';
import { MinuteSecondsPipe } from './number-to-minutes.pipe';

@NgModule({
  declarations: [MinuteSecondsPipe],
  imports: [],
  exports: [MinuteSecondsPipe],
})
export class NumberToMinutesPipeModule {}

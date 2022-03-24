import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { TimeDialogComponent } from 'src/app/shared/components/dialogs/time-dialog/time-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public addExerciseForm: FormGroup;
  public tempDate: Date = new Date(2022, 4, 5);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly popoverController: PopoverController
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get errorControl() {
    return this.addExerciseForm.controls;
  }

  public addExercise(): void {}

  public async openDatePicker(): Promise<void> {
    const popover = await this.popoverController.create({
      component: TimeDialogComponent,
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.tempDate = data.data;
      }
    });
  }

  private initForm(): void {
    this.addExerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      currentMinutes: [
        0,
        [Validators.required, Validators.max(59), Validators.min(0)],
      ],
      currentSeconds: [
        0,
        [Validators.required, Validators.max(59), Validators.min(0)],
      ],
      goalMinutes: [
        0,
        [Validators.required, Validators.max(59), Validators.min(0)],
      ],
      goalSeconds: [
        0,
        [Validators.required, Validators.max(59), Validators.min(0)],
      ],
      goalDate: ['', [Validators.required]],
      frequency: ['', [Validators.required]],
    });
  }
}

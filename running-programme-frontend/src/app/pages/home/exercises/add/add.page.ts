import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { TimeDialogComponent } from 'src/app/shared/components/dialogs/time-dialog/time-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public addExerciseForm: FormGroup;
  public date: Date;
  public dateOpened: boolean = false;

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly formBuilder: FormBuilder,
    private readonly popoverController: PopoverController,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get errorControl() {
    return this.addExerciseForm.controls;
  }

  public addExercise(): void {
    if (this.addExerciseForm.valid && this.date) {
      const exercise: ExerciseDTO = {
        name: this.addExerciseForm.get('name').value,
        currentMinutes: this.addExerciseForm.get('currentMinutes').value,
        currentSeconds: this.addExerciseForm.get('currentSeconds').value,
        goalMinutes: this.addExerciseForm.get('goalMinutes').value,
        goalSeconds: this.addExerciseForm.get('goalSeconds').value,
        goalDate: this.date,
        frequency: this.addExerciseForm.get('frequency').value,
      };

      this.exerciseService
        .addExercise(exercise)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }

  public async openDatePicker(): Promise<void> {
    const popover = await this.popoverController.create({
      component: TimeDialogComponent,
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      this.dateOpened = true;
      if (data) {
        this.dateOpened = false;
        this.date = data.data;
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
      frequency: ['', [Validators.required]],
    });
  }
}

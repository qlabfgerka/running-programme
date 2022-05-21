import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { StatusDTO } from 'src/app/models/exercise/status.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { InformationDialogComponent } from 'src/app/shared/components/information-dialog/information-dialog.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit, ViewWillEnter {
  public ongoingExercises: Array<ExerciseDTO>;
  public successfulExercises: Array<ExerciseDTO>;
  public unsuccessfulExercises: Array<ExerciseDTO>;
  public isLoading: boolean = true;

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly popoverController: PopoverController,
    private readonly router: Router
  ) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  ngOnInit(): void {}

  public addExercise(): void {
    this.router.navigate(['/add']);
  }

  public openExercise(id: string): void {
    this.router.navigate([`/view/${id}`]);
  }

  public async handleExercise(id: string, option: string) {
    const popover = await this.popoverController.create({
      component: InformationDialogComponent,
      cssClass: 'popover-box',
      componentProps: {
        title: 'Update exercise',
        subtitle: `Are you sure you want to update the exercise status to <b class="capitalized">${option}</b>? <br>`,
        content: `Updating the exercise means finishing the exercise. <br>
          <b>Success</b> - You are happy with the exercise results and wish to finish it. <br>
          <b>Fail</b> - You are not happy with the exercise results and wish to finish it. <br>
          <b>Remove</b> - You wish to completely remove the exercise.`,
        confirmButton: 'CONTINUE',
        cancelButton: 'CANCEL',
      },
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data.data === 'CONTINUE') {
        this.exerciseService
          .updateStatus(id, option)
          .pipe(take(1))
          .subscribe(() => {
            this.refresh();
          });
      }
    });
  }

  private refresh(): void {
    this.isLoading = true;
    this.exerciseService
      .getExercises()
      .pipe(take(1))
      .subscribe((exercises: Array<ExerciseDTO>) => {
        this.ongoingExercises = exercises.filter(
          (exercise: ExerciseDTO) => exercise.status === StatusDTO.ongoing
        );
        this.successfulExercises = exercises.filter(
          (exercise: ExerciseDTO) => exercise.status === StatusDTO.success
        );
        this.unsuccessfulExercises = exercises.filter(
          (exercise: ExerciseDTO) => exercise.status === StatusDTO.fail
        );
        this.isLoading = false;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit, ViewWillEnter {
  public exercises: Array<ExerciseDTO>;
  public isLoading: boolean;

  constructor(
    private readonly exerciseService: ExerciseService,
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

  private refresh(): void {
    this.isLoading = true;
    this.exerciseService
      .getExercises()
      .pipe(take(1))
      .subscribe((exercises: Array<ExerciseDTO>) => {
        this.exercises = exercises;
        this.isLoading = false;
      });
  }
}

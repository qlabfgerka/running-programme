import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public exercise: ExerciseDTO;
  public isLoading: boolean;

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public startExercise(): void {
    this.router.navigate(['view/temp/progress']);
  }

  private refresh(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          this.exerciseService.getExercise(paramMap.get('id')).pipe(take(1))
        )
      )
      .subscribe((exercise: ExerciseDTO) => {
        this.exercise = exercise;
        this.isLoading = false;
      });
  }
}

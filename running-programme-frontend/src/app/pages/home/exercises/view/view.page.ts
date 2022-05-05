import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit, ViewWillEnter {
  public exercise: ExerciseDTO;
  public isLoading: boolean = true;

  public next: number;

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  ngOnInit(): void {}

  public startExercise(): void {
    this.router.navigate([`view/${this.exercise.id}/progress/${this.next}`]);
  }

  private refresh(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          forkJoin([
            this.exerciseService.getExercise(paramMap.get('id')).pipe(take(1)),
            this.exerciseService
              .getNextExercise(paramMap.get('id'))
              .pipe(take(1)),
          ])
        )
      )
      .subscribe((response) => {
        this.exercise = response[0];
        this.next = response[1];
        this.isLoading = false;
      });
  }
}

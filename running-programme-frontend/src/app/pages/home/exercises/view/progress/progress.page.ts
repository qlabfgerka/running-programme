import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { mergeMap, take } from 'rxjs/operators';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit, OnDestroy {
  public isLoading: boolean;

  public speed: number;
  public totalRan: number = 0;
  public totalElapsed: number = 0;

  public exerciseDistance: number = 1000;
  public exerciseTime: number = 50;

  private interval: any;
  private earthRadius: number = 6371000;
  private next: number;
  private exerciseId: string;

  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.refresh();
  }

  public get goalSpeed(): number {
    return this.calculateSpeed(
      this.exerciseDistance - this.totalRan,
      this.exerciseTime - this.totalElapsed
    );
  }

  public finishExercise(): void {
    if (this.interval) clearInterval(this.interval);

    this.exerciseService
      .finishExercise(this.exerciseId, this.next, this.totalElapsed)
      .subscribe(() => {
        this.router.navigate([`/view/${this.exerciseId}`]);
      });
  }

  private async printCurrentPosition(): Promise<void> {
    let previous: Position = await Geolocation.getCurrentPosition();
    let current: Position;
    let distance: number;
    const time: number = 1000;

    setTimeout(() => {
      this.interval = setInterval(async () => {
        current = await Geolocation.getCurrentPosition();

        distance = this.calculateMeters(previous, current);
        this.totalRan += distance;
        this.totalElapsed += time / 1000;
        this.speed = this.calculateSpeed(distance, time / 1000);

        previous = current;

        if (this.totalRan >= this.exerciseDistance)
          clearInterval(this.interval);
      }, time);
    }, time);
  }

  private calculateMeters(point1: Position, point2: Position): number {
    const rad = Math.PI / 180;
    return (
      this.earthRadius *
      rad *
      Math.sqrt(
        Math.pow(
          Math.cos(point1.coords.latitude * rad) *
            (point1.coords.longitude - point2.coords.longitude),
          2
        ) + Math.pow(point1.coords.latitude - point2.coords.latitude, 2)
      )
    );
  }

  private calculateSpeed(distance: number, time: number): number {
    return (distance / time) * 3.6;
  }

  private refresh(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) => {
          this.next = +paramMap.get('next');
          return this.exerciseService
            .getExercise(paramMap.get('id'))
            .pipe(take(1));
        })
      )
      .subscribe((exercise: ExerciseDTO) => {
        this.exerciseDistance = exercise.distance;
        this.exerciseTime = exercise.plans[this.next].time;
        this.exerciseId = exercise.id;
        this.printCurrentPosition();
        this.isLoading = false;
      });
  }
}

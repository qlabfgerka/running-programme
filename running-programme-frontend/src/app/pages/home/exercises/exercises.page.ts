import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  public tempDate1: Date = new Date(2022, 5, 16);
  public tempDate2: Date = new Date(2023, 7, 1);
  public tempDate3: Date = new Date(2021, 4, 10);

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public addExercise(): void {
    this.router.navigate(['/add']);
  }

  public openExercise(): void {
    this.router.navigate(['/view/temp']);
  }
}

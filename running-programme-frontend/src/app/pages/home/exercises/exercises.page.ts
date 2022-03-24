import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  public tempDate1: Date = new Date(2022, 5, 16);
  public tempDate2: Date = new Date(2023, 7, 1);
  public tempDate3: Date = new Date(2021, 4, 10);

  constructor() {}

  ngOnInit() {}
}

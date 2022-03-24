import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public tempDate: Date = new Date(2022, 4, 5);

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public startExercise(): void {
    this.router.navigate(['home/view/temp/progress']);
  }
}

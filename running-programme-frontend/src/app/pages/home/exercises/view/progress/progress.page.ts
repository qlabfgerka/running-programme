import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit, OnDestroy {
  public speed: number;
  public totalRan: number = 0;
  public totalElapsed: number = 0;

  public exerciseDistance: number = 1000;
  public exerciseTime: number = 50;

  private interval: any;
  private earthRadius: number = 6371000;

  constructor() {}

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.printCurrentPosition();
  }

  public get goalSpeed(): number {
    return this.calculateSpeed(
      this.exerciseDistance - this.totalRan,
      this.exerciseTime - this.totalElapsed
    );
  }

  public scanHeartbeat(): void {}

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
}

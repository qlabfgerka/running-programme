import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseDTO } from 'src/app/models/exercise/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getExercises(): Observable<Array<ExerciseDTO>> {
    return this.httpClient.get<Array<ExerciseDTO>>(`${this.hostname}/exercise`);
  }

  public getExercise(id: string): Observable<ExerciseDTO> {
    return this.httpClient.get<ExerciseDTO>(`${this.hostname}/exercise/${id}`);
  }

  public addExercise(exercise: ExerciseDTO): Observable<ExerciseDTO> {
    return this.httpClient.post<ExerciseDTO>(
      `${this.hostname}/exercise`,
      exercise
    );
  }
}

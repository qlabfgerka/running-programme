import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { Exercise } from 'src/models/exercise/exercise.model';
import { JwtAuthGuard } from '../user/auth/guards/jwt-auth.guard';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getExercises(@Request() req: any): Promise<Array<Exercise>> {
    return await this.exerciseService.getExercises(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getExercise(@Param('id') id: string): Promise<Exercise> {
    return await this.exerciseService.getExercise(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async addExercise(
    @Request() req: any,
    @Body() exercise: Exercise,
  ): Promise<Exercise> {
    return await this.exerciseService.addExercise(exercise, req.user.id);
  }
}

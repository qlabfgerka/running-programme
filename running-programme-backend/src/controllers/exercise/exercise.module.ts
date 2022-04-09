import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/user.model';
import { Exercise, ExerciseSchema } from 'src/models/exercise/exercise.model';

@Module({
  providers: [ExerciseService],
  controllers: [ExerciseController],
  imports: [
    DtoFunctionsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Exercise.name,
        schema: ExerciseSchema,
      },
    ]),
  ],
})
export class ExerciseModule {}

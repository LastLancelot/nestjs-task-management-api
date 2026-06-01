import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { User } from './user/user.entity';
import { Cooperation } from './user-cooperation/cooperation.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DATABASE_HOST}`,
      port: Number(`${process.env.DATABASE_PORT}`),
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [Task, User, Cooperation],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}

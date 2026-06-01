import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cooperation } from './cooperation.entity';
import { CooperationService } from './cooperation.service';
import { CooperationController } from './cooperation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cooperation])],
  providers: [CooperationService],
  controllers: [CooperationController],
})
export class UserModule {}

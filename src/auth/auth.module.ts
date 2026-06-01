import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
dotenv.config();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

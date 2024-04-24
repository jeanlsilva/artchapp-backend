import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { AuthJwtGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { RoleGuard } from './auth.role.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    FirebaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_TIME },
      }),
    }),
  ],
  providers: [AuthService, AuthStrategy, AuthJwtGuard, RoleGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

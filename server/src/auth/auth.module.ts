import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy, GoogleStrategy, YandexStrategy],
})
export class AuthModule {}

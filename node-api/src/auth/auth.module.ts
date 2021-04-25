import { EncryptionModule } from './../encryption/encryption.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_EXPIRATION_S, JWT_SECRET_CONFIG_VAR } from '../constants';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET_CONFIG_VAR),
        signOptions: { expiresIn: JWT_EXPIRATION_S },
      }),
      inject: [ConfigService],
    }),
    EncryptionModule,
    UserModule,
    UserProfileModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

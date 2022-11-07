import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@Config/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Controllers } from '@src/controllers';
import { Repositories } from '@src/repositories';
import { Services } from '@src/services';
import { Entities } from '@Models/entities';
import { Strategies } from './security/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...databaseConfig,
      autoLoadEntities: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LIVE },
      }),
    }),
    TypeOrmModule.forFeature([...Entities]),
  ],
  controllers: [...Controllers],
  providers: [...Services, ...Repositories, ...Strategies],
})
export class AppModule {}

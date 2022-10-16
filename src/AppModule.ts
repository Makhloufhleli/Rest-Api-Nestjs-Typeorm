import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@Config/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Controllers } from '@src/controllers';
import { Repositories } from '@src/repositories';
import { Services } from '@src/services';
import { Entities } from '@Models/entities';

@Module( {
  imports: [ ConfigModule.forRoot(), TypeOrmModule.forRoot( {
    ...databaseConfig,
    autoLoadEntities: true
  } ),
    PassportModule.register( { defaultStrategy: 'jwt' } ),
    JwtModule.register( {
      secret: process.env.ACCESS_TOKEN_SECRET,
    } ),
    TypeOrmModule.forFeature( [ ...Entities ] ),
  ],
  controllers: [ ...Controllers ],
  providers: [ ...Services, ...Repositories ],
} )
export class AppModule {
}

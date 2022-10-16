import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlDatabaseConfig } from '@Config/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(mysqlDatabaseConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UserService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
import { Robot_Info } from './entities/robot.entity';

import { TwilloModule } from './openapi/twillo.module';
import { GmailEmailModule } from './openapi/gmail-email.module';
import { UserModule } from './user/user.module';

type DatabaseType = 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'oracle' | 'mongodb' | 'better-sqlite3' | 'react-native';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const type = configService.get<DatabaseType>('DB_env_type') as DatabaseType;
        const host = configService.get<string>('DB_env_host') || 'localhost';
        const port = parseInt(configService.get<string>('DB_env_port') || '3306', 10);
        const username = configService.get<string>('DB_env_username') || 'root';
        const password = configService.get<string>('DB_env_password') || '';
        const database = configService.get<string>('DB_env_database') || 'test';

        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities: [User, Robot_Info],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Robot_Info]),
    forwardRef(() => UserModule),
    forwardRef(() => TwilloModule),
    forwardRef(() => GmailEmailModule),
  ],
  controllers: [UsersController, AppController],
  providers: [AppService, UserService, MqttService],
})
export class AppModule {}

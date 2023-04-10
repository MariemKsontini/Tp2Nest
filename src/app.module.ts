import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModuleModule } from './CommonModule/Common-mod.module';
import { TodoModule } from './Todo/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TodoModule,
    CommonModuleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp2nest',
      autoLoadEntities: true,
      synchronize: true,
      debug: false,
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
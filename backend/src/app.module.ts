import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'demo_graphql',
      password: 'demo_graphql',
      database: 'demo_graphql',
      synchronize: true,
      autoLoadEntities: true,
      // entities: ['./**/*.entity.{.js,.ts}'],
      // migrations: ['./dist/src/migration/**/*{.js,.ts}'],
      // subscribers: ['./dist/**/*{.js,.ts}'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
    }),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}

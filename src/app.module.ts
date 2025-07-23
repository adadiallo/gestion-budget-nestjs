import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetsModule } from './budgets/budgets.module';
import { RevenusModule } from './revenus/revenus.module';
import { DepensesModule } from './depenses/depenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depense } from './depenses/entities/depense.entity';
import { Revenu } from './depenses/entities/revenu.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 🔧 Chargement des variables .env
    ConfigModule.forRoot({
      isGlobal: true, // 👈 rend disponible dans toute l'application
    }),

    // ⚙️ Connexion à la base PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Depense, Revenu],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // 📦 Modules de ton app
    BudgetsModule,
    RevenusModule,
    DepensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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
    ConfigModule.forRoot(), // Assure-toi que ConfigModule est bien chargé
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Type de base de données
        host: configService.get<string>('DATABASE_HOST'), // Utiliser la variable d'environnement
        port: configService.get<number>('DATABASE_PORT') || 5432, // Port de la base de données (5432 par défaut)
        username: configService.get<string>('DATABASE_USER'), // Utiliser la variable d'environnement
        password: configService.get<string>('DATABASE_PASSWORD'), // Utiliser la variable d'environnement
        database: configService.get<string>('DATABASE_NAME'), // Utiliser la variable d'environnement
        entities: [Depense, Revenu], // Liste des entités
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // Ne pas synchroniser en production
      }),
      inject: [ConfigService],
    }),
    BudgetsModule,
    RevenusModule,
    DepensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

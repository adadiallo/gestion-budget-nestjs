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
    
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService) => ({
         // <-- Configurer la connexion
      type: 'postgres', // Le type de base de données
      host:configService.get<string>( 'localhost'), // L'adresse du serveur (notre Docker)
      port: configService.get<number>('5432'), // Le port par défaut de PostgreSQL
      username:configService.get<string>( 'adminBudget'), // L'utilisateur défini dans Docker
      password: configService.get<string>('passwordBudget'), // Le mot de passe défini dans Docker
      database: configService.get<string>('budgetapi'), // Le nom de la base défini dans Docker
      entities: [Depense,Revenu], // <-- Nous ajouterons nos entités ici plus tard
    synchronize: configService.get<string>('NODE_ENV') !== 'production', // <-- IMPORTANT
      }),

       inject: [ConfigService],

    }),
    
    BudgetsModule, RevenusModule, DepensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



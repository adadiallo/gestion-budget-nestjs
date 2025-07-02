import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetsModule } from './budgets/budgets.module';
import { RevenusModule } from './revenus/revenus.module';
import { DepensesModule } from './depenses/depenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depense } from './depenses/entities/depense.entity';
import { Revenu } from './depenses/entities/revenu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // <-- Configurer la connexion
      type: 'postgres', // Le type de base de données
      host: 'localhost', // L'adresse du serveur (notre Docker)
      port: 5432, // Le port par défaut de PostgreSQL
      username: 'adminBudget', // L'utilisateur défini dans Docker
      password: 'passwordBudget', // Le mot de passe défini dans Docker
      database: 'budgetapi', // Le nom de la base défini dans Docker
      entities: [Depense,Revenu], // <-- Nous ajouterons nos entités ici plus tard
      synchronize: true, // <-- IMPORTANT: Voir note ci-dessous
    }),
    
    BudgetsModule, RevenusModule, DepensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { User, About } from '../../shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, About])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}

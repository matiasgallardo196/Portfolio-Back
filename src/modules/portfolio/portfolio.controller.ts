import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { UpdateAboutDto } from './dto';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Get default portfolio' })
  @ApiResponse({ status: 200, description: 'Returns the default portfolio data' })
  @ApiResponse({ status: 404, description: 'Portfolio not found' })
  async getPortfolio() {
    return this.portfolioService.getPortfolio();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get portfolio by user ID' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Returns the portfolio for the specified user' })
  @ApiResponse({ status: 404, description: 'Portfolio not found' })
  async getPortfolioByUserId(@Param('userId') userId: string) {
    return this.portfolioService.getPortfolioByUserId(userId);
  }

  @Put(':userId/about')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update about section' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'About section updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'About section not found' })
  async updateAbout(
    @Param('userId') userId: string,
    @Body() aboutData: UpdateAboutDto,
  ) {
    return this.portfolioService.updateAbout(userId, aboutData);
  }
}

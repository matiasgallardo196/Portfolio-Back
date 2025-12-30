import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, About } from '../../shared/entities';
import { UpdateAboutDto } from './dto';

// Default user ID for public portfolio
const DEFAULT_USER_ID = '808ceb8b-8da6-440c-952d-2d5c23b070e0';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async getPortfolio() {
    return this.getPortfolioByUserId(DEFAULT_USER_ID);
  }

  async getPortfolioByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'about',
        'projects',
        'projects.projectSkills',
        'projects.projectSkills.skill',
        'skills',
        'languages',
        'achievements',
        'contact',
        'contact.opportunities',
        'contact.locationInfo',
      ],
    });

    if (!user) {
      throw new NotFoundException('Portfolio not found');
    }

    // Transform data to match frontend expectations
    return {
      about: user.about,
      projects: user.projects?.map((project) => ({
        ...project,
        technologies: project.projectSkills?.map((ps) => ps.skill?.name) || [],
      })) || [],
      skills: user.skills || [],
      languages: user.languages || [],
      achievements: user.achievements || [],
      contact: user.contact
        ? {
            ...user.contact,
            opportunities: user.contact.opportunities || [],
            locationInfo: user.contact.locationInfo || [],
          }
        : null,
    };
  }

  async updateAbout(userId: string, aboutData: UpdateAboutDto) {
    const about = await this.aboutRepository.findOne({
      where: { userId },
    });

    if (!about) {
      throw new NotFoundException('About section not found');
    }

    await this.aboutRepository.update({ userId }, aboutData);
    
    return this.aboutRepository.findOne({ where: { userId } });
  }
}

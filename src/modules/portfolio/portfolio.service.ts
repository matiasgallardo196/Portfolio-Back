import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, About, Project, Skill, Language, Achievement, Contact } from '../../shared/entities';
import { UpdateAboutDto } from './dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async getPortfolio() {
    // Find first active user for public portfolio
    const user = await this.userRepository.findOne({
      where: { isActive: true },
      order: { createdAt: 'ASC' },
    });
    
    if (!user) {
      throw new NotFoundException('No active portfolio found');
    }
    
    return this.getPortfolioByUserId(user.id);
  }

  async getPortfolioByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['about'],
    });

    if (!user) {
      throw new NotFoundException('Portfolio not found');
    }

    const projectRepo = this.userRepository.manager.getRepository(Project);
    const skillRepo = this.userRepository.manager.getRepository(Skill);
    const languageRepo = this.userRepository.manager.getRepository(Language);
    const achievementRepo = this.userRepository.manager.getRepository(Achievement);
    const contactRepo = this.userRepository.manager.getRepository(Contact);

    const [projects, skills, languages, achievements, contact] = await Promise.all([
      projectRepo.find({
        where: { userId },
        relations: ['projectSkills', 'projectSkills.skill'],
      }),
      skillRepo.find({ where: { userId } }),
      languageRepo.find({ where: { userId } }),
      achievementRepo.find({ where: { userId } }),
      contactRepo.findOne({
        where: { userId },
        relations: ['opportunities', 'locationInfo'],
      }),
    ]);

    // Transform data to match frontend expectations
    // Group skills by category
    const skillCategories = ['languages', 'frontend', 'backend', 'databases', 'devops', 'integrations', 'practices'];
    const groupedSkills = skillCategories.reduce((acc, category) => {
      acc[category] = skills.filter((s) => s.category === category);
      return acc;
    }, {});

    return {
      about: user.about,
      projects: projects.map((project) => ({
        ...project,
        technologies: project.projectSkills?.map((ps) => ps.skill).filter(Boolean) || [],
      })),
      skills: groupedSkills,
      languages: languages || [],
      achievements: achievements || [],
      contact: contact
        ? {
            ...contact,
            opportunities: contact.opportunities || [],
            locationInfo: contact.locationInfo || [],
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

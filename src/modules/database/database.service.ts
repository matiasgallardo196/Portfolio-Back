import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  User,
  About,
  Skill,
  SkillCategory,
  Achievement,
  Language,
  Project,
  Contact,
} from "../../entities";

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) {
    console.log("✅ DatabaseService inicializado correctamente");
    console.log(
      "   Repositorios disponibles: User, About, Skill, Achievement, Language, Project, Contact"
    );
  }

  // About methods
  async getAbout(): Promise<About | null> {
    return this.aboutRepository.findOne({ where: {} });
  }

  async createAbout(aboutData: Partial<About>): Promise<About> {
    const about = this.aboutRepository.create(aboutData);
    return this.aboutRepository.save(about);
  }

  async updateAbout(
    id: string,
    aboutData: Partial<About>
  ): Promise<About | null> {
    await this.aboutRepository.update(id, aboutData);
    return this.aboutRepository.findOne({ where: { id } });
  }

  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async getSkillsByCategory(category: SkillCategory): Promise<Skill[]> {
    return this.skillRepository.find({ where: { category } });
  }

  async createSkill(skillData: Partial<Skill>): Promise<Skill> {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }

  async updateSkill(
    id: string,
    skillData: Partial<Skill>
  ): Promise<Skill | null> {
    await this.skillRepository.update(id, skillData);
    return this.skillRepository.findOne({ where: { id } });
  }

  async deleteSkill(id: string): Promise<void> {
    await this.skillRepository.delete(id);
  }

  // Achievement methods
  async getAllAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async createAchievement(
    achievementData: Partial<Achievement>
  ): Promise<Achievement> {
    const achievement = this.achievementRepository.create(achievementData);
    return this.achievementRepository.save(achievement);
  }

  async updateAchievement(
    id: string,
    achievementData: Partial<Achievement>
  ): Promise<Achievement | null> {
    await this.achievementRepository.update(id, achievementData);
    return this.achievementRepository.findOne({ where: { id } });
  }

  async deleteAchievement(id: string): Promise<void> {
    await this.achievementRepository.delete(id);
  }

  // Language methods
  async getAllLanguages(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async createLanguage(languageData: Partial<Language>): Promise<Language> {
    const language = this.languageRepository.create(languageData);
    return this.languageRepository.save(language);
  }

  async updateLanguage(
    id: string,
    languageData: Partial<Language>
  ): Promise<Language | null> {
    await this.languageRepository.update(id, languageData);
    return this.languageRepository.findOne({ where: { id } });
  }

  async deleteLanguage(id: string): Promise<void> {
    await this.languageRepository.delete(id);
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ["technologies"] });
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ["technologies"],
    });
  }

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async updateProject(
    id: string,
    projectData: Partial<Project>
  ): Promise<Project | null> {
    await this.projectRepository.update(id, projectData);
    return this.projectRepository.findOne({
      where: { id },
      relations: ["technologies"],
    });
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  // Contact methods
  async getContact(): Promise<Contact | null> {
    return this.contactRepository.findOne({
      where: {},
      relations: ["opportunities", "locationInfo"],
    });
  }

  async createContact(contactData: Partial<Contact>): Promise<Contact> {
    const contact = this.contactRepository.create(contactData);
    return this.contactRepository.save(contact);
  }

  async updateContact(
    id: string,
    contactData: Partial<Contact>
  ): Promise<Contact | null> {
    await this.contactRepository.update(id, contactData);
    return this.contactRepository.findOne({
      where: { id },
      relations: ["opportunities", "locationInfo"],
    });
  }

  async deleteContact(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }

  // User methods
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: [
        "about",
        "skills",
        "achievements",
        "languages",
        "projects",
        "contact",
      ],
    });
  }

  // Portfolio methods by userId
  async getAboutByUserId(userId: string): Promise<About | null> {
    return this.aboutRepository.findOne({ where: { userId } });
  }

  async getSkillsByUserId(userId: string): Promise<Skill[]> {
    return this.skillRepository.find({ where: { userId } });
  }

  async getSkillsByCategoryAndUserId(
    userId: string,
    category: SkillCategory
  ): Promise<Skill[]> {
    return this.skillRepository.find({ where: { userId, category } });
  }

  async getAchievementsByUserId(userId: string): Promise<Achievement[]> {
    return this.achievementRepository.find({ where: { userId } });
  }

  async getLanguagesByUserId(userId: string): Promise<Language[]> {
    return this.languageRepository.find({ where: { userId } });
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { userId },
      relations: ["technologies"],
    });
  }

  async getContactByUserId(userId: string): Promise<Contact | null> {
    return this.contactRepository.findOne({
      where: { userId },
      relations: ["opportunities", "locationInfo"],
    });
  }

  // Complete portfolio by userId
  async getPortfolioByUserId(userId: string) {
    const [about, skills, achievements, languages, projects, contact] =
      await Promise.all([
        this.getAboutByUserId(userId),
        this.getSkillsByUserId(userId),
        this.getAchievementsByUserId(userId),
        this.getLanguagesByUserId(userId),
        this.getProjectsByUserId(userId),
        this.getContactByUserId(userId),
      ]);

    // Organizar skills por categoría (como en data/skills.ts)
    const skillsByCategory = {
      languages: skills.filter(
        (skill) => skill.category === SkillCategory.LANGUAGES
      ),
      frontend: skills.filter(
        (skill) => skill.category === SkillCategory.FRONTEND
      ),
      backend: skills.filter(
        (skill) => skill.category === SkillCategory.BACKEND
      ),
      databases: skills.filter(
        (skill) => skill.category === SkillCategory.DATABASES
      ),
      devops: skills.filter((skill) => skill.category === SkillCategory.DEVOPS),
      integrations: skills.filter(
        (skill) => skill.category === SkillCategory.INTEGRATIONS
      ),
      practices: skills.filter(
        (skill) => skill.category === SkillCategory.PRACTICES
      ),
    };

    return {
      about,
      skills: skillsByCategory,
      achievements,
      languages,
      projects,
      contact,
    };
  }
}

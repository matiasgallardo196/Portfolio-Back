import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  User,
  About,
  Project,
  Skill,
  ProjectSkill,
  Language,
  Achievement,
  Contact,
  ContactOpportunity,
  ContactLocationInfo,
} from '../shared/entities';
import { SkillCategory } from '../shared/entities/skill.entity';
import { DATABASE_URL } from '../config/env.loader';

const dataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [
    User,
    About,
    Project,
    Skill,
    ProjectSkill,
    Language,
    Achievement,
    Contact,
    ContactOpportunity,
    ContactLocationInfo,
  ],
  synchronize: false,
});

async function seed() {
  console.log('🌱 Starting database seed...');

  await dataSource.initialize();
  console.log('📦 Database connected');

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Clean existing data using raw SQL to avoid TypeORM empty criteria error
    await queryRunner.query('TRUNCATE TABLE project_skills CASCADE');
    await queryRunner.query('TRUNCATE TABLE contact_opportunities CASCADE');
    await queryRunner.query('TRUNCATE TABLE contact_location_info CASCADE');
    await queryRunner.query('TRUNCATE TABLE achievements CASCADE');
    await queryRunner.query('TRUNCATE TABLE languages CASCADE');
    await queryRunner.query('TRUNCATE TABLE skills CASCADE');
    await queryRunner.query('TRUNCATE TABLE projects CASCADE');
    await queryRunner.query('TRUNCATE TABLE contact CASCADE');
    await queryRunner.query('TRUNCATE TABLE about CASCADE');
    await queryRunner.query('TRUNCATE TABLE users CASCADE');
    console.log('🧹 Cleaned existing data');

    // Create User
    const hashedPassword = await bcrypt.hash('portfolio123', 10);
    const user = queryRunner.manager.create(User, {
      email: 'dreico07@gmail.com',
      username: 'matiasgallardo',
      password: hashedPassword,
      isActive: true,
    });
    await queryRunner.manager.save(user);
    console.log('👤 User created:', user.id);

    // Create About
    const about = queryRunner.manager.create(About, {
      userId: user.id,
      fullName: 'Matías Gallardo',
      location: 'Moree, NSW, Australia',
      biography: `Backend-focused Full Stack Developer based in NSW, Australia. I build API-driven systems and multi-tenant platforms with Node.js, NestJS, TypeScript and PostgreSQL, and I'm experienced deploying real products with Docker, NGINX, HTTPS and CI/CD. I transitioned into tech after a background in hospitality/chef work (including experience in France), and I'm now focused on scalable architectures, integrations (Stripe/Auth0/Firebase) and AI-powered workflows (agents, RAG).`,
      pageDescription: 'Portfolio of Matías Gallardo - Backend-Focused Full Stack Developer',
      metaDescription: 'Backend-focused Full Stack Developer specializing in NestJS, PostgreSQL, Docker, and scalable API-driven architectures.',
      heroTitle: 'Backend-Focused Full Stack Developer',
      heroSubtitle: 'Building scalable, API-driven platforms with NestJS, PostgreSQL & Docker',
      avatarUrl: 'https://avatars.githubusercontent.com/u/195301924?v=4',
      relocationStatus: 'Open to relocation (Australia) + Remote/Hybrid',
      ctaButtons: [
        { label: 'View Projects', href: '/projects' },
        { label: 'Contact Me', href: '/contact' },
      ],
      stats: {
        projects: { title: 'Projects', subtitle: 'Completed' },
        technologies: { title: 'Technologies', subtitle: 'Mastered' },
        languages: { title: 'Languages', subtitle: 'Fluent' },
      },
    });
    await queryRunner.manager.save(about);
    console.log('📝 About created');

    // Create Skills
    const skillsData: { name: string; category: SkillCategory }[] = [
      // Languages
      { name: 'TypeScript', category: SkillCategory.LANGUAGES },
      { name: 'JavaScript', category: SkillCategory.LANGUAGES },
      { name: 'SQL', category: SkillCategory.LANGUAGES },
      { name: 'Python (learning)', category: SkillCategory.LANGUAGES },
      { name: 'Java (basic)', category: SkillCategory.LANGUAGES },
      { name: 'C (basic)', category: SkillCategory.LANGUAGES },
      // Frontend
      { name: 'React', category: SkillCategory.FRONTEND },
      { name: 'Next.js', category: SkillCategory.FRONTEND },
      { name: 'Vite', category: SkillCategory.FRONTEND },
      { name: 'React Hook Form', category: SkillCategory.FRONTEND },
      { name: 'Zod', category: SkillCategory.FRONTEND },
      { name: 'Recharts', category: SkillCategory.FRONTEND },
      { name: 'shadcn/ui', category: SkillCategory.FRONTEND },
      { name: 'Tailwind CSS', category: SkillCategory.FRONTEND },
      // Backend
      { name: 'Node.js', category: SkillCategory.BACKEND },
      { name: 'NestJS', category: SkillCategory.BACKEND },
      { name: 'Express', category: SkillCategory.BACKEND },
      { name: 'REST APIs', category: SkillCategory.BACKEND },
      { name: 'JWT', category: SkillCategory.BACKEND },
      { name: 'Auth0', category: SkillCategory.BACKEND },
      { name: 'TypeORM', category: SkillCategory.BACKEND },
      { name: 'Prisma', category: SkillCategory.BACKEND },
      { name: 'Microservices', category: SkillCategory.BACKEND },
      { name: 'Event-driven architecture', category: SkillCategory.BACKEND },
      // Databases
      { name: 'PostgreSQL', category: SkillCategory.DATABASES },
      { name: 'MongoDB', category: SkillCategory.DATABASES },
      { name: 'Supabase', category: SkillCategory.DATABASES },
      { name: 'Neon', category: SkillCategory.DATABASES },
      // DevOps
      { name: 'Docker', category: SkillCategory.DEVOPS },
      { name: 'NGINX', category: SkillCategory.DEVOPS },
      { name: 'HTTPS/TLS', category: SkillCategory.DEVOPS },
      { name: 'GitHub Actions', category: SkillCategory.DEVOPS },
      { name: 'SSH Deploy', category: SkillCategory.DEVOPS },
      { name: 'Oracle Cloud', category: SkillCategory.DEVOPS },
      { name: 'Vercel', category: SkillCategory.DEVOPS },
      { name: 'Render', category: SkillCategory.DEVOPS },
      { name: 'Linux', category: SkillCategory.DEVOPS },
      // Integrations
      { name: 'Stripe', category: SkillCategory.INTEGRATIONS },
      { name: 'Firebase', category: SkillCategory.INTEGRATIONS },
      { name: 'Cloudinary', category: SkillCategory.INTEGRATIONS },
      // Practices
      { name: 'Clean Architecture', category: SkillCategory.PRACTICES },
      { name: 'DRY Principles', category: SkillCategory.PRACTICES },
      { name: 'Database Transactions', category: SkillCategory.PRACTICES },
      { name: 'Pagination Patterns', category: SkillCategory.PRACTICES },
      { name: 'Soft Delete Patterns', category: SkillCategory.PRACTICES },
      { name: 'Security Best Practices', category: SkillCategory.PRACTICES },
    ];

    const skills: Skill[] = [];
    for (const skillData of skillsData) {
      const skill = queryRunner.manager.create(Skill, {
        userId: user.id,
        name: skillData.name,
        category: skillData.category,
      });
      await queryRunner.manager.save(skill);
      skills.push(skill);
    }
    console.log(`🛠️  ${skills.length} Skills created`);

    // Helper function to find skills by name
    const findSkillsByNames = (names: string[]): Skill[] => {
      return skills.filter((s) => names.some((name) => s.name.toLowerCase().includes(name.toLowerCase())));
    };

    // Create Projects
    const projectsData = [
      {
        title: 'SmartQR',
        description: 'Hospitality platform for restaurants/venues: admin dashboard, products/categories, orders, customers analytics, reward codes, and Stripe checkout. Backend in NestJS with PostgreSQL; frontend in Next.js.',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '/images/projects/smartqr.png',
        techNames: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Stripe', 'Auth0', 'Docker', 'GitHub Actions', 'NGINX'],
      },
      {
        title: 'Conversational Agent Microservices Demo',
        description: 'Microservices-based conversational agent: an AI orchestrator service that routes intents to a REST API service. Deployed across Vercel + Render.',
        githubUrl: '',
        demoUrl: 'https://desafio-tecnico-cse-laburen-com-2yk.vercel.app/',
        imageUrl: '/images/projects/laburen.png',
        techNames: ['NestJS', 'Node.js', 'TypeScript', 'Microservices', 'REST', 'Vercel', 'Render'],
      },
      {
        title: 'BanMate',
        description: 'Multi-venue ban-management system concept for hotels/pubs (operations-focused tooling for venues).',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '/images/projects/banmate.png',
        techNames: ['NestJS', 'TypeScript', 'PostgreSQL', 'Next.js'],
      },
      {
        title: 'AlojaPy',
        description: 'Airbnb-style rental platform concept for Paraguay (listings, bookings, management).',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '/images/projects/alojaPy.png',
        techNames: ['REST', 'PostgreSQL'],
      },
      {
        title: 'Binance Trading Bot Orchestrator',
        description: 'NestJS orchestrator microservice that triggers simulated buy/sell decisions on a schedule based on signals from an external microservice (simulation mode).',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '/images/projects/trading-bot.png',
        techNames: ['NestJS', 'TypeScript', 'Microservices'],
      },
      {
        title: 'Intruder Alert System',
        description: 'Camera-based intruder detection concept: if a face is not in the enrolled database, trigger an alert and store snapshots in Cloudinary with an admin panel.',
        githubUrl: '',
        demoUrl: '',
        imageUrl: '/images/projects/intruder-alert.png',
        techNames: ['Node.js', 'NestJS', 'Cloudinary'],
      },
    ];

    for (const projectData of projectsData) {
      const project = queryRunner.manager.create(Project, {
        userId: user.id,
        title: projectData.title,
        description: projectData.description,
        githubUrl: projectData.githubUrl,
        demoUrl: projectData.demoUrl,
        imageUrl: projectData.imageUrl,
      });
      await queryRunner.manager.save(project);

      // Link skills to project
      const projectSkills = findSkillsByNames(projectData.techNames);
      for (const skill of projectSkills) {
        const projectSkill = queryRunner.manager.create(ProjectSkill, {
          projectId: project.id,
          skillId: skill.id,
        });
        await queryRunner.manager.save(projectSkill);
      }
    }
    console.log(`📦 ${projectsData.length} Projects created with skills`);

    // Create Languages
    const languagesData = [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Intermediate / Professional working proficiency' },
    ];

    for (const langData of languagesData) {
      const language = queryRunner.manager.create(Language, {
        userId: user.id,
        name: langData.name,
        level: langData.level,
      });
      await queryRunner.manager.save(language);
    }
    console.log(`🌍 ${languagesData.length} Languages created`);

    // Create Achievements
    const achievementsData = [
      { title: 'Education', value: 'Soy Henry', subtitle: 'Full Stack Bootcamp Graduate' },
      { title: 'Production Deployments', value: 'Docker + NGINX', subtitle: 'HTTPS on Oracle Cloud VM' },
      { title: 'CI/CD Pipeline', value: 'GitHub Actions', subtitle: 'Automated SSH Deploy' },
      { title: 'Architecture', value: 'Multi-tenant', subtitle: 'Complex PostgreSQL Analytics' },
      { title: 'Integrations', value: 'Stripe + Auth0', subtitle: 'PaymentIntent & JWT Auth' },
    ];

    for (const achData of achievementsData) {
      const achievement = queryRunner.manager.create(Achievement, {
        userId: user.id,
        title: achData.title,
        value: achData.value,
        subtitle: achData.subtitle,
      });
      await queryRunner.manager.save(achievement);
    }
    console.log(`🏆 ${achievementsData.length} Achievements created`);

    // Create Contact
    const contact = queryRunner.manager.create(Contact, {
      userId: user.id,
      email: 'dreico07@gmail.com',
      linkedin: 'https://www.linkedin.com/in/matiasgallardo-dev/',
      github: 'https://github.com/matiasgallardo196',
      whatsapp: '+61 431269954',
      metaDescription: 'Get in touch with Matías Gallardo - Backend-Focused Full Stack Developer',
      pageTitle: 'Contact Me',
      heroTitle: "Let's Connect",
      letsTalkTitle: "Let's Talk",
      letsTalkDescription: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
      availabilityTitle: 'Currently Available',
      currentStatusTitle: 'Open to opportunities',
      locationTitle: 'Based in Australia',
    });
    await queryRunner.manager.save(contact);
    console.log('📧 Contact created');

    // Create Contact Opportunities
    const opportunitiesData = ['Full-time', 'Contract/Freelance', 'Startup', 'Remote', 'Hybrid'];
    for (const oppName of opportunitiesData) {
      const opportunity = queryRunner.manager.create(ContactOpportunity, {
        contactId: contact.id,
        name: oppName,
      });
      await queryRunner.manager.save(opportunity);
    }
    console.log(`💼 ${opportunitiesData.length} Opportunities created`);

    // Create Contact Location Info
    const locationInfoData = ['NSW, Australia', 'GMT+11 Timezone'];
    for (const locName of locationInfoData) {
      const locationInfo = queryRunner.manager.create(ContactLocationInfo, {
        contactId: contact.id,
        name: locName,
      });
      await queryRunner.manager.save(locationInfo);
    }
    console.log(`📍 ${locationInfoData.length} Location info created`);

    await queryRunner.commitTransaction();
    console.log('✅ Seed completed successfully!');
    console.log(`\n📋 Summary:`);
    console.log(`   User ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: portfolio123`);
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await queryRunner.release();
    await dataSource.destroy();
  }
}

seed().catch(console.error);

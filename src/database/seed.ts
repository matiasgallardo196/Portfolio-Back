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
      email: 'matiasgallardo196@gmail.com',
      username: 'matiasgallardo',
      password: hashedPassword,
      isActive: true,
    });
    await queryRunner.manager.save(user);
    console.log('👤 User created:', user.id);

    // Create About
    const about = queryRunner.manager.create(About, {
      userId: user.id,
      fullName: 'Matias Gallardo',
      location: 'Sydney, Australia',
      biography: `I'm a Full Stack Web Developer with a strong Back-End orientation, passionate about building scalable systems and delivering real-world solutions with measurable impact. I graduated from Henry's intensive bootcamp and hold a Technical Analyst degree in Information Systems from UTN FRT.

I specialize in modern technologies and follow best practices in validation, testing, and secure access control through RESTful APIs. My experience includes multi-tenant platforms, Stripe integrations, GitHub Actions, and cloud deployment across various platforms.

I'm passionate about clean architecture, automation, and creating solutions that make a real difference. When I'm not coding, I enjoy contributing to the developer community and staying updated with the latest technologies.`,
      pageDescription: "Learn more about Matias Gallardo's experience and skills in full stack development",
      metaDescription: 'Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia.',
      heroTitle: 'Full Stack Web Developer',
      heroSubtitle: 'Back-End Oriented',
      avatarUrl: '/avatar.jpg',
      relocationStatus: 'Open to relocate',
      ctaButtons: {
        projects: 'Checkout My Work',
        contact: 'Contact Me',
      },
      stats: {
        projects: { title: 'Full-Stack Projects Deployed', subtitle: 'Production-ready applications' },
        technologies: { title: 'Technologies Mastered', subtitle: 'Modern stack expertise' },
        languages: { title: 'Languages', subtitle: 'Bilingual communication' },
      },
    });
    await queryRunner.manager.save(about);
    console.log('📝 About created');

    // Create Skills (matching production website)
    const skillsData: { name: string; category: SkillCategory }[] = [
      // Languages
      { name: 'JavaScript', category: SkillCategory.LANGUAGES },
      { name: 'TypeScript', category: SkillCategory.LANGUAGES },
      { name: 'SQL', category: SkillCategory.LANGUAGES },
      // Frontend
      { name: 'React', category: SkillCategory.FRONTEND },
      { name: 'Recharts', category: SkillCategory.FRONTEND },
      { name: 'HTML', category: SkillCategory.FRONTEND },
      { name: 'CSS', category: SkillCategory.FRONTEND },
      { name: 'TailwindCSS', category: SkillCategory.FRONTEND },
      // Backend
      { name: 'NestJS', category: SkillCategory.BACKEND },
      { name: 'Node.js', category: SkillCategory.BACKEND },
      { name: 'Express', category: SkillCategory.BACKEND },
      { name: 'RESTful APIs', category: SkillCategory.BACKEND },
      // Databases
      { name: 'PostgreSQL', category: SkillCategory.DATABASES },
      { name: 'MongoDB', category: SkillCategory.DATABASES },
      // DevOps
      { name: 'Docker', category: SkillCategory.DEVOPS },
      { name: 'Vercel', category: SkillCategory.DEVOPS },
      { name: 'Render', category: SkillCategory.DEVOPS },
      { name: 'Supabase', category: SkillCategory.DEVOPS },
      { name: 'Git', category: SkillCategory.DEVOPS },
      { name: 'GitHub', category: SkillCategory.DEVOPS },
      // Integrations
      { name: 'Auth0', category: SkillCategory.INTEGRATIONS },
      { name: 'Stripe', category: SkillCategory.INTEGRATIONS },
      { name: 'Nodemailer', category: SkillCategory.INTEGRATIONS },
      { name: 'Cloudinary', category: SkillCategory.INTEGRATIONS },
      { name: 'OpenAI', category: SkillCategory.INTEGRATIONS },
      // Practices
      { name: 'Testing', category: SkillCategory.PRACTICES },
      { name: 'Access Control', category: SkillCategory.PRACTICES },
      { name: 'Validation', category: SkillCategory.PRACTICES },
      { name: 'Multi-Tenant Architecture', category: SkillCategory.PRACTICES },
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

    // Create Projects (matching production website)
    const projectsData = [
      {
        title: 'SmartQR – QR Order Platform for Restaurants',
        description: 'Multi-tenant platform for restaurants where customers scan a QR code on their table to order without waitstaff. Each restaurant has its own dashboard with reports, product management, and billing. Led the development of the entire reports module and integrated Stripe payment system and OpenAI-powered chatbot.',
        githubUrl: 'https://github.com/SmartQrProject/SmartQrProject',
        demoUrl: 'https://www.smart-qr.tech/',
        imageUrl: '/project1.jpg',
        techNames: ['NestJS', 'PostgreSQL', 'MongoDB', 'Stripe', 'Auth0', 'Docker', 'Recharts', 'React', 'Vercel', 'Render', 'Supabase', 'Nodemailer', 'Cloudinary', 'OpenAI'],
      },
      {
        title: 'AI Agent – Conversational Assistant for Web & WhatsApp',
        description: 'Conversational assistant designed for a technical challenge by Laburen.com. The system detects user intents (e.g., product search, cart creation) and responds via WhatsApp or a web interface. Features modular architecture and full backend implementation from scratch with Twilio integration.',
        githubUrl: 'https://github.com/matiasgallardo196/AI-agent',
        demoUrl: 'https://desafio-tecnico-cse-laburen-com.vercel.app/',
        imageUrl: '/project2.jpg',
        techNames: ['NestJS', 'TypeScript', 'PostgreSQL', 'Supabase', 'OpenAI', 'React', 'TailwindCSS', 'Render', 'Vercel'],
      },
      {
        title: 'E-Commerce API – Backend for Online Store',
        description: 'RESTful API built with NestJS to support a complete e-commerce system. Includes user authentication with roles, comprehensive CRUD operations for products and user management, image uploads with Cloudinary, and order creation with purchase details. Deployed with CI/CD pipeline.',
        githubUrl: 'https://github.com/matiasgallardo196/ecommerce-api-nestjs',
        demoUrl: 'https://ecommerce-api-nestjs.fly.dev/api',
        imageUrl: '/project3.jpg',
        techNames: ['NestJS', 'TypeScript', 'PostgreSQL', 'Cloudinary', 'Docker', 'GitHub'],
      },
      {
        title: 'Royal Hotel Booking – Appointment Booking Platform',
        description: 'Full-stack platform that allows users to register, log in, and schedule hotel appointments through a modern interface. The system includes real-time validations, JWT authentication, image uploads, and email notifications with SendGrid integration.',
        githubUrl: 'https://github.com/matiasgallardo196/royal-hotel-booking-system',
        demoUrl: 'https://cute-fox-c52c9e.netlify.app/',
        imageUrl: '/project4.jpg',
        techNames: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React', 'Cloudinary'],
      },
      {
        title: 'MatiMovies – Movie Management System',
        description: 'Full-stack application for managing and visualizing a catalog of movies. Includes form-based movie creation, a public catalog, and informational pages about cinema. Developed during full stack development training as a learning project with MongoDB integration.',
        githubUrl: 'https://github.com/matiasgallardo196/mati-movies-management-system',
        demoUrl: 'https://matimovies-movie-management-system-front-production.up.railway.app',
        imageUrl: '/project5.jpg',
        techNames: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
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

    // Create Languages (matching production website)
    const languagesData = [
      { name: 'Spanish', level: 'Mother Tongue' },
      { name: 'English', level: 'C1 Level' },
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

    // Create Achievements (matching production website - simple descriptions)
    const achievementsData = [
      '5 full-stack projects deployed to production with CI/CD',
      'Experience with multi-tenant architecture, Stripe, and OpenAI integrations',
      'Proficient in backend development with NestJS, PostgreSQL, and Docker',
      'Designed and implemented secure REST APIs with role-based access',
      'Hands-on deployment experience with Oracle Cloud, Render, Vercel, Netlify, Railway, Fly',
      'Teaching Assistant at Henry bootcamp, supporting students in JavaScript, TypeScript, React, Node, NestJS',
    ];

    for (const description of achievementsData) {
      const achievement = queryRunner.manager.create(Achievement, {
        userId: user.id,
        description: description,
      });
      await queryRunner.manager.save(achievement);
    }
    console.log(`🏆 ${achievementsData.length} Achievements created`);

    // Create Contact (matching production website)
    const contact = queryRunner.manager.create(Contact, {
      userId: user.id,
      email: 'matiasgallardo196@gmail.com',
      linkedin: 'https://linkedin.com/in/matiasgallardo-dev',
      github: 'https://github.com/matiasgallardo196',
      metaDescription: 'Contact information and social media links for Matias Gallardo',
      pageTitle: "Let's Connect",
      heroTitle: "Let's Connect",
      letsTalkTitle: "Let's Talk!",
      letsTalkDescription: "I'm always interested in new opportunities, interesting collaborations, and challenging projects. Don't hesitate to reach out if you want to work together or just chat about technology.",
      availabilityTitle: 'Availability',
      currentStatusTitle: 'Current Status',
      locationTitle: 'Location & Relocation',
    });
    await queryRunner.manager.save(contact);
    console.log('📧 Contact created');

    // Create Contact Opportunities (matching production website)
    const opportunitiesData = ['Full-time opportunities', 'Freelance projects', 'Open source collaborations'];
    for (const oppName of opportunitiesData) {
      const opportunity = queryRunner.manager.create(ContactOpportunity, {
        contactId: contact.id,
        name: oppName,
      });
      await queryRunner.manager.save(opportunity);
    }
    console.log(`💼 ${opportunitiesData.length} Opportunities created`);

    // Create Contact Location Info (matching production website)
    const locationInfoData = ['Based in Sydney, Australia', 'Open to relocate within Australia', 'Available for remote work'];
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

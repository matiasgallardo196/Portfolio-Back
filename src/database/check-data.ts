import { DataSource } from 'typeorm';
import {
  User,
  About,
  Project,
  Skill,
  Language,
  Achievement,
  Contact,
} from '../shared/entities';
import { DATABASE_URL } from '../config/env.loader';

console.log('DATABASE_URL:', DATABASE_URL ? 'SET' : 'NOT SET');

const dataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [User, About, Project, Skill, Language, Achievement, Contact],
  synchronize: false,
});

async function checkData() {
  try {
    await dataSource.initialize();
    console.log('✅ Database connected');
    
    const userCount = await dataSource.getRepository(User).count();
    console.log('Users count:', userCount);
    
    if (userCount > 0) {
      const user = await dataSource.getRepository(User).findOne({
        where: { isActive: true },
        order: { createdAt: 'ASC' },
      });
      
      if (user) {
        console.log('First active user:', {
          id: user.id,
          email: user.email,
          username: user.username,
          isActive: user.isActive,
        });
        
        const aboutCount = await dataSource.getRepository(About).count({ where: { userId: user.id } });
        const projectCount = await dataSource.getRepository(Project).count({ where: { userId: user.id } });
        const skillCount = await dataSource.getRepository(Skill).count({ where: { userId: user.id } });
        
        console.log('About records:', aboutCount);
        console.log('Projects:', projectCount);
        console.log('Skills:', skillCount);
      }
    } else {
      console.log('❌ No users found in database!');
    }
    
    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkData();

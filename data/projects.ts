import { Project } from "./types";

export const projectsPageDescription =
  "Here you can see some of the most outstanding projects I've worked on. Each one represents different aspects of my experience in full stack development, from multi-tenant platforms to AI integrations and e-commerce solutions.";

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "SmartQR – QR Order Platform for Restaurants",
    description:
      "Multi-tenant platform for restaurants where customers scan a QR code on their table to order without waitstaff. Each restaurant has its own dashboard with reports, product management, and billing. Led the development of the entire reports module and integrated Stripe payment system and OpenAI-powered chatbot.",
    technologies: [
      { id: "tech-nestjs-1", name: "NestJS" },
      { id: "tech-postgresql-1", name: "PostgreSQL" },
      { id: "tech-mongodb-1", name: "MongoDB" },
      { id: "tech-stripe-1", name: "Stripe" },
      { id: "tech-auth0-1", name: "Auth0" },
      { id: "tech-jwt-1", name: "JWT" },
      { id: "tech-docker-1", name: "Docker" },
      { id: "tech-recharts-1", name: "Recharts" },
      { id: "tech-react-1", name: "React" },
      { id: "tech-vercel-1", name: "Vercel" },
      { id: "tech-render-1", name: "Render" },
      { id: "tech-supabase-1", name: "Supabase" },
      { id: "tech-nodemailer-1", name: "Nodemailer" },
      { id: "tech-cloudinary-1", name: "Cloudinary" },
      { id: "tech-openai-1", name: "OpenAI" },
    ],
    githubUrl: "https://github.com/SmartQrProject/SmartQrProject",
    demoUrl: "https://www.smart-qr.tech/",
    imageUrl: "/project1.jpg",
  },
  {
    id: "project-2",
    title: "AI Agent – Conversational Assistant for Web & WhatsApp",
    description:
      "Conversational assistant designed for a technical challenge by Laburen.com. The system detects user intents (e.g., product search, cart creation) and responds via WhatsApp or a web interface. Features modular architecture and full backend implementation from scratch with Twilio integration.",
    technologies: [
      { id: "tech-nestjs-2", name: "NestJS" },
      { id: "tech-typescript-1", name: "TypeScript" },
      { id: "tech-postgresql-2", name: "PostgreSQL" },
      { id: "tech-prisma-1", name: "Prisma" },
      { id: "tech-supabase-2", name: "Supabase" },
      { id: "tech-pgvector-1", name: "pgvector" },
      { id: "tech-openai-2", name: "OpenAI" },
      { id: "tech-twilio-1", name: "Twilio" },
      { id: "tech-nextjs-1", name: "Next.js" },
      { id: "tech-react-2", name: "React 19" },
      { id: "tech-tailwindcss-1", name: "TailwindCSS" },
      { id: "tech-render-2", name: "Render" },
      { id: "tech-vercel-2", name: "Vercel" },
    ],
    githubUrl: "https://github.com/matiasgallardo196/AI-agent",
    demoUrl: "https://desafio-tecnico-cse-laburen-com.vercel.app/",
    imageUrl: "/project2.jpg",
  },
  {
    id: "project-3",
    title: "E-Commerce API – Backend for Online Store",
    description:
      "RESTful API built with NestJS to support a complete e-commerce system. Includes user authentication with roles, comprehensive CRUD operations for products and user management, image uploads with Cloudinary, and order creation with purchase details. Deployed with CI/CD pipeline.",
    technologies: [
      { id: "tech-nestjs-3", name: "NestJS" },
      { id: "tech-typescript-2", name: "TypeScript" },
      { id: "tech-postgresql-3", name: "PostgreSQL" },
      { id: "tech-typeorm-1", name: "TypeORM" },
      { id: "tech-jwt-2", name: "JWT" },
      { id: "tech-bcryptjs-1", name: "bcryptjs" },
      { id: "tech-cloudinary-2", name: "Cloudinary" },
      { id: "tech-swagger-1", name: "Swagger" },
      { id: "tech-docker-2", name: "Docker" },
      { id: "tech-github-actions-1", name: "GitHub Actions" },
      { id: "tech-fly-io-1", name: "Fly.io" },
      { id: "tech-neon-1", name: "Neon" },
    ],
    githubUrl: "https://github.com/matiasgallardo196/ecommerce-api-nestjs",
    demoUrl: "https://ecommerce-api-nestjs.fly.dev/api",
    imageUrl: "/project3.jpg",
  },
  {
    id: "project-4",
    title: "Royal Hotel Booking – Appointment Booking Platform",
    description:
      "Full-stack platform that allows users to register, log in, and schedule hotel appointments through a modern interface. The system includes real-time validations, JWT authentication, image uploads, and email notifications with SendGrid integration.",
    technologies: [
      { id: "tech-nodejs-1", name: "Node.js" },
      { id: "tech-typescript-3", name: "TypeScript" },
      { id: "tech-express-1", name: "Express" },
      { id: "tech-postgresql-4", name: "PostgreSQL" },
      { id: "tech-typeorm-2", name: "TypeORM" },
      { id: "tech-jwt-3", name: "JWT" },
      { id: "tech-bcryptjs-2", name: "bcryptjs" },
      { id: "tech-react-3", name: "React 19" },
      { id: "tech-vite-1", name: "Vite" },
      { id: "tech-axios-1", name: "Axios" },
      { id: "tech-css-modules-1", name: "CSS Modules" },
      { id: "tech-formik-1", name: "Formik" },
      { id: "tech-cloudinary-3", name: "Cloudinary" },
      { id: "tech-sendgrid-1", name: "SendGrid" },
      { id: "tech-netlify-1", name: "Netlify" },
      { id: "tech-railway-1", name: "Railway" },
    ],
    githubUrl:
      "https://github.com/matiasgallardo196/royal-hotel-booking-system",
    demoUrl: "https://cute-fox-c52c9e.netlify.app/",
    imageUrl: "/project4.jpg",
  },
  {
    id: "project-5",
    title: "MatiMovies – Movie Management System",
    description:
      "Full-stack application for managing and visualizing a catalog of movies. Includes form-based movie creation, a public catalog, and informational pages about cinema. Developed during full stack development training as a learning project with MongoDB integration.",
    technologies: [
      { id: "tech-nodejs-2", name: "Node.js" },
      { id: "tech-express-2", name: "Express.js" },
      { id: "tech-mongodb-2", name: "MongoDB" },
      { id: "tech-mongoose-1", name: "Mongoose" },
      { id: "tech-html5-1", name: "HTML5" },
      { id: "tech-css3-1", name: "CSS3" },
      { id: "tech-javascript-1", name: "JavaScript (ES6+)" },
      { id: "tech-jquery-1", name: "jQuery" },
      { id: "tech-bootstrap-1", name: "Bootstrap 4" },
      { id: "tech-axios-2", name: "Axios" },
      { id: "tech-webpack-1", name: "Webpack" },
      { id: "tech-dotenv-webpack-1", name: "dotenv-webpack" },
      { id: "tech-railway-2", name: "Railway" },
      { id: "tech-mongodb-atlas-1", name: "MongoDB Atlas" },
    ],
    githubUrl:
      "https://github.com/matiasgallardo196/mati-movies-management-system",
    demoUrl:
      "https://matimovies-movie-management-system-front-production.up.railway.app",
    imageUrl: "/project5.jpg",
  },
];

export const projectsCallToAction = {
  title: "Ready to Start Something Amazing?",
  description:
    "I'm always excited to work on new projects and collaborate with amazing teams. Whether you have a specific project in mind or just want to explore possibilities, let's create something incredible together.",
  buttonText: "Let's Work Together",
};

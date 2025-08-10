const axios = require("axios");

const BASE_URL = "http://localhost:3001";
const USER_ID = "fa8adc3f-ce82-42a8-a57a-9ca2c4805ee4";

// Body CORRECTO - solo los campos permitidos en UpdateAboutDto
const correctBody = {
  fullName: "Matias Gallardo12",
  location: "Sydney, Australia",
  biography:
    "I'm a Full Stack Web Developer with a strong Back-End orientation, passionate about building scalable systems and delivering real-world solutions with measurable impact. I graduated from Henry's intensive bootcamp and hold a Technical Analyst degree in Information Systems from UTN FRT.\n\nI specialize in modern technologies and follow best practices in validation, testing, and secure access control through RESTful APIs. My experience includes multi-tenant platforms, Stripe integrations, GitHub Actions, and cloud deployment across various platforms.\n\nI'm passionate about clean architecture, automation, and creating solutions that make a real difference. When I'm not coding, I enjoy contributing to the developer community and staying updated with the latest technologies.",
  pageDescription:
    "Learn more about Matias Gallardo's experience and skills in full stack development",
  metaDescription:
    "Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia.",
  heroTitle: "Full Stack Web Developer",
  heroSubtitle: "Back-End Oriented",
  avatarUrl: "/avatar.jpg",
  relocationStatus: "Open to relocate",
  ctaButtons: {
    projects: "Checkout My Work",
    contact: "Contact Me",
  },
  stats: {
    projects: {
      title: "Projects",
      subtitle: "Completed",
    },
    technologies: {
      title: "Technologies",
      subtitle: "Mastered",
    },
    languages: {
      title: "Languages",
      subtitle: "Spoken",
    },
  },
};

async function testCorrectBody() {
  console.log("🧪 Probando con el body CORRECTO...");
  console.log(
    "📤 Enviando PUT request a:",
    `${BASE_URL}/portfolio/${USER_ID}/about`
  );
  console.log("📦 Body correcto:", JSON.stringify(correctBody, null, 2));

  try {
    const response = await axios.put(
      `${BASE_URL}/portfolio/${USER_ID}/about`,
      correctBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Respuesta exitosa:", response.status);
    console.log("📥 Datos recibidos:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log("❌ Error en la petición:");
    console.log("   Status:", error.response?.status);
    console.log("   Status Text:", error.response?.statusText);
    console.log("   Error Message:", error.response?.data);
  }
}

// Ejecutar la prueba
testCorrectBody();

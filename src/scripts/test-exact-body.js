const axios = require("axios");

const BASE_URL = "http://localhost:3001";

// Exactamente el mismo body que el usuario está enviando
const testBody = {
  avatarUrl: "/avatar.jpg",
  biography:
    "I'm a Full Stack Web Developer with a strong Back-End orientation, passionate about building scalable systems and delivering real-world solutions with measurable impact. I graduated from Henry's intensive bootcamp and hold a Technical Analyst degree in Information Systems from UTN FRT.\n\nI specialize in modern technologies and follow best practices in validation, testing, and secure access control through RESTful APIs. My experience includes multi-tenant platforms, Stripe integrations, GitHub Actions, and cloud deployment across various platforms.\n\nI'm passionate about clean architecture, automation, and creating solutions that make a real difference. When I'm not coding, I enjoy contributing to the developer community and staying updated with the latest technologies.",
  createdAt: "2025-08-07T01:10:29.164Z",
  ctaButtons: {
    projects: "Checkout My Work",
    contact: "Contact Me",
  },
  fullName: "Matias Gallardo12",
  heroSubtitle: "Back-End Oriented",
  heroTitle: "Full Stack Web Developer",
  id: "c0408039-d02e-4fa0-8012-8439bbb7d0fb",
  location: "Sydney, Australia",
  metaDescription:
    "Full Stack Web Developer with strong Back-End orientation. Specialized in NestJS, TypeScript, PostgreSQL, and scalable systems. Based in Sydney, Australia.",
  pageDescription:
    "Learn more about Matias Gallardo's experience and skills in full stack development",
  relocationStatus: "Open to relocate",
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
  updatedAt: "2025-08-07T01:10:29.164Z",
  userId: "fa8adc3f-ce82-42a8-a57a-9ca2c4805ee4",
};

async function testExactBody() {
  console.log("🧪 Probando con el body exacto del usuario...");
  console.log(
    "📤 Enviando PUT request a:",
    `${BASE_URL}/portfolio/${testBody.userId}/about`
  );
  console.log("📦 Body completo:", JSON.stringify(testBody, null, 2));

  try {
    const response = await axios.put(
      `${BASE_URL}/portfolio/${testBody.userId}/about`,
      testBody,
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
    console.log("   Headers:", error.response?.headers);
  }
}

// Ejecutar la prueba
testExactBody();

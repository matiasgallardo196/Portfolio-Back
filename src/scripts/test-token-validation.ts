import axios from "axios";

const BASE_URL = "http://localhost:3001";

async function testTokenValidation() {
  console.log("🧪 Probando endpoint de validación de tokens...\n");

  // 1. Probar sin token (debería devolver 400)
  console.log("1️⃣ Probando sin token:");
  try {
    const response = await axios.get(`${BASE_URL}/auth/validate`);
    console.log("❌ Error: Debería haber fallado");
  } catch (error) {
    if (error.response?.status === 400) {
      console.log("✅ Correcto: 400 Bad Request");
      console.log("Respuesta:", error.response.data);
    } else {
      console.log("❌ Error inesperado:", error.response?.status);
    }
  }

  // 2. Probar con token inválido
  console.log("\n2️⃣ Probando con token inválido:");
  try {
    const response = await axios.get(`${BASE_URL}/auth/validate`, {
      headers: {
        Authorization: "Bearer invalid_token_here",
      },
    });
    console.log("❌ Error: Debería haber fallado");
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("✅ Correcto: 401 Unauthorized");
      console.log("Respuesta:", error.response.data);
    } else {
      console.log("❌ Error inesperado:", error.response?.status);
    }
  }

  // 3. Probar con token expirado
  console.log("\n3️⃣ Probando con token expirado:");
  const expiredToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  try {
    const response = await axios.get(`${BASE_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${expiredToken}`,
      },
    });
    console.log("❌ Error: Debería haber fallado");
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("✅ Correcto: 401 Unauthorized");
      console.log("Respuesta:", error.response.data);
    } else {
      console.log("❌ Error inesperado:", error.response?.status);
    }
  }

  // 4. Probar con token válido (necesitamos hacer login primero)
  console.log("\n4️⃣ Probando con token válido:");
  try {
    // Primero hacer login para obtener un token válido
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "test@example.com",
      password: "password123",
    });

    const validToken = loginResponse.data.token;
    console.log("Token obtenido:", validToken.substring(0, 20) + "...");

    // Ahora validar el token
    const validationResponse = await axios.get(`${BASE_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
    });

    console.log("✅ Correcto: 200 OK");
    console.log("Respuesta:", validationResponse.data);
  } catch (error) {
    console.log(
      "❌ Error al probar token válido:",
      error.response?.data || error.message
    );
  }

  console.log("\n🎉 Pruebas completadas!");
}

// Ejecutar las pruebas
testTokenValidation().catch(console.error);

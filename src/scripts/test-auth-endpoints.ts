import axios from "axios";

const BASE_URL = "http://localhost:3001";

async function testAuthEndpoints() {
  console.log("🧪 Probando endpoints de autenticación...\n");

  try {
    // 1. Probar registro
    console.log("1️⃣ Probando registro de usuario...");
    const registerData = {
      email: "test@ejemplo.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const registerResponse = await axios.post(
      `${BASE_URL}/auth/register`,
      registerData
    );
    console.log("✅ Registro exitoso:", registerResponse.data.message);
    console.log("👤 Usuario creado:", registerResponse.data.user.email);

    // 2. Probar login
    console.log("\n2️⃣ Probando login...");
    const loginData = {
      email: "test@ejemplo.com",
      password: "password123",
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log("✅ Login exitoso");
    console.log(
      "🔑 Token recibido:",
      loginResponse.data.token.substring(0, 50) + "..."
    );

    const token = loginResponse.data.token;

    // 3. Probar endpoint protegido (dashboard)
    console.log("\n3️⃣ Probando endpoint protegido (dashboard)...");
    const dashboardResponse = await axios.get(`${BASE_URL}/auth/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Dashboard accedido exitosamente");
    console.log("📊 Datos del dashboard:", dashboardResponse.data.dashboard);

    // 4. Probar endpoint de perfil
    console.log("\n4️⃣ Probando endpoint de perfil...");
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Perfil obtenido exitosamente");
    console.log("👤 Datos del perfil:", profileResponse.data.user);

    // 5. Probar acceso sin token (debe fallar)
    console.log("\n5️⃣ Probando acceso sin token (debe fallar)...");
    try {
      await axios.get(`${BASE_URL}/auth/dashboard`);
      console.log("❌ Error: Debería haber fallado");
    } catch (error) {
      console.log("✅ Correcto: Acceso denegado sin token");
    }

    // 6. Probar login con credenciales incorrectas
    console.log("\n6️⃣ Probando login con credenciales incorrectas...");
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: "test@ejemplo.com",
        password: "passwordincorrecto",
      });
      console.log("❌ Error: Debería haber fallado");
    } catch (error) {
      console.log("✅ Correcto: Login falló con credenciales incorrectas");
    }

    console.log("\n🎉 Todas las pruebas completadas exitosamente!");
  } catch (error) {
    console.error(
      "❌ Error durante las pruebas:",
      error.response?.data || error.message
    );
  }
}

// Ejecutar las pruebas
testAuthEndpoints();

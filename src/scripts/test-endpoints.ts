import axios from "axios";

async function testEndpoints() {
  const baseUrl = "http://localhost:3001";
  const userIds = [
    "5d849759-5b8b-4d6e-aa64-e4ed8bee8930", // Backend Developer
    "853d9702-1800-4392-a00a-74ac54defd69", // Frontend Developer
    "961c60d6-068c-40f8-9d5f-16a662c82963", // Data Scientist
    "bbb735cf-ef78-47ac-a234-61f88e97925b", // DevOps Engineer
  ];

  console.log("🧪 Probando endpoints de portfolio...\n");

  for (const userId of userIds) {
    try {
      console.log(`📋 Probando usuario: ${userId}`);
      console.log("=".repeat(50));

      const response = await axios.get(`${baseUrl}/portfolio/${userId}`);

      if (response.status === 200) {
        const data = response.data;

        console.log("✅ Endpoint funcionando correctamente");
        console.log(`   Nombre: ${data.about?.fullName || "No disponible"}`);
        console.log(`   Ubicación: ${data.about?.location || "No disponible"}`);
        console.log(
          `   Skills: ${Object.values(data.skills || {}).flat().length} skills encontrados`
        );
        console.log(`   Proyectos: ${data.projects?.length || 0} proyectos`);
        console.log(`   Logros: ${data.achievements?.length || 0} logros`);
        console.log(`   Idiomas: ${data.languages?.length || 0} idiomas`);
        console.log(
          `   Contacto: ${data.contact ? "Disponible" : "No disponible"}`
        );

        // Verificar que todos los datos estén presentes
        const hasAllData =
          data.about &&
          data.skills &&
          data.projects &&
          data.achievements &&
          data.languages &&
          data.contact;

        if (hasAllData) {
          console.log("🎉 ✅ Usuario completo - Todos los datos disponibles");
        } else {
          console.log("⚠️  ⚠️  Usuario incompleto - Faltan algunos datos");
        }
      } else {
        console.log(`❌ Error: Status ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`❌ Error de conexión: ${error.message}`);
        if (error.response) {
          console.log(`   Status: ${error.response.status}`);
          console.log(
            `   Mensaje: ${error.response.data?.message || "Sin mensaje"}`
          );
        }
      } else {
        console.log(`❌ Error inesperado: ${error}`);
      }
    }

    console.log("\n" + "=".repeat(50));
  }

  console.log("\n🎯 Resumen de pruebas:");
  console.log("🔗 Endpoints disponibles para testing:");
  userIds.forEach((userId) => {
    console.log(`   GET ${baseUrl}/portfolio/${userId}`);
  });

  console.log("\n📝 Para probar en el navegador:");
  userIds.forEach((userId) => {
    console.log(`   ${baseUrl}/portfolio/${userId}`);
  });
}

testEndpoints().catch(console.error);

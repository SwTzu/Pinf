const express = require("express");
const cors = require("cors");
const db = require("./app/models/index.js");
const app = express();
const values = require('./app/config/const.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función para conectar a la base de datos con reintentos infinitos
async function connectToDatabase() {
  let attempt = 0;
  
  while (true) {
    attempt++;
    try {
      await db.sequelize.authenticate();
      console.log("✅ Conexión a la base de datos establecida correctamente.");
      
      // Sincronizar modelos después de conectar
      await db.sequelize.sync({ alter: true });
      console.log("🔄 Actualización de base de datos lista.");
      return;
    } catch (error) {
      console.error(`❌ Error al conectar a la base de datos (Intento ${attempt}):`, error.message);
      
      // Esperar 5 segundos antes del próximo intento
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Iniciar conexión a la base de datos
connectToDatabase().then(() => {
  // Configurar rutas solo después de conectar a la base de datos
  app.get("/", (req, res) => {
    res.json({ message: "Aplicación funcionando." });
  });

  // Importación de Router principal
  require('./app/routes/main.router')(app);

  const PORT = values.RUN_PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}.`);
  });
}).catch(error => {
  console.error("💀 Error crítico inesperado:", error);
  process.exit(1);
});
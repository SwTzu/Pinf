const db = require('../models/index.js'); // Ajusta si tu ruta base es distinta
const bcrypt = require('bcrypt');

async function migrarPasswords() {
  try {
    const usuarios = await db.usuario.findAll();

    for (const usuario of usuarios) {
      const original = usuario.password;

      // Salt y hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(original, salt);

      // Actualiza y guarda
      usuario.password = hashedPassword;
      await usuario.save();

      console.log(`✅ Contraseña hasheada para usuario: ${usuario.rut}`);
    }

    console.log("🎉 Todas las contraseñas han sido migradas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
    process.exit(1);
  }
}

migrarPasswords();

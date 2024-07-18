import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class Usuario {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  // Método para registrar un nuevo usuario
  async registrar() {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(this.password, 10);

    try {
      const nuevoUsuario = await prisma.user.create({
        data: {
          email: this.email,
          password: hashedPassword,
        },
      });
      return nuevoUsuario;
    } catch (error) {
      throw new Error('El usuario ingresado ya existe');
    }
  }

  // Método para iniciar sesión
  static async iniciarSesion(email, password) {

    try {
      const usuario = await prisma.user.findUnique({ where: { email } });
      if (usuario && await bcrypt.compare(password, usuario.password)) {
        return usuario;
      } else {
        throw new Error('Correo o contraseña incorrectos');
      }
    } catch (error) {
      throw new Error('Error interno del servidor');
    }
  }
}

export default Usuario;
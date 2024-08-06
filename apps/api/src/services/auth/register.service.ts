import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (body: User) => {
  //parameter body itu dari prisma, jadi apa yang kita butuhkan gitu buat register akun
  try {
    const { name, email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('email already exist');
    }

    const hashedPassword = await hashPassword(password!);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return newUser;
    
  } catch (error) {
    throw error;
  }
};

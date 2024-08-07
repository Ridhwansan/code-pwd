import { JWT_SECRET } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

//service ini adalah logicnya

// untuk bikin login service kita butuh parameter body yang isinya email dan password
export const loginService = async (body: Pick<User, 'email' | 'password'>) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      //kita akan cari email dan provider yang credentialsnya dari google (login by google)
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const isPasswordValid = await comparePassword(password!, user.password!);

    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    //ini adalah sintaks untuk mengeluarkan password dari user, dia akan masuk ke variable baru namanya userWithoutPassword
    const { password: pass, ...userWithoutPassword } = user;

    //seluruh isi user dan tokennya akan dikirim (return)
    //isi userWithoutPassword ditambah token (token dimasukan ke var userWithoutPassword)
    return { ...userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};

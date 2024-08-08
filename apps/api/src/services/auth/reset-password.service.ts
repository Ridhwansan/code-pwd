//untuk reset password kita butuh userId dan password yang mau di reset

import { hashPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { hash } from 'bcrypt';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
    //karna di front end kita nerima datanya cuma password
    //makanya agar tau ini punyanya siapa, kita pakai token, pertama create dulu tokennya

    const user = await prisma.user.findFirst({
      where: { id: userId, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Reset password success',
    };
  } catch (error) {
    throw error;
  }
};

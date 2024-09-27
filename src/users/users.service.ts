import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getMyUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new BadRequestException('No user with that Id.')
        }

        return { user };
 
    }

    async getUsers() {
        return await this.prisma.user.findMany({ select: { id: true, email: true }});
    }
}

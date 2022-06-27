import { Controller, Get, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver('test')
export class TestController {
    constructor(private prisma: PrismaService) {}

    @Query(() => String)
    @UseGuards(AuthorizationGuard)
    hello() {
        return 'this.prisma.customer.findMany()';
    }
}

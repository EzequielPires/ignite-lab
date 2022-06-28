import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreateCurseParams {
    title: string;
}

@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService
    ) {}

    listAllCourses() {
        return this.prisma.course.findMany();
    }

    getCourseById(id: string) {
        return this.prisma.course.findUnique({
            where: {
                id
            }
        })
    }

    async createCurse({title}: CreateCurseParams) {
        const slug = slugify(title, {lower: true});

        const courseAlreadExists = await this.prisma.course.findUnique({
            where: {
                slug
            }
        })
        
        if(courseAlreadExists) {
            throw new Error("Course already exists");
        }

        return this.prisma.course.create({
            data: {
                title,
                slug
            }
        });
    }
}
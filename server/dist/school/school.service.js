"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchoolService = class SchoolService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerSchools(data) {
        const registerSchool = await this.prisma.school.create({
            data,
        });
        return {
            message: `School-ka "${registerSchool.name}" waa la abuuray`,
            id: registerSchool.id,
            school: registerSchool.name,
            created: registerSchool.createdAtd,
        };
    }
    async updateSchool(id, newName) {
        const school = await this.prisma.school.findUnique({
            where: { id },
        });
        if (!school) {
            throw new common_1.NotFoundException('xogta lama helin');
        }
        if (!newName) {
            throw new common_1.BadRequestException('Magaca cusub waa lama huraan');
        }
        const updatedSchool = await this.prisma.school.update({
            where: { id },
            data: { name: newName },
        });
        return {
            message: 'Xogta waa la cusboonaysiiyay',
            new_name: updatedSchool.name,
        };
    }
    async readSchoolData() {
        const schoolData = await this.prisma.school.findMany();
        if (!schoolData) {
            throw new common_1.NotFoundException('Xog maad diwaangalin');
        }
        return schoolData;
    }
    async deletedSchool(id) {
        try {
            const existingSchool = await this.prisma.school.findUnique({
                where: { id: id },
            });
            if (!existingSchool) {
                throw new common_1.NotFoundException('Xog hore ayaa loo tirtiray');
            }
            return this.prisma.school.delete({
                where: { id: id },
            });
        }
        catch (error) {
            return {
                message: `Interal error ${error}`,
            };
        }
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchoolService);
//# sourceMappingURL=school.service.js.map
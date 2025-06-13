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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_admin_service_1 = require("./auth-admin.service");
let AuthAdminController = class AuthAdminController {
    authAdmin;
    constructor(authAdmin) {
        this.authAdmin = authAdmin;
    }
    async registerAdmin(body) {
        return this.authAdmin.registerAdmin(body.name, body.email, body.password, body.schoolId);
    }
    login(body) {
        return this.authAdmin.login(body.password, body.email);
    }
    findAll() {
        return this.authAdmin.findAllAdmins();
    }
    remove(id) {
        return this.authAdmin.removeAdmin(id);
    }
};
exports.AuthAdminController = AuthAdminController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthAdminController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('admin-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthAdminController.prototype, "remove", null);
exports.AuthAdminController = AuthAdminController = __decorate([
    (0, common_1.Controller)('auth-admin'),
    __metadata("design:paramtypes", [auth_admin_service_1.AuthAdminService])
], AuthAdminController);
//# sourceMappingURL=auth-admin.controller.js.map
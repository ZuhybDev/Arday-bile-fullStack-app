"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const compression = require("compression");
const express_rate_limit_1 = require("express-rate-limit");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Arday-bile')
        .setDescription('API DOCS')
        .setVersion('0.1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use(cookieParser());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 100,
    }));
    const PORT = configService.get('PORT');
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
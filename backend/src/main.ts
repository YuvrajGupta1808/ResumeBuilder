import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);

        // Enable CORS
        const corsOrigins = process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
            : ['http://localhost:3000'];

        app.enableCors({
            origin: corsOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        });

        // Global validation pipe
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            })
        );

        // Swagger documentation
        const config = new DocumentBuilder()
            .setTitle('Resume Builder API')
            .setDescription(
                'API for AI-powered resume building and job application assistance'
            )
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document);

        // Global prefix
        app.setGlobalPrefix('api/v1');

        const port = process.env.PORT || 3001;
        await app.listen(port, '0.0.0.0');

        console.log(`🚀 Application is running on: http://0.0.0.0:${port}`);
        console.log(`📚 Swagger documentation: http://0.0.0.0:${port}/api/docs`);
    } catch (error) {
        console.error('❌ Failed to start application:', error);
        process.exit(1);
    }
}

bootstrap();

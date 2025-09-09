import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    async login(@Body() loginDto: { email: string }) {
        const user = await this.authService.validateUser(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    async register(@Body() createUserDto: CreateUserDto) {
        // Check if user already exists
        const existingUser = await this.userService.findByEmail(createUserDto.email);
        if (existingUser) {
            // If user exists, just log them in (for OAuth flow)
            return this.authService.login(existingUser);
        }

        // Create new user
        const newUser = await this.userService.create(createUserDto);
        return this.authService.login(newUser);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    getProfile(@Request() req) {
        return req.user;
    }
}

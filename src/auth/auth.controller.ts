import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { User } from './auth.entity';


@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiAcceptedResponse({
    description: 'Created User object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot be created. Try again!',
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.singup(dto);
  }

  @Post('signin')
  @ApiAcceptedResponse({
    description: 'Successfully signed in and generated jwt token for user.',
  })
  @ApiBadRequestResponse({
    description: 'Sign in failed! Check credentials provided.',
  })
  signin(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.singin(dto, req, res);
  }

  @Get('signout')
  @ApiAcceptedResponse({
    description: 'Successfully cleared token from cookies and signed user out',
  })
  signout(@Req() req, @Res() res) {
    return this.authService.singout(req, res);
  }
}

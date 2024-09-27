import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/auth.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiAcceptedResponse({
    description: 'Found user with specified ID',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Cannot find user with specified ID',
  })
  getMyUser(@Param('id') id: number) {  
    return this.usersService.getMyUser(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiAcceptedResponse({
    description: 'Returned all users successfully.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Not signed in! Cannot get all users.',
  })
  getUsers() {
    return this.usersService.getUsers();
  }
}

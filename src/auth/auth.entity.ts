import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { ApiProperty } from '@nestjs/swagger';

  @Entity({ name: 'users' })
  export class User extends BaseEntity {
    @ApiProperty({ description: 'Primary key as User ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@gmail.com',
    })
    @Column({
        unique: true,
    })
    email: string;

    @ApiProperty({ description: 'Hashed User password' })
    @Column()
    hashedpassword: string;

    @ApiProperty({ description: 'When User was created' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'When User was last updated' })
    @UpdateDateColumn()
    updatedAt: Date;
  }
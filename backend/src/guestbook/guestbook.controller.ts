import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  // GET /guestbook — fetch all messages
  @Get()
  async findAll() {
    const data = await this.guestbookService.findAll();
    return {
      success: true,
      count: data.length,
      data,
    };
  }

  // POST /guestbook — create new message
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateGuestbookDto) {
    const entry = await this.guestbookService.create(dto);
    return {
      success: true,
      message: 'Guestbook entry created successfully!',
      data: entry,
    };
  }
}
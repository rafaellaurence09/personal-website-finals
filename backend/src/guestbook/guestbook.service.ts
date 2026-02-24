import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';

@Injectable()
export class GuestbookService implements OnModuleInit {
  private supabase: SupabaseClient;

  onModuleInit() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) {
      throw new Error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
    }

    this.supabase = createClient(url, key);
    console.log('✅ Supabase client initialized');
  }

  // GET all guestbook entries — sorted newest first
  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        'Failed to fetch guestbook entries: ' + error.message,
      );
    }

    return data || [];
  }

  // POST a new guestbook entry
  async create(dto: CreateGuestbookDto) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name: dto.name.trim(), message: dto.message.trim() }])
      .select('id, name, message, created_at')
      .single();

    if (error) {
      throw new InternalServerErrorException(
        'Failed to create guestbook entry: ' + error.message,
      );
    }

    return data;
  }
}
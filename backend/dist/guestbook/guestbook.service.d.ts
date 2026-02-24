import { OnModuleInit } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
export declare class GuestbookService implements OnModuleInit {
    private supabase;
    onModuleInit(): void;
    findAll(): Promise<{
        id: any;
        name: any;
        message: any;
        created_at: any;
    }[]>;
    create(dto: CreateGuestbookDto): Promise<{
        id: any;
        name: any;
        message: any;
        created_at: any;
    }>;
}

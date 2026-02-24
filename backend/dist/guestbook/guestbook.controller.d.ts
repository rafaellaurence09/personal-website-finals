import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
export declare class GuestbookController {
    private readonly guestbookService;
    constructor(guestbookService: GuestbookService);
    findAll(): Promise<{
        success: boolean;
        count: number;
        data: {
            id: any;
            name: any;
            message: any;
            created_at: any;
        }[];
    }>;
    create(dto: CreateGuestbookDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: any;
            name: any;
            message: any;
            created_at: any;
        };
    }>;
}

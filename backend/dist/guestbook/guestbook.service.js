"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestbookService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let GuestbookService = class GuestbookService {
    onModuleInit() {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;
        if (!url || !key) {
            throw new Error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
        }
        this.supabase = (0, supabase_js_1.createClient)(url, key);
        console.log('✅ Supabase client initialized');
    }
    async findAll() {
        const { data, error } = await this.supabase
            .from('guestbook')
            .select('id, name, message, created_at')
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch guestbook entries: ' + error.message);
        }
        return data || [];
    }
    async create(dto) {
        const { data, error } = await this.supabase
            .from('guestbook')
            .insert([{ name: dto.name.trim(), message: dto.message.trim() }])
            .select('id, name, message, created_at')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException('Failed to create guestbook entry: ' + error.message);
        }
        return data;
    }
};
exports.GuestbookService = GuestbookService;
exports.GuestbookService = GuestbookService = __decorate([
    (0, common_1.Injectable)()
], GuestbookService);
//# sourceMappingURL=guestbook.service.js.map
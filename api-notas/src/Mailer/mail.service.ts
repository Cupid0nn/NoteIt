import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService 
    ) {}
    
    sendMail() {
        return "xd";
    }
}
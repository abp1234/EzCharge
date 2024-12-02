import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";
import { Twillo_Repository } from "../openapi/twillo.repository";
import { GmailEmailRepository } from "../openapi/gmail_email.repository";
import { NotificationService } from "../notification/notification.service";

import { TwilloModule } from "../openapi/twillo.module";
import { GmailEmailModule } from "../openapi/gmail-email.module";
import { UsersController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        forwardRef(() => TwilloModule),
        forwardRef(() => GmailEmailModule),
    ],
    providers:[
        UserService,
        UserRepository,
        Twillo_Repository,
        GmailEmailRepository,
        NotificationService],
    exports:[UserService],
    controllers:[UsersController],
})
export class UserModule{}
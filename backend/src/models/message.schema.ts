import * as mongoose from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../models/user.schema";

export type MessageDocument = Message & Document;

@Schema()

export class Message {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    sendBy : User;
    @Prop([{type:{iv: String, encryptedData: String}}])
    msgContent : [{
        iv : string,
        encryptedData : string
    }];
    @Prop({default: Date.now() })
    sendDate: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)
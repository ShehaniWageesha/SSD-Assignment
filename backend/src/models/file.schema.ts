import * as mongoose from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../models/user.schema";

export type FileDocument = File & Document;

@Schema()

export class File {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User"})
    uploadedBy : User;
    @Prop({required:true})
    fileName : string;
    @Prop({required:true})
    file : string;
    @Prop({default: Date.now() })
    uploadDate: Date
}

export const FileSchema = SchemaFactory.createForClass(File)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()

export class User {
    @Prop({required:true})
    userName : string;
    @Prop({required:true, unique:true})
    userEmail : string;
    @Prop({required:true})
    userBirthday : string;
    @Prop({required:true})
    userGender : string;
    @Prop({required:true})
    password : string;
    @Prop({required:true})
    userPhone : string;
    @Prop({required:true})
    userAddress : string;
    @Prop({required:true})
    userType : string;
    @Prop({default: Date.now() })
    createdDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
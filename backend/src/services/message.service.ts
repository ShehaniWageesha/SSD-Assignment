import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "src/models/message.schema";
import * as crypto from 'crypto';

//Creating Crypto cypher methods to encypt and decrypt data
const algorithm = 'aes-256-cbc';
const secret_key = 'fd85b494-aaaa';
const secret_iv = 'sliitssd';
const key = crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
const iv = crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);

//Encrypt method
//creating a cipher using secret key, iv, and text
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv, encryptedData: encrypted.toString('hex') };
   }

//Decrypt method
function decrypt(text : any) {
    console.log(text?.iv)
    let iv = Buffer.from(text?.iv);
    let encryptedText = Buffer.from(text?.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>,){}

    //Saving Message  
    async sendMessage(message: Message) : Promise<Message> {
        const encryptedMsg = encrypt(message.msgContent);
        const reqBody = {
            sendBy : message.sendBy,
            msgContent : {iv: encryptedMsg.iv, encryptedData: encryptedMsg.encryptedData },
            sendDate : message.sendDate
        }
        const newMessage = new this.messageModel(reqBody);
        return newMessage.save();
    }

    //Retrieving all messages of the user (specific user)
    async getAllMassagesForUser(userId : string){
        const foundMessages = await this.messageModel.find({sendBy: userId}).exec();
        const decryptedMsgsFinal = [];
        foundMessages.forEach(function(message){
            console.log(message.msgContent[0].iv);
            const decryptedMsg = decrypt(message.msgContent[0]);
            console.log(decryptedMsg);
            const decryptedMsgData = {
                id : message._id,
                sendBy : message.sendBy,
                msgContent : decryptedMsg,
                sendDate : message.sendDate,
            }
            decryptedMsgsFinal.push(decryptedMsgData);
        })
        return decryptedMsgsFinal;
    }

    //Update Message
    async updateMessage(id : any, message: Message): Promise<Message> {
        return await this.messageModel.findByIdAndUpdate(id, message, { new: true })
    }

    //Delete Message
    async deleteMessage(id : any): Promise<Message> {
        return await this.messageModel.findByIdAndRemove(id);
    }

}
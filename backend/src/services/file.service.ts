import { Injectable, NotFoundException,ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File, FileDocument } from "src/models/file.schema";
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
    constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>){}

    //Upload files Function
    async uploadFile(file: Object): Promise<File> {
        const newFile = new this.fileModel(file);
        return newFile.save();
    }

    //Get Files for user
    async getAllFiles(userId : string){
        const foundFile = await this.fileModel.find({uploadedBy: userId}).exec();
        return foundFile;
    }

    //Delete file Function
    async deleteFile(id : any): Promise<File> {
        return await this.fileModel.findByIdAndRemove(id);
    }
}
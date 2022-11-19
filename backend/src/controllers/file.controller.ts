import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseInterceptors, UploadedFiles, Put, Req, Res, Query  } from "@nestjs/common";
import { File } from "src/models/file.schema";
import { request, response } from "express";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";

import { FileService } from "src/services/file.service";

@Controller('/api/v1/file')
export class FileController {
    constructor(private readonly fileService: FileService){}

    @Post('/addFile')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'file', maxCount: 1},
    ]))
    async uploadFile(@Res() response, @Req() request, @Body() file : File, @UploadedFiles() files){
        const requestBody = {
            uploadedBy : file.uploadedBy,
            fileName : file.fileName,
            file : file.fileName,
            uploadDate : file.uploadDate
        }
        const newFile = await this.fileService.uploadFile(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newFile
        })
    }

    @Get('/getFiles/:userId')
    async stream(@Param('userId') userId, @Res() response) {
        const data = await this.fileService.getAllFiles(userId);
        return response.status(HttpStatus.OK).json(data);
    }

    @Delete('/deleteFile/:id')
        async delete(@Res() response, @Param('id') id) {
            await this.fileService.deleteFile(id);
            return response.status(HttpStatus.OK).json({
                message : "File Successfully Deleted"
            })
    }
}
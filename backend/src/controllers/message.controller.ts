import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Message } from "src/models/message.schema";
import { response } from "express";

import { MessageService } from "src/services/message.service";

@Controller('/api/v1/message')
export class MessageController {
    constructor(private readonly messageService: MessageService){}

    @Post('/sendMessage')
        async SendMessage(@Res() response, @Body() message : Message){
            const newMessage = await this.messageService.sendMessage(message);
            return response.status(HttpStatus.CREATED).json({
                newMessage
            })
        }

    @Get('/getAllMessagesForUser/:userId')
        async GetAllMessages(@Param('userId') userId, @Res() response){
            const data = await this.messageService.getAllMassagesForUser(userId);
            return response.status(HttpStatus.OK).json(data);
        }
    
    @Put('/updateMessage/:id')
        async updateMessages(@Res() response, @Param('id') id, @Body() message : Message) {
            const updatedMessage = await this.messageService.updateMessage(id, message);
            return response.status(HttpStatus.OK).json(updatedMessage)
        }

    @Delete('/delete/:id')
        async delete(@Res() response, @Param('id') id) {
            await this.messageService.deleteMessage(id);
            return response.status(HttpStatus.OK).json({
                message : "Message Successfully Deleted"
            })
        }
}
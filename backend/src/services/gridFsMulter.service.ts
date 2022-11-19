import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: GridFsStorage;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: 'mongodb+srv://admin:admin@cluster1.4y8vp.mongodb.net/ssd_db?retryWrites=true&w=majority',
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { extname } from "path";
import { diskStorage } from "multer";

const storageOptions = diskStorage({
    destination: './images',
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}.${extname(file.originalname)}`)
    }
})


@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: storageOptions }))
    async uploadFile(@UploadedFile() file: any): Promise<any> {
        return await this.uploadService.upload(file);
    }
}

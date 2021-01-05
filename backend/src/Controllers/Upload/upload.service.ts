import { Injectable } from '@nestjs/common';
import * as cloudinary from "cloudinary";
import environment from 'src/environment';

@Injectable()
export class UploadService {
    constructor() {
        cloudinary.v2.config({
            cloud_name: 'ds513gzod',
            api_key: '994549185894894',
            api_secret: 'Qogxw9bIAIDZ2wCrKWCjUe50Yes'
        })
    }
    async upload(file: any): Promise<any> {
        let result;
        try {
            await cloudinary.v2.uploader.upload(file.path, function (error, response) {
                result = response;
                return response;
            })
            console.log(result);
            return await result;
        } catch (error) {
            return await error;
        }
    }
}

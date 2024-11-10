import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
    async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
        const uploadedFoler = `${path}/uploads/${folder}`

        await ensureDir(uploadedFoler)

        const response: FileResponse[] = await Promise.all(
            files.map(async file => {
                const originalName = `${Date.now()}-${file.originalname}`
                await writeFile(`${uploadedFoler}/${originalName}`, file.buffer)

                return {
                    url: `/uploads/${folder}/${originalName}`,
                    name: originalName
                }
            })
        )

        return response
    }
}

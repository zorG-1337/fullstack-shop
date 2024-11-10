import { axiosWithAuth } from "@/api/api.interceptors"
import { API_URL } from "@/config/api.config"

interface IFile {
    url: string,
    name: string
}

class FileServie {
    async upload(file: FormData, folder?: string) {
        const response = await axiosWithAuth<IFile[]>({
            url: API_URL.files(''),
            method: 'POST',
            params: {
                folder
            },
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    }
}

export const fileService = new FileServie()
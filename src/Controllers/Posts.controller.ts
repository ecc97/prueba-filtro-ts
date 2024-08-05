import { IPost } from "../Models/IPost";

export class PostsController {
    url: string;

    constructor(url: string) {
        this.url = url
    }

    async getPosts(endPoint: string): Promise<IPost[]>{
        const response = await fetch(`${this.url}${endPoint}`)
        const data = await response.json()
        console.log(response.status)
        return data
    }
}
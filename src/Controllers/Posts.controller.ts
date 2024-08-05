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

    async createPost(endPoint: string, dataPost: IPost): Promise<IPost> {
        // Hace una petición POST a la API para agregar un Post
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Define el tipo de contenido como JSON
            },
            body: JSON.stringify(dataPost) // Convierte los datos de la ciudad a una cadena JSON para enviarlos en el cuerpo de la solicitud
        });
        const data: IPost = await response.json(); // Convierte la respuesta de la API a un objeto JSON
        if (response.status !== 201) { // Verifica si el estado de la respuesta no es 201 (Created)
            throw new Error('No se pudo agregar la ciudad'); // Lanza un error si el estado de la respuesta no es 201
        }
        console.log(response.status); // Imprime el estado de la respuesta en la consola
        return data; // Devuelve los datos de la ciudad agregada
    }
}
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

    async getPostById(endPoint: string, idPost: string | null): Promise<IPost> {
        const response = await fetch(`${this.url}${endPoint}${idPost}`);
        const data = await response.json(); 
        console.log(data); 
        return data; 
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

    async getInfo(endPoint: string, idPost: string | null): Promise<IPost> {
        // Hace una petición GET a la API para obtener la información de un post específico
        const response = await fetch(`${this.url}${endPoint}${idPost}`);
        const data = await response.json(); // Convierte la respuesta de la API a un objeto JSON
        console.log(data); 
        return data; 
    }

    async putPost(endPoint: string, idCity: string | null, dataPost: IPost): Promise<IPost> {
        // Hace una petición PUT a la API para actualizar un post específica
        const response = await fetch(`${this.url}${endPoint}${idCity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Define el tipo de contenido como JSON
            },
            body: JSON.stringify(dataPost) // Convierte los datos de la ciudad a una cadena JSON para enviarlos en el cuerpo de la solicitud
        });
        const data: IPost = await response.json(); // Convierte la respuesta de la API a un objeto JSON
        if (response.status !== 200) { // Verifica si el estado de la respuesta no es 200 (OK)
            throw new Error('No se pudo actualizar la ciudad'); // Lanza un error si el estado de la respuesta no es 200
        }
        console.log(response.status); // Imprime el estado de la respuesta en la consola
        return data; // Devuelve los datos actualizados
    }

    async deletePost(endPoint: string, idPost: string): Promise<void> {
        const response = await fetch(`${this.url}${endPoint}${idPost}`, {
            method: 'DELETE'
        });

        if (response.status !== 200) { 
            throw new Error('No se pudo eliminar la ciudad');
        }
        console.log(response.status); 

        return; 
    }
}
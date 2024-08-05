import { IUsers } from "../Models/IUsers";

export class UsersController {
    url: string;

    constructor(url: string) {
        this.url = url
    }

    async createUser(endPoint: string, dataUser: IUsers):Promise<IUsers> {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        });

        const data: IUsers = await response.json()
        console.log(response.status)
        if (response.status !== 201) {
            throw Error('No se pudo crear el usuario')
        }
        return data
    }
}
import { IUsers, ResponseLogin } from "../Models/IUsers";

export class UsersController {
    url: string;
    messageLogin: string | undefined;

    constructor(url: string) {
        this.url = url
    }

    async createUser(endPoint: string, dataUser: IUsers):Promise<IUsers> {
        const response: Response = await fetch(`${this.url}${endPoint}`, {
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

    async postLogin(dataUser: IUsers, endPoint: string):Promise<ResponseLogin>{
        const response: Response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(dataUser)
        })

        if(response.status !== 201){
            throw new Error('No se pudo iniciar sesión')
        } 

        const responseLogin: ResponseLogin = await response.json()
        this.messageLogin = responseLogin.message
        return responseLogin
    }
}
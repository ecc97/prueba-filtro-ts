import { IUsers, ResponseLogin } from "./Models/IUsers";
import { UsersController } from "./Controllers/Users.controller";
import Swal from "sweetalert2";

const url = 'https://api-posts.codificando.xyz/auth/'

const loginForm = document.getElementById('login-form') as HTMLFormElement
const emailUser = document.getElementById('email-user') as HTMLInputElement
const passwordUser = document.getElementById('password-user') as HTMLInputElement

const usersController: UsersController = new UsersController(url)

loginForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    const user: IUsers = {
        email: emailUser.value,
        password: passwordUser.value
    }

    try {
        const responseLogin: ResponseLogin = await usersController.postLogin(user, 'login')
        console.log(responseLogin.message)
        sessionStorage.setItem('message', responseLogin.message)

        const getMessage = sessionStorage.getItem('message')
        if(getMessage === responseLogin.message){
            window.location.href = './src/Views/home.html'
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: 'Error',
            text: 'No se pudo iniciar sesión. Intenta más tarde',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
})

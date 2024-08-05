import { IUsers } from "../Models/IUsers";
import { UsersController } from "../Controllers/Users.controller";
import Swal from "sweetalert2";

const url: string = 'https://api-posts.codificando.xyz/users/'

const form = document.querySelector('form') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;

const usersController: UsersController = new UsersController(url)

form.addEventListener('submit', async (e: Event) => {
    e.preventDefault()

    const userData = {
        email: email.value,
        password: password.value
    }

    try {
        const userRegistered = await usersController.createUser('register', userData)
        console.log(userRegistered)
        Swal.fire({
            title: 'Se creó el usuario!',
            text: 'Usuario creado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {window.location.href= '../Views/login.html'})
        form.reset()
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: 'Error',
            text: 'No se pudo crear usuario. Intenta más tarde',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }
})



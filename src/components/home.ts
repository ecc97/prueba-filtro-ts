import { PostsController } from "../Controllers/Posts.controller";
import { Card } from "./card";
import Swal from "sweetalert2";

const url = 'http://localhost:3000/'

const logoutButton = document.getElementById('btn-logout') as HTMLButtonElement;
const card = document.getElementById('cards-container') as HTMLDivElement;

window.addEventListener('DOMContentLoaded', () => {
    if(!sessionStorage.getItem('message')) {
        window.location.href = '/'
    }
})

logoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem('message')
    window.location.href = '/'
})

async function showPosts(): Promise<void> {
    const postsController: PostsController = new PostsController(url)
    const posts = await postsController.getPosts('posts')
    console.log(posts)
    posts.forEach((post) => {
        card.append(Card(post))
    })
}

showPosts()

document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.className.includes('edit')) {
        const idEdit = target.getAttribute('id-btn-edit');
        localStorage.setItem('id-edit', String(idEdit)); // Almacena el id de la ciudad en el localStorage
        window.location.href = `./form-data.html?id=${idEdit}`; // Redirige a la página de edición de la ciudad
    }
});

document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    const idDelete = target.getAttribute('id-btn-del');
    
    if (target.className.includes('del')) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Estás seguro que quieres eliminar este post?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            try {
                const postController = new PostsController(url); 
                await postController.deletePost('posts/', String(idDelete)); // Elimina la ciudad
                showPosts(); 
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'Post eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload(); // Recarga la página
            } catch (error) {
                console.error(error); 
                alert('Error al eliminar post'); 
            }
        }
    }
});
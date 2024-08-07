import { PostsController } from "../Controllers/Posts.controller";
import { IPost } from "../Models/IPost";
import { Card } from "./card";
import Swal from "sweetalert2";

const url = 'http://localhost:3000/'

const logoutButton = document.getElementById('btn-logout') as HTMLButtonElement;
const card = document.getElementById('cards-container') as HTMLDivElement;
const loader = document.getElementById('loader') as HTMLDivElement;

const postsWithErrors = localStorage.getItem('posts');

window.addEventListener('DOMContentLoaded', () => {
    if(!sessionStorage.getItem('message')) {
        window.location.href = '/'
    }
    loader.style.display = 'block';
    showPosts().finally(() => { // Ejecuta después de que showPosts() se haya completado.
        loader.style.display = 'none';
        showPostsWithErrors(); // Muestra los posts con errores que están almacenados en localStorage
    });
})

logoutButton?.addEventListener('click', () => {
    sessionStorage.removeItem('message')
    window.location.href = '/'
})

function hasIdPost(postId: string | null): void { 
    return localStorage.setItem('id-post', String(postId)); // Almacena el id de la ciudad en el localStorage
}

async function showPosts(): Promise<void> {
    const postsController: PostsController = new PostsController(url)
    const posts = await postsController.getPosts('posts')
    localStorage.removeItem('id-post')
    console.log(posts)
    posts.forEach((post) => {
        card.append(Card(post))
    })
}

// Función para mostrar los posts con errores que están almacenados en localStorage
function showPostsWithErrors(): void {
    if (postsWithErrors) { // Si hay posts almacenados (no es null)
        const parsedPosts: IPost[] = JSON.parse(postsWithErrors); // Convierte la cadena JSON de posts almacenados a un arreglo de objetos IPost
        console.log(parsedPosts);
        parsedPosts.forEach((post) => {
            card.append(Card(post));
        });
    } 
}

document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.className.includes('view-more')) {
        const idViewMore = target.getAttribute('id-button');
        hasIdPost(idViewMore) 
        window.location.href = `./informacion-post.html?id=${idViewMore}`; // Redirige a la página de información de la ciudad
    }
});

document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.className.includes('edit')) {
        const idEdit = target.getAttribute('id-btn-edit');
        hasIdPost(idEdit) 
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
            if (postsWithErrors) {
                localStorage.removeItem(`posts`);
                showPostsWithErrors()
                await Swal.fire({
                    title: 'Eliminado',
                    text: 'Post local eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload();
            } else {
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
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showPosts();
    showPostsWithErrors();
});
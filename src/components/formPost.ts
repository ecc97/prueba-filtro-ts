import { IPost } from "../Models/IPost";
import { PostsController } from "../Controllers/Posts.controller";
import Swal from "sweetalert2";

const url: string = 'http://localhost:3000/'
const postsController: PostsController = new PostsController(url)

const form = document.querySelector('form') as HTMLFormElement;
const titleData = document.getElementById('title-data') as HTMLInputElement;
const bodyData = document.getElementById('body-data') as HTMLTextAreaElement;
const dateData = document.getElementById('date-data') as HTMLInputElement;
const platformData = document.getElementById('platform-data') as HTMLInputElement;
const postUrlData = document.getElementById('post-url-data') as HTMLInputElement;

document.addEventListener('DOMContentLoaded', async () => {
    const idPost = localStorage.getItem('id-edit'); 

    if (idPost) { 
        try {
            const infoPost: IPost = await postsController.getInfo("posts/", idPost);
            titleData.value = infoPost.title;
            bodyData.value = infoPost.body;
            dateData.value = String(infoPost.estimatedPublicationDate);
            platformData.value = infoPost.platform;
            postUrlData.value = infoPost.postUrl
            
        } catch (error) {
            console.error('Error fetching city information:', error); // Muestra un error en la consola si no se pudo obtener la información
        }
    }
    form.addEventListener('submit', async(e: Event) => {
        e.preventDefault()
    
        const postData: IPost = {
            title: titleData.value,
            body: bodyData.value,
            creationDate: new Date(),
            estimatedPublicationDate: new Date(dateData.value),
            status: 'pending',
            approvalPercentage: 75,
            platform: platformData.value,
            postUrl: postUrlData.value
        }
    
        try {
            if(idPost) {
                const postEdited = await postsController.putPost('posts/', idPost, postData);
                console.log(postEdited)
                localStorage.removeItem('id-edit')
                Swal.fire({
                    title: 'Se actualizó el Post!',
                    text: 'Post actualizado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {window.location.href= './home.html'})
                form.reset()
            } else {
                const postAdded = await postsController.createPost('posts', postData)
                console.log(postAdded)
                localStorage.setItem('post', JSON.stringify(postAdded))
                form.reset()
                Swal.fire({
                    title: 'Se creó el Post!',
                    text: 'Post creado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {window.location.href= './home.html'})
                form.reset()
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo crear post. Intenta más tarde',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return
        }
    })
})

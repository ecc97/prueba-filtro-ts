import { PostsController } from "../Controllers/Posts.controller";
import { Card } from "./card";

const url = 'http://localhost:3000/'
let idUser = sessionStorage.getItem('id-user') as string

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
    // const postsByUser = posts.filter(post => post.postByUser === Number(idUser))
    console.log(posts)
    posts.forEach((post) => {
        card.append(Card(post))
    })
}

showPosts()
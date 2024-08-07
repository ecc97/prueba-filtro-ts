import { IPost } from "../Models/IPost";
import { PostsController } from "../Controllers/Posts.controller";
import Swal from "sweetalert2";
import '../Views/scss/information.scss'

const url = 'http://localhost:3000/'

const containerPost = document.getElementById('details-post') as HTMLElement
const idPost = localStorage.getItem('id-post')

function showDetailsPost(props: IPost){
    const {title, body, creationDate, estimatedPublicationDate, status, approvalPercentage, platform, postUrl} = props

    const containerInfo = document.createElement('article') as HTMLElement
    containerInfo.className = 'info-item'

    const info = document.createElement('div') as HTMLDivElement
    info.className = 'info-body p-3 d-flex flex-column align-items-center'

    const titleInfo = document.createElement('h5') as HTMLHeadingElement
    titleInfo.className = 'info-title'
    titleInfo.innerText = title

    const approvalPercentageInfo = document.createElement('span') as HTMLSpanElement
    approvalPercentageInfo.className = 'badge bg-primary info-badge'
    approvalPercentageInfo.innerText = `Aprobación: ${approvalPercentage}%`

    const statusInfo = document.createElement('div') as HTMLElement
    statusInfo.className = 'info-text'
    statusInfo.innerText = status

    const bodyInfo = document.createElement('p') as HTMLParagraphElement
    bodyInfo.className = 'info-text'
    bodyInfo.innerText = body

    const platformInfo = document.createElement('p') as HTMLParagraphElement
    platformInfo.className = 'info-text'
    platformInfo.innerText = `Plataforma: ${platform}`

    const postUrlInfo = document.createElement('a') as HTMLAnchorElement
    postUrlInfo.className = 'info-text'
    postUrlInfo.href = postUrl
    postUrlInfo.innerText = 'Link del post'
    postUrlInfo.target = '_blank'
    postUrlInfo.rel = 'noopener noreferrer'
    

    const dateCreateInfo = document.createElement('p') as HTMLParagraphElement
    dateCreateInfo.className = 'info-text'
    dateCreateInfo.innerText = `Creado: ${new Date(creationDate).toLocaleDateString()}`

    const estimatedDateInfo = document.createElement('p') as HTMLParagraphElement
    estimatedDateInfo.className = 'info-text'
    estimatedDateInfo.innerText = `Estimado: ${new Date(estimatedPublicationDate).toLocaleDateString()}`

    info.append(titleInfo, approvalPercentageInfo, statusInfo, body, platformInfo, postUrlInfo, dateCreateInfo, estimatedDateInfo)
    containerInfo.append(info)
    containerPost.append(containerInfo)

    return containerPost
}

async function render() {
    try {
        const postController: PostsController = new PostsController(url)
        const post: IPost = await postController.getPostById('posts/', idPost)
        showDetailsPost(post)
    } catch (e) {
        console.error(e)
        Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar los detalles del post. Intenta más tarde',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return
    }
}

render()
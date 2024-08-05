import { IPost } from "../Models/IPost";
import '../Views/scss/card.scss'

export const Card = (props: IPost) => {
    let {id, title, creationDate, estimatedPublicationDate, approvalPercentage, platform} = props
    const container = document.createElement('div') as HTMLElement
    container.className = 'col-md-4'

    const card = document.createElement('div') as HTMLElement
    card.className = 'card'

    const cardBody = document.createElement('div') as HTMLElement
    cardBody.className = 'card-body'

    const cardTitle = document.createElement('h5') as HTMLHeadingElement
    cardTitle.className = 'card-title'

    const cardApproval = document.createElement('span') as HTMLSpanElement
    cardApproval.className = 'badge bg-primary'

    const cardPlatform = document.createElement('p') as HTMLParagraphElement
    cardPlatform.className = 'card-text mt-2'

    const cardCreationDate = document.createElement('span') as HTMLSpanElement
    cardCreationDate.className = 'card-text mt-2 d-block'

    const cardPublicDate = document.createElement('span') as HTMLSpanElement
    cardPublicDate.className = 'card-text mt-2 d-block'

    cardTitle.innerText = title
    cardApproval.innerText = String(approvalPercentage)
    cardPlatform.innerText = platform
    cardCreationDate.innerText = `Creado: ${new Date(creationDate).toLocaleDateString()}`
    cardPublicDate.innerText = `Estimado: ${new Date(estimatedPublicationDate).toLocaleDateString()}`

    
    const groupBtn = document.createElement('div') as HTMLDivElement
    groupBtn.className = 'd-flex justify-content-between mb-3'
    
    const btnEdit = document.createElement('button') as HTMLButtonElement
    btnEdit.className = 'btn btn-primary w-50 edit'
    btnEdit.innerText = 'Editar'
    btnEdit.setAttribute('id-btn-edit', String(id))
    
    const btnDelete = document.createElement('button') as HTMLButtonElement
    btnDelete.className = 'btn btn-danger w-50 del'
    btnDelete.innerText = 'Eliminar'
    btnDelete.setAttribute('id-btn-del', String(id))
    
    groupBtn.append(btnEdit, btnDelete)
    
    const viewMoreButton = document.createElement("button") as HTMLButtonElement
    viewMoreButton.innerText = 'Más información'
    viewMoreButton.className = 'btn btn-info w-100'
    viewMoreButton.setAttribute('id-button', String(id))
    
    cardBody.append(cardTitle, cardApproval, cardPlatform, cardCreationDate, cardPublicDate, groupBtn, viewMoreButton)
    card.append(cardBody)
    container.append(card)

    return container
}
import {writeBooks,readBooks,readNextId,updateNextId} from "./read-write.js"

export function getAllBooks(author){
    const getAllBooks = readBooks()
    let arrayBooks = []
    Object.keys(getAllBooks).forEach(book=>{
        arrayBooks.push(getAllBooks[book])
    })
    if (author) {
        arrayBooks = arrayBooks.filter(book=>{
            return book.author === author
        })
    }
    arrayBooks = arrayBooks.sort(function (a,b) {
        return a.title - b.title
    })
    return arrayBooks
}
export function getOneBooks(id){
    let getBooks = readBooks()
    return getBooks[id]
}

export function addABook(body){
    let getBooks = readBooks()
    getBooks[readNextId()] = body
    updateNextId()
    writeBooks(getBooks)
    return body
}

export function updateBook(id, body){
    let getBooks = readBooks()
    let getBook = getBooks[id]
    if (getBook){
        if (body.title){
            getBooks[id].title = body.title
        }
        if (body.author){
            getBooks[id].author = body.author
        }
        if (body.nationality){
            getBooks[id].nationality = body.nationality
        }
        writeBooks(getBooks)
        return getBooks[id]
    }
    return undefined
}

export function removeBook(id){
    let getBooks = readBooks()
    const getBook = getBooks[id]
    if (getBook){
        delete getBooks[id]
        writeBooks(getBooks)
        return ("deleted")
    }
    return (undefined)
}
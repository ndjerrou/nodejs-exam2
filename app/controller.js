import {
    getAllBooks,
    getOneBooks,
    addABook,
    updateBook,
    removeBook
} from "./data-handling/functions.js"

export const getBooks = async (req, res) =>{
    const { author } = req.params
    const result = getAllBooks(author)
    res.send(JSON.stringify(result))
}
export const getBook = async (req, res) =>{
    const { id } = req.params
    res.send(JSON.stringify(getOneBooks(id)))
}
export const postBook = async (req, res) =>{
    const result = addABook(req.body)
    res.send(JSON.stringify(result))
}
export const putBook = async (req, res) =>{
    const { id } = req.params
    let result = updateBook(id, req.body)
    res.send(JSON.stringify(result))
}
export const deleteBook = async (req, res) =>{
    const { id } = req.params
    let result = removeBook(id)
    res.send(JSON.stringify(result))
}
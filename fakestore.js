import fetch from 'node-fetch'; //set "type": "module" in the package.json or use the .mjs extension.
import express from 'express' //const express = require('express');
import fs from "fs" // const fs = require("fs")
import { fileURLToPath } from 'url';
import path from "path"

const app = express();
app.use(express.json()); // middleware // in order to get req.body

//import { dirname } from 'path';
const __filename    = fileURLToPath(import.meta.url);
const __dirname     = path.dirname(__filename);
const productsPath  = path.join(__dirname,  'data', 'products.json');
const nextIdPath    = path.join(__dirname,  'data', 'nextID.json');

// ------------------- INIT --------------------------------

function initData(){
    try {
      const products = fs.readFileSync(productsPath, 'utf-8');
      console.log("data exist")
    } catch (err) {
        console.log("data do not exist")
        const url='https://fakestoreapi.com/products';
        const params = {method:"GET"}
        fetch(url,params)
        .then(async data => {
            let database = []
            database = await data.json()
            writeData(database)
            initNextId(database)
        })
        .then(res=>{
            console.log("fakestore api - request success")
        })
        .catch(error=>console.log(error))
    }
}
function initNextId(database){
    let idList = []
    database.forEach(item=>idList.push(item.id))
    idList.sort((a,b)=>a-b)
    if (idList[idList.length - 1]){
        writeNextId(idList[idList.length - 1] + 1)
    } else {
        writeNextId(0)
    }
}

// ------------------- read write data & nextId ----------------------

function writeData(data, aPath = productsPath){
    try {
        fs.writeFileSync(aPath, JSON.stringify(data));
    } catch (err) {
        console.error('Error writing file : ', err.message);
    }
}
function readData(aPath = productsPath) {
    try {
      const products = fs.readFileSync(aPath, 'utf-8');
      return JSON.parse(products);
    } catch (err) {
      console.error('Error reading file : ', err.message);
      return []
    }
}
function writeNextId(nextId){ writeData({nextId: nextId}, nextIdPath)}
function readNextId()       {
    const getdata = readData(nextIdPath)
    return getdata.nextId
}
function updateNextId(){
    let getNextId = readNextId()
    writeNextId(getNextId + 1)
}

// data init ##############################

initData()

// requests ###############################

// 1 / Récupérer tous mes produits
app.get("/products", (req, res) => {
    res.send(readData())
})
// 2 / Récupérer un produit en particulier
app.get("/product/:id", (req, res) => {
    const { id } = req.params
    res.send(readData().find(item => item.id === +id));
})
// 3 / Ajouter un produit
const defaultBody = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 }
}
app.post("/product", (req, res) => {
    let body = req.body

    let newItem = {...defaultBody,
        title: body.title,
        price: body.price,
        description: body.description,
        category: body.category,
        image: body.image,
        rating: body.rating //|| { rate: 0, count: 0 }
    };
    newItem.id = readNextId();
    updateNextId()

    let getData = readData()
    getData.push(newItem)
    writeData(getData)

    res.send(newItem)
})
// 4 / Modifier un produit
app.put("/product/:id/:key", (req, res) => {
    const { id, key } = req.params
    let body = req.body

    console.log("Update product", id, + "," + key)
    
    let downloadData = readData()
    const index = downloadData.indexOf(downloadData.find(item => item.id === +id));
    if (index > -1) { // only when item is found
        if (downloadData[index][key]){
            //"image"
            switch (key) {
                case "title":
                    downloadData[index][key] = body[key]
                    writeData(downloadData)
                    break;
                case "price":
                    downloadData[index][key] = body[key]
                    writeData(downloadData)
                    break;
                case "description":
                    downloadData[index][key] = body[key]
                    writeData(downloadData)
                    break;
                case "category":
                    downloadData[index][key] = body[key]
                    writeData(downloadData)
                    break;
                case "rating":
                    downloadData[index][key] = body[key]
                    writeData(downloadData)
                    break;
                default:
                    res.send('PUT /product/'+id+"/"+key + "key invalid")
                    break;
            }
            res.send(downloadData[index])
        } else {
            res.send('PUT /product/'+id+"/"+key + "key not found")
        }
    } else {
        res.send('PUT /product/'+id+"/"+key + "key not found")
    }
})
// 5 / Supprimer un produit
app.delete('/product/:id', (req,res) => {
    const { id } = req.params
    let downloadData = readData()
    const index = downloadData.indexOf(downloadData.find(item => item.id === +id));
    if (index > -1) { // only splice array when item is found
        downloadData.splice(index, 1); // 2nd parameter means remove one item only
        writeData(downloadData)
        res.send('DELETE /product/'+ id + " success")
    } else {
        res.send('DELETE /product/'+ id + " fail, no product with this id")
    }
})

// SERVER ############################################################

app.listen(3000,  () =>  console.log("listening on port 3000..."))
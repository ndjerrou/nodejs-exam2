
module.exports = (app)=>{

    const Utils = require('../utils/utils')
    const adminMiddleware=require('../utils/adminMiddleware')
    const validatePayloadMiddleware=require('../utils/verifyPayload')
    
    // route pour récup tous les livres
    // route pour récup les livres sort selon le title : curl http://localhost:9000/getBooks?sort=title
    // route pour limitter le nbr de resultat par page : (dans le moteur de recherche : http://localhost:9000/getBooks?page=1&limit=3)
    app.get('/getBooks', async (req, res, next) => {

        const page = parseInt(req.query.page) || 1; // je recup le page nbr avec req.query
        const limit = parseInt(req.query.limit) || 10; // de meme pour la limitte (10 par default)
        const startIndex = (page - 1) * limit; // calcul de l'indice de départ en fonction du page nbr et de la limite

        try{
        const result = await Utils.getBooks()
        // j'appllique la pagination en utilisant la limit et le skip
        const paginatedBooks = result.slice(startIndex, startIndex + limit);
        //condition pour permettre de trier selon les titles // j'aurai pu créer une switch pour permettre de sort selon plusieurs propriétés
        if (req.query.sort === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title));
          }
        ////////////
        res.status(200).send({status: 200, message: "books has been fetched with success !", books: paginatedBooks })
        }
        catch(err){
        console.log(err)
        res.status(500).send({status: 500, message: "internal server error", error: err })
        }
    })

    // route pour récup un seul livre selon son id 

    app.get('/getBook/:id', async (req, res, next) => {

        //je recup l'id dans l'url
        let id = req.params.id
      
        try{
          let result = await Utils.getBook(id)
          if(result.error){
            //dans ma fonction getBook je renvoi un objet avec une propriété error lorsqu'aucun livre n'est trouvé
            res.status(404).send({status: 404, message: "not found", error: result.error })
          }else{
            res.status(200).send({status: 200, message: "the book has been fetched with success !", book: result })
          }
        }
        catch(err){
          console.log(err)
          res.status(500).send({status: 500, message: "internal server error", error: err })
        } 
    })

    // route pour ajouter un livre
    //utilisation du middleWare joi
    app.post('/addBook',validatePayloadMiddleware, async (req, res) => {

        //je récup le payload
        const newBook = req.body;
        try{
            let result = await Utils.addBook(newBook)
            res.status(200).send({status: 200, message: "the book has been add with success !", book: result })
        }
        catch(err){
            console.log(err)
            res.status(500).send({status: 500, message: "internal server error", error: err })
        }
    });

    // route pour modifier un livre

    app.put('/updateBook/:id',validatePayloadMiddleware, async (req, res) => {

        const updatedBook = req.body;
        const id = req.params.id
      
        try{
            let result = await Utils.updateBook(updatedBook, id)
            if(result.error){
                res.status(404).send({status: 404, message: result.error })
              }else{
                res.status(200).send({status: 200, message: "the book has been updated with success !", book: result })
              }
        }
        catch(err){
            console.log(err)
            res.status(500).send({status: 500, message: "internal server error", error: err })
        }
    });


    /* N'ayant pas de bdd pour enregistrer les admin j'ai créé un fichier admin.json
    
    En dessous de la route delete tu trouveras une route post pour ajouter un nouvel admin.
    En payload tu peux envoyer : {"name": "nissim"}, cela ajoutera ton nom au fichier admin

    Pour la route delete, le middleWare récupère ton nom dans req.params donc l'endpoint doit suivre :
    /delete/5/hugo par exemple.
    Le middleware va checker dans le fichier admin si il trouve un nom qui correspond et te donne l'accès si c'est le cas.
    */
    app.delete('/delete/:id/:name', adminMiddleware, async (req, res) => {

        const id = req.params.id
      
        try{
            let result = await Utils.deleteBook(id)
            if(result.error){
                res.status(404).send({status: 404, message: result.error })
              }else{
                res.status(200).send({status: 200, message: "the book has been delete with success !", book: result })
              }
        }
        catch(err){
            res.status(500).send({status: 500, message: "internal server error", error: err })
        }
    });


    app.post('/addAdmin', async (req, res) => {

        const newAdmin = req.body;
      
        try{
            let result = await Utils.addAdmin(newAdmin)
            res.status(200).send({status: 200, message: "admin has been add with success !", admin : result })
        }
        catch(err){
            console.log(err)
            res.status(500).send({status: 500, message: "internal server error", error: err })
        }
    });





    







    
    
    
  
    
}

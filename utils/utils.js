const fs = require("fs")


class Utils {

    //fonction pour fetcher tous les livres de la BDD
    static async getBooks(){

        try{
            //je cherche et lis le file selon son path (si il n'est pas trouvé l'erreur part dans le catch)
            let bdd = await fs.readFileSync("./library.json", 'utf8');
            //je parse la réponse
            let books = JSON.parse(bdd);
            //je retourne la réponse parsé afin qu'elle soit manipulable
            return books;
        }
        catch(err){
            //je log l'erreur
            console.log(err)
            //j'envoi l'erreur au catch parent (celui de ma route express)
            throw err
        }   
    }  

    //fonction pour fetcher tous les livres de la BDD
    static async getBook(book_id) {
        try {
            //je cherche et lis le file selon son path (si il n'est pas trouvé l'erreur part dans le catch)
            let bdd = await fs.readFileSync("./library.json", 'utf8');
            //je parse
            let books = JSON.parse(bdd);
            let searchedBook = null;
            //j'initialise une variable en false (passera en true si un index correspondant est trouvé)
            let found = false;
            //je fais le tour des élements récupérés dans le json 
            books.map((book) => {
                //je cherche une correspondance d'id
                if (book.id == book_id) {
                searchedBook = book;
                found = true; // Correspondance trouvée
                }
            });
            //dans le cas ou je n'ai pas trouvé d'id correspondant je retourne l'erreur (je ne la throw pas car elle se ferait overidé par l'erreur retourné par le catch parent)
            if (!found) {
                return {error: "aucun livres ne correspond à votre recherches"};
            }
            //je retourne le livre 
            return searchedBook;
            } catch (err) {
            console.log(err)
            //je throw l'erreur vers le catch parent de ma route express
            throw err
            }
      }


    //fonction pour ajouter un livre dans le fichier json
    static async addBook(newBook){

        try {
            //je recup l'état actuel de la bdd
            let oldBdd = await fs.promises.readFile('./library.json', 'utf8');
            //je la parse pour la manipuler
            let books = JSON.parse(oldBdd);
            //je créer un id pour le livre ajouté : si la bdd est vide (books.length à 0) alors je lui met l'id 1 / sinon je recup l'id du dernier element et j'ajoute 1
            const newBookId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
            newBook.id = newBookId;
            //je push le nouvelle element dans books 
            books.push(newBook);
        
            try {
              //je ré écris la bdd qui contient le nouvel element 
              await fs.promises.writeFile('./library.json', JSON.stringify(books));
              return newBook;
            } catch (err) {
              console.error(err);
              throw err
            }
          } 
        catch (err) {
            console.error(err);
            throw err
          } 
    }  


    //fonction pour ajouter un livre dans le fichier json
    static async updateBook(updatedBook, id){

        try {
            let oldBdd = await fs.promises.readFile('./library.json', 'utf8');
            let books = JSON.parse(oldBdd);

            //plutot que la boucle map de tout à l'heure, ici j'utilise le findIndex qui est plus simple
            const bookIndex = books.findIndex(book => book.id == id);
            //si il ne trouve pas d'id correspondant, findIndex me retourne -1
            if (bookIndex === -1) {
              return ({error: "there is no books corresponding with the provided id"});
            }
            //je récup l'état actuel de l'elelement que je veux modifier avec un spread operator et je lui ajoute le nouveau payload
            books[bookIndex] = { ...books[bookIndex], ...updatedBook };
        
            try {
              //je ré écris la bdd 
              await fs.promises.writeFile('./library.json', JSON.stringify(books));
              return updatedBook;
            } catch (err) {
              console.error(err);
              throw err
            }
          } catch (err) {
            console.error(err);
            throw err
          }
    } 

    //fonction pour ajouter un livre dans le fichier json
    static async deleteBook(id) {
      try {
        let bdd = await fs.promises.readFile('./library.json', 'utf8');
        let books = JSON.parse(bdd);
        // je cherche l'id qui match
        const index = books.findIndex(elt => elt.id == id);
        //ici encore je retourne une erreur (propriété error avec laquel je match dans ma route express avec ma condition if(response.error))
        if (index === -1) {
          return { error: "there is no books corresponding with the provided id" };
        }
        //je supprime l'element en question
        books.splice(index, 1);
        
        try {
          //ré ecriture de la bdd 
          await fs.promises.writeFile('./library.json', JSON.stringify(books));
          return `Le livre numéro ${id} a bien été supprimé.`;
        } catch (err) {
          console.error(err);
          throw err
        }
      } catch (err) {
        console.error(err);
        throw err
      }
    }
    
    //fonction pour ajouter un livre dans le fichier json
    static async addAdmin(name){

        try {
            let oldAdmins = await fs.promises.readFile('./admin.json', 'utf8');
            let admins = JSON.parse(oldAdmins);
            admins.push(name);
        
            try {
              await fs.promises.writeFile('./admin.json', JSON.stringify(admins));
              console.log('admin ajouté')
              return name;
            } catch (err) {
              console.error(err);
              throw err
            }
          } catch (err) {
            console.error(err);
            throw err
          } 
    }  

}

module.exports = Utils;

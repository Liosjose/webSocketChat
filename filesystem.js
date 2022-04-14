const fs = require('fs')
class Contenedor{
     constructor(filename){
          this.filename = filename;
     }
async write(texto){ 
          try {
               const escribir = await fs.promises.writeFile(this.filename, texto )
               return escribir;
          } catch (error) {
               console.log(error, "algo Salio Mal en la escritura")
          }
     }


async getAll (){ 
     try {
          const contenido = await fs.promises.readFile(this.filename, 'utf-8')
          const contenidoParse = JSON.parse(contenido)
            
              return  contenidoParse
                
     } catch (error) {
          console.log(error)
     }
}



async save (nuevoObj){ 
      
          try{
               const contenido = await fs.promises.readFile(this.filename, 'utf-8')
                     const contenidoParse = JSON.parse(contenido)
               
                //Asigna la fecha
               const f = new Date();
               f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
               
                nuevoObj.fecha = f
          
                    contenidoParse.push(nuevoObj)
          
                    let nuevo = await this.write(JSON.stringify(contenidoParse))
                    
                           
             
          }catch(error){
               console.log('No se pudo modificar')
          }
          console.log('el correo es valido')
     } 


}
     


module.exports= Contenedor ;
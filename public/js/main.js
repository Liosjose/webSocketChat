
let socket = io.connect(); 


socket.on('productos', function(data) { 
  console.log(data);
  render(data);
});

socket.on('messages', function(data) { 
  console.log(data);
  renderMsg(data);
});


function render(data) { 
    let html = data.map(function(elem, index){ 
      return(`<div>
            <em>Producto :${elem.author}<em>
            <em>  Precio:${elem.price}</em><br> <br>  
            <img src="${elem.link}" width="50" height="50" />
            
            </div>`)
            
             
    }).join(" "); 
    document.getElementById('productos').innerHTML = html; 
}

function addProduct(e) { 
    let producto = { 
      author: document.getElementById('title').value, 
      price: document.getElementById('price').value,
      link: document.getElementById('link').value
      
    }; 
    socket.emit('new-productos', producto); // new-productos es el nombre del evento (recordatorio)
    
    document.getElementById('tittle').value = ''
    document.getElementById('tittle').focus()

    document.getElementById('price').value = ''
    document.getElementById('price').focus()

    document.getElementById('link').value = ''
    document.getElementById('link').focus()
    

    return false;
}
/*---------------------------------------------------------------------------------------------------*/
//Mensajes 



function renderMsg(data) { 
  console.log('aca', data)
  let html = data.map(function(elem, index){ 

    
        return(`<div>

          <em>  mail :${elem.mail}<em>
          <em>  mensaje:${elem.texto}</em><br> <br>  
          <em>  fecha:${elem.fecha}</em><br> <br>  
          </div>`)
          
           
  }).join(" "); 
  document.getElementById('messages').innerHTML = html; 
}


      
function addMessage(e) { 
  const f = new Date();
    f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
  let producto = { 
    mail: document.getElementById('mail').value, 
    texto: document.getElementById('texto').value,
    fecha: f
  }; 

  let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let valid = expReg.test(producto.mail)
  
  if(valid){
  socket.emit('new-message', producto); // new-productos es el nombre del evento (recordatorio)
  
  
  document.getElementById('mail').focus()

  document.getElementById('texto').value = ''
  document.getElementById('texto').focus()
     }else {
       alert ('ingrese un correo electronico valido')
         }
  
  return false;
}



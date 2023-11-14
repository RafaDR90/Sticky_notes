window.onload = () => {
    //localStorage.clear();
    const NewBlueSticky = document.getElementById('createNoteBlue');
    const NewYellowSticky = document.getElementById('createNoteYellow');
    const blueSticky = document.querySelector('#BlueContainer');
    const yellowSticky = document.querySelector('#yellowContainer');
    const main = document.querySelector('main');
    var pulsado = false;
    var cordXresta = 0;
    var cordYResta = 0;
    var imagen;
    var arrayDeNotas = JSON.parse(localStorage.getItem('saveNotes'));
    if (arrayDeNotas==null){
        var arrayDeNotas = {
            'notas': []
          };
    }else{
        arrayDeNotas.notas = arrayDeNotas.notas.map(nota => new Note(nota.text, nota.coordX, nota.coordY, nota.color, nota.id));

    }
    console.log(arrayDeNotas)


    


    const cargarNotasDesdeLocalStorage = () => {
        arrayDeNotas.notas.forEach(nota => {
            let x=nota.coordX;
            let y=nota.coordY;
            const { x: xPercentage, y: yPercentage } = convertPixelsToPercentage(x, y);
            if(nota.getColor()=='blue'){
                agregarSticky(NewBlueSticky,blueSticky,yPercentage,xPercentage,'blue',false,nota.text,nota.id);
            }else{
                agregarSticky(NewYellowSticky,yellowSticky,yPercentage,xPercentage,'yellow',false,nota.text,nota.id);

            }
            
        });
    };

    cargarNotasDesdeLocalStorage();

    
    
    
    var id = arrayDeNotas.notas.reduce(function (maxId, nota) {
        return Math.max(maxId, nota.id);
      }, 0);

    var id = arrayDeNotas.notas.length;
//CONTROLADOR
    function agregarSticky  (boton, stickyContainer,posTop='20%',posLeft='83%',color,nueva=true,texto="",oldId=0)  {
            let nuevoSticky = stickyContainer.cloneNode(true);
            nuevoSticky.style.visibility='visible';
            nuevoSticky.style.top = posTop;
            nuevoSticky.style.left = posLeft;
            main.appendChild(nuevoSticky);
            if(nueva){
                var objNote=new Note('','83%','20%',color,id++);
                arrayDeNotas.notas.push(objNote);
                var objetoEnJSON = JSON.stringify(arrayDeNotas);
                localStorage.setItem('saveNotes', objetoEnJSON);
            }else{
                var objNote=new Note(texto,posTop,posLeft,color,oldId);
            }
            
            
            let child = nuevoSticky.children;
            let close=child[2];
            let edit=child[1];
            let text=child[0];
            let parrafo=child[3];
            
            if(!nueva){
                parrafo.innerText=texto
            }

            close.addEventListener('click',(e)=>{
                idToDelete=objNote.getId();
                arrayDeNotas.notas = arrayDeNotas.notas.filter(function (nota) {
                    return nota.id !== idToDelete;
                  });
                nuevoSticky.remove();
                borrarNota(idToDelete);
                var objetoEnJSON = JSON.stringify(arrayDeNotas);
                localStorage.setItem('saveNotes', objetoEnJSON);
                console.log(objetoEnJSON)
            })

            edit.addEventListener('click',(e)=>{
                e.stopPropagation();
                text.style.visibility='visible';
                text.focus();
                parrafo.style.visibility='hidden';

                text.addEventListener('blur', () => {
                    text.style.visibility = 'hidden';
                    parrafo.innerText = text.value;
                    objNote.setText(text.value);
                    parrafo.style.visibility='visible';
                    actualizarNota(objNote.getId(),objNote.getCoordX(),objNote.getCoordY(),objNote.getText(),objNote.getColor());
                    var objetoEnJSON = JSON.stringify(arrayDeNotas);
                    localStorage.setItem('saveNotes', objetoEnJSON);
                    console.log(objetoEnJSON)
                });
            
                text.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                        event.preventDefault(); 
                        text.style.visibility = 'hidden';
                        parrafo.innerText = text.value; 
                        objNote.setText(text.value);
                        parrafo.style.visibility='visible';
                        actualizarNota(objNote.getId(),objNote.getCoordX(),objNote.getCoordY(),objNote.getText(),objNote.getColor());
                        var objetoEnJSON = JSON.stringify(arrayDeNotas);
                        localStorage.setItem('saveNotes', objetoEnJSON);
                        console.log(objetoEnJSON)
                        

                    }
                });
                
            })

            nuevoSticky.addEventListener('click', (event) => {
                pulsado = !pulsado;
                imagen = event.currentTarget;  
                posicionImg = imagen.getBoundingClientRect();
                cordXresta = event.clientX - posicionImg.left;
                cordYResta = event.clientY - posicionImg.top;
                actualizarNota(objNote.getId(),posicionImg.left,posicionImg.top,objNote.getText(),objNote.getColor())
                var objetoEnJSON = JSON.stringify(arrayDeNotas);
                localStorage.setItem('saveNotes', objetoEnJSON);
                console.log(objetoEnJSON)
            });
        
    };
//VISTA
    NewBlueSticky.addEventListener('click', () => agregarSticky(NewBlueSticky, blueSticky,'20%','83%','blue'));
    NewYellowSticky.addEventListener('click', () => agregarSticky(NewYellowSticky, yellowSticky,'20%','83%','yellow'));

    document.addEventListener("mousemove", (e) => {
        cordX = e.clientX;
        cordY = e.clientY;
        if (pulsado && imagen) {
            let posTop=((cordY - cordYResta) / window.innerHeight) * 100 + "%";
            let posLeft=((cordX - cordXresta) / window.innerWidth) * 100 + "%";
            imagen.style.top = posTop;
            imagen.style.left = posLeft;
        }
    });


    //CONTROLADOR
const actualizarNota = (id, newCoordX, newCoordY, newText,color) => {
    const notaToUpdate = arrayDeNotas.notas.find(nota => nota.id == id);
        if (notaToUpdate) {
            notaToUpdate.setCoordX(newCoordX);
            notaToUpdate.setCoordY(newCoordY);
            notaToUpdate.setText(newText);
            notaToUpdate.setColor(color);
            var arrayEnJSON =JSON.stringify(arrayDeNotas);
            localStorage.setItem('saveNotes',arrayEnJSON);
        }
    };

    const borrarNota = (id) => {
        arrayDeNotas.notas = arrayDeNotas.notas.filter(nota => nota.id !== id);
    };



    function convertPixelsToPercentage(x, y) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        const xPercentage = (x / screenWidth) * 100;
        const yPercentage = (y / screenHeight) * 100;
    
        return { x: `${xPercentage}%`, y: `${yPercentage}%` };
    }
};

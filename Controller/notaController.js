window.onload = () => {
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
    }
    console.log(arrayDeNotas)

    arrayDeNotas.notas.forEach(x => {
        const nota = new Nota(x.text, x.coordX, x.coordY, x.color, x.id);
        actualizarNota(nota.getId(),nota.getCoordX(),nota.getCoordY(),nota.getText(),nota.getColor());
    });

    const cargarNotasDesdeLocalStorage = () => {
        arrayDeNotas.notas.forEach(nota => {
            const nuevoSticky = blueSticky.cloneNode(true);
            nuevoSticky.style.visibility = 'visible';
            nuevoSticky.style.top = nota.getCoordY();
            nuevoSticky.style.left = nota.getCoordX();
            main.appendChild(nuevoSticky);

            let child = nuevoSticky.children;
            let close = child[2];
            let edit = child[1];
            let text = child[0];
            let parrafo = child[3];

            parrafo.innerText = nota.getText();

            close.addEventListener('click', () => {
                idToDelete = nota.getId();
                arrayDeNotas.notas = arrayDeNotas.notas.filter(n => n.id !== idToDelete);
                nuevoSticky.remove();
                borrarNota(idToDelete);
                actualizarLocalStorage();
            });

            edit.addEventListener('click', (e) => {
                e.stopPropagation();
                text.style.visibility = 'visible';
                text.focus();
                parrafo.style.visibility = 'hidden';

                text.addEventListener('blur', () => {
                    text.style.visibility = 'hidden';
                    parrafo.innerText = text.value;
                    nota.setText(text.value);
                    parrafo.style.visibility = 'visible';
                    actualizarNota(nota.getId(), nota.getCoordX(), nota.getCoordY(), nota.getText());
                    actualizarLocalStorage();
                });

                text.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                        event.preventDefault();
                        text.style.visibility = 'hidden';
                        parrafo.innerText = text.value;
                        nota.setText(text.value);
                        parrafo.style.visibility = 'visible';
                        actualizarNota(nota.getId(), nota.getCoordX(), nota.getCoordY(), nota.getText());
                        actualizarLocalStorage();
                    }
                });
            });

            nuevoSticky.addEventListener('click', (event) => {
                pulsado = !pulsado;
                imagen = event.currentTarget;
                posicionImg = imagen.getBoundingClientRect();
                cordXresta = event.clientX - posicionImg.left;
                cordYResta = event.clientY - posicionImg.top;
                actualizarNota(nota.getId(), posicionImg.left, posicionImg.top, nota.getText());
                actualizarLocalStorage();
            });
        });
    };

    cargarNotasDesdeLocalStorage();

    
    
    
    var id = arrayDeNotas.notas.reduce(function (maxId, nota) {
        return Math.max(maxId, nota.id);
      }, 0);

    var id = arrayDeNotas.notas.length;
//CONTROLADOR
    const agregarSticky = (boton, stickyContainer,color) => {
            let nuevoSticky = stickyContainer.cloneNode(true);
            nuevoSticky.style.visibility='visible';
            nuevoSticky.style.top = '20%';
            nuevoSticky.style.left = '83%';
            main.appendChild(nuevoSticky);
            let objNote=new Note('','83%','20%',color,id++);
            arrayDeNotas.notas.push(objNote);
            
            let child = nuevoSticky.children;
            let close=child[2];
            let edit=child[1];
            let text=child[0];
            let parrafo=child[3];

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
                    actualizarNota(objNote.getId(),objNote.getCoordX(),objNote.getCoordY(),objNote.getText());
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
                        actualizarNota(objNote.getId(),objNote.getCoordX(),objNote.getCoordY(),objNote.getText());
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
                actualizarNota(objNote.getId(),posicionImg.left,posicionImg.top,objNote.getText())
                var objetoEnJSON = JSON.stringify(arrayDeNotas);
                localStorage.setItem('saveNotes', objetoEnJSON);
                console.log(objetoEnJSON)
            });
        
    };
//VISTA
    NewBlueSticky.addEventListener('click', () => agregarSticky(NewBlueSticky, blueSticky,'blue'));
    NewYellowSticky.addEventListener('click', () => agregarSticky(NewYellowSticky, yellowSticky,'yellow'));

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
    const notaToUpdate = arrayDeNotas.notas.find(nota => nota.id === id);
        if (notaToUpdate) {
            notaToUpdate.setCoordX(newCoordX);
            notaToUpdate.setCoordY(newCoordY);
            notaToUpdate.setText(newText);
            notaToUpdate.setColor(color);
        }
    };

    const borrarNota = (id) => {
        arrayDeNotas.notas = arrayDeNotas.notas.filter(nota => nota.id !== id);
    };
};

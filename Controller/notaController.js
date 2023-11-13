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
    var arrayDeNotas = JSON.parse(localStorage.getItem('notas'));
    if (arrayDeNotas==null){
        var arrayDeNotas = {
            'notas': []
          };
    }
    
    var id = arrayDeNotas.notas.reduce(function (maxId, nota) {
        return Math.max(maxId, nota.id);
      }, 0);

    var id = arrayDeNotas.notas.length;

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
                });
            
                text.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                        event.preventDefault(); 
                        text.style.visibility = 'hidden';
                        parrafo.innerText = text.value; 
                        objNote.setText(text.value);
                        parrafo.style.visibility='visible';

                    }
                });
                
            })

            nuevoSticky.addEventListener('click', (event) => {
                pulsado = !pulsado;
                imagen = event.currentTarget;  
                posicionImg = imagen.getBoundingClientRect();
                cordXresta = event.clientX - posicionImg.left;
                cordYResta = event.clientY - posicionImg.top;
                objNote.setCoordX(posLeft);
                objNote.setCoordY(posTop);
            });
        
    };

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
};

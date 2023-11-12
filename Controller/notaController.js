window.onload = () => {
    var id = 0;
    const NewBlueSticky = document.getElementById('createNoteBlue');
    const NewYellowSticky = document.getElementById('createNoteYellow');
    const blueSticky = document.querySelector('#BlueContainer');
    const yellowSticky = document.querySelector('#yellowContainer');
    const main = document.querySelector('main');
    var pulsado = false;
    var cordXresta = 0;
    var cordYResta = 0;
    var imagen;

    const agregarSticky = (trigger, stickyContainer) => {
        let visibility = window.getComputedStyle(stickyContainer).visibility;
        if (visibility == 'hidden') {
            stickyContainer.style.visibility = 'visible';
            stickyContainer.addEventListener('click', (ev) => {
                pulsado = !pulsado;
                imagen = stickyContainer;
                posicionImg = imagen.getBoundingClientRect();
                cordXresta = ev.clientX - posicionImg.left;
                cordYResta = ev.clientY - posicionImg.top;
            });
        } else {
            let nuevoSticky = stickyContainer.cloneNode(true);
            nuevoSticky.id = `contenedor${id++}`;
            nuevoSticky.style.top = '20%';
            nuevoSticky.style.left = '83%';
            main.appendChild(nuevoSticky);

            nuevoSticky.addEventListener('click', (event) => {
                pulsado = !pulsado;
                imagen = event.currentTarget;  // Utilizar el evento actual para obtener el elemento clicado
                posicionImg = imagen.getBoundingClientRect();
                cordXresta = event.clientX - posicionImg.left;
                cordYResta = event.clientY - posicionImg.top;
            });
        }
    };

    NewBlueSticky.addEventListener('click', () => agregarSticky(NewBlueSticky, blueSticky));
    NewYellowSticky.addEventListener('click', () => agregarSticky(NewYellowSticky, yellowSticky));

    document.addEventListener("mousemove", (e) => {
        cordX = e.clientX;
        cordY = e.clientY;
        if (pulsado && imagen) {
            imagen.style.top = ((cordY - cordYResta) / window.innerHeight) * 100 + "%";
            imagen.style.left = ((cordX - cordXresta) / window.innerWidth) * 100 + "%";
        }
    });
};

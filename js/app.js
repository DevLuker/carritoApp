//Variables
const carrito = document.querySelector('#carrito');
const listarCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    //Agregar un curso
    listarCursos.addEventListener('click', agregarCurso);

    //Eliminar curso
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    carrito.addEventListener('click', vaciarCarrito );
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();
    //El usuario presiona / click en agregar carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    const dataCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Verificar si ya existe el elemento en el carrito      
    const existe = articulosCarrito.some(curso => curso.id === dataCurso.id);
    if (existe) {
        //Actualizar
            const cursos = articulosCarrito.map(curso => {
            if(curso.id === dataCurso.id){               
                 curso.cantidad++;   
                 return curso;
            }else{
                return curso;
            }
        });        
        articulosCarrito = [...cursos];
    } else {
        //Agregar elementos al arreglo de carritos
        articulosCarrito = [...articulosCarrito, dataCurso];
    }
    carritoHTML();

}

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function vaciarCarrito(e){
    if(e.target.id === 'vaciar-carrito'){
        articulosCarrito = [];
        limpiarHTML();
    }
}

function carritoHTML() {

    //Limpiar el HTML para no generar datos duplicados
    limpiarHTML();

    //Recorrer el carrtito y generar el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

        `;
        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Limpiar los cursos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}
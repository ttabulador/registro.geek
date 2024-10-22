const registros = {
    cosplay: [],
    dibujo: [],
    baile: []
};

// Rellenar los desplegables de edad
function rellenarSelectEdad() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        for (let i = 1; i <= 99; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    rellenarSelectEdad();
});

// Navegar entre pantallas
function mostrarPantallaRegistro() {
    setActiveContainer('pantalla-registro');
}

function volverMenuPrincipal() {
    setActiveContainer('pantalla-principal');
}

function volverPantallaRegistro() {
    setActiveContainer('pantalla-registro');
}

// Cambia el contenedor activo
function setActiveContainer(containerId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(containerId).classList.add('active');
}

// Mostrar formularios
function mostrarFormulario(formularioId) {
    // Primero, volver al menú de registro
    volverPantallaRegistro();
    // Luego, activar el formulario seleccionado
    setActiveContainer(formularioId);
}

// Enviar formulario de cosplay
document.getElementById('cosplayForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombreApellido = e.target[0].value;
    const edad = e.target[1].value;
    const localidad = e.target[2].value;
    const cosplay = e.target[3].value;
    const musicaPresentacion = e.target[4].files[0]; // Captura el archivo MP3

    const reader = new FileReader();
    reader.onload = function (event) {
        registros.cosplay.push({ nombreApellido, edad, localidad, cosplay, musicaPresentacion: event.target.result });
        alert('Formulario de Cosplay enviado exitosamente.');
        volverPantallaRegistro();
        e.target.reset(); // Resetear el formulario
    };
    reader.readAsDataURL(musicaPresentacion);
});

// Enviar formulario de dibujo
document.getElementById('dibujoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombreApellido = e.target[0].value;
    const edad = e.target[1].value;
    const localidad = e.target[2].value;
    const musicaPresentacion = e.target[3].files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        registros.dibujo.push({ nombreApellido, edad, localidad, musicaPresentacion: event.target.result });
        alert('Formulario de Dibujo enviado exitosamente.');
        volverPantallaRegistro();
        e.target.reset();
    };
    reader.readAsDataURL(musicaPresentacion);
});

// Enviar formulario de baile
document.getElementById('baileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombreApellido = e.target[0].value;
    const nombreArtistico = e.target[1].value;
    const edad = e.target[2].value;
    const localidad = e.target[3].value;
    const musicaPresentacion = e.target[4].files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        registros.baile.push({ nombreApellido, nombreArtistico, edad, localidad, musicaPresentacion: event.target.result });
        alert('Formulario de Baile enviado exitosamente.');
        volverPantallaRegistro();
        e.target.reset();
    };
    reader.readAsDataURL(musicaPresentacion);
});

// Mostrar los registros del concurso seleccionado
function mostrarRegistros(concurso) {
    const registrosDisplay = document.getElementById('registros-display');
    registrosDisplay.innerHTML = `<h2>Registros de ${concurso.charAt(0).toUpperCase() + concurso.slice(1)}</h2>`;

    if (registros[concurso].length === 0) {
        registrosDisplay.innerHTML += '<p>No hay registros.</p>';
        return;
    }

    // Crear tabla
    let tabla = '<table><tr>';

    // Encabezados de tabla
    if (concurso === 'cosplay') {
        tabla += `<th>Nombre y Apellido</th><th>Edad</th><th>Localidad</th><th>Cosplay</th><th>Música de Presentación</th>`;
    } else if (concurso === 'dibujo') {
        tabla += `<th>Nombre y Apellido</th><th>Edad</th><th>Localidad</th><th>Música de Presentación</th>`;
    } else if (concurso === 'baile') {
        tabla += `<th>Nombre y Apellido</th><th>Nombre Artístico</th><th>Edad</th><th>Localidad</th><th>Música de Presentación</th>`;
    }

    tabla += '</tr>';

    // Agregar filas a la tabla
    registros[concurso].forEach(registro => {
        tabla += '<tr>';
        if (concurso === 'cosplay') {
            tabla += `<td>${registro.nombreApellido}</td><td>${registro.edad}</td><td>${registro.localidad}</td><td>${registro.cosplay}</td><td><a href="${registro.musicaPresentacion}" download>Descargar</a></td>`;
        } else if (concurso === 'dibujo') {
            tabla += `<td>${registro.nombreApellido}</td><td>${registro.edad}</td><td>${registro.localidad}</td><td><a href="${registro.musicaPresentacion}" download>Descargar</a></td>`;
        } else if (concurso === 'baile') {
            tabla += `<td>${registro.nombreApellido}</td><td>${registro.nombreArtistico}</td><td>${registro.edad}</td><td>${registro.localidad}</td><td><a href="${registro.musicaPresentacion}" download>Descargar</a></td>`;
        }
        tabla += '</tr>';
    });

    tabla += '</table>';
    registrosDisplay.innerHTML += tabla;
}
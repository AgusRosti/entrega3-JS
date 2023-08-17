// Obtener una referencia a los botones "Programa"
const botonesPrograma = document.querySelectorAll('.btn2-jardines, .btn2-organicos, .btn2-huerta, .btn2-interior');

// Event listener para cada botón "Programa"
botonesPrograma.forEach(boton => {
    boton.addEventListener('click', async () => {
        const idCurso = boton.dataset.id; // Obtener el ID del curso

        try {
            const response = await fetch('./scripts/cursos.json');
            const cursos = await response.json();

            const curso = cursos[idCurso];
            if (curso) {
                // Construir el contenido del SweetAlert con la información de los módulos
                const contenidoAlerta = `
                <h2>${curso.nombre}</h2>
                <h3>Módulos:</h3>
                <ul>
                    ${curso.modulos.map(modulo => `<li>${modulo.titulo}: ${modulo.contenido}</li>`).join('')}
                </ul>
                `;

                // Mostrar SweetAlert con la información y el icono de información
                Swal.fire({
                    icon: 'info',
                    title: 'Programa del Curso',
                    html: contenidoAlerta,
                    confirmButtonText: 'Cerrar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontró información para este curso.'
                });
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener la información del curso.'
            });
        }
    });
});
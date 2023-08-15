function cargarContenidoDesdeJSON(jsonFilePath) {
    fetch(jsonFilePath)
        .then((response) => response.json())
        .then((data) => {
            let programaHTML = "<h2>Programa del Curso</h2>";

            data.modulos.forEach((modulo, index) => {
                programaHTML += `
                <div class="modulo">
                <h3>Módulo ${index + 1}: ${modulo.titulo}</h3>
                <p>${modulo.contenido}</p>
                </div>
            `;
            });

            Swal.fire({
                html: programaHTML,
                icon: "info",
                confirmButtonText: "Cerrar"
            });
        })
        .catch((error) => {
            console.error("Error al cargar el programa del curso:", error);
            Toastify.error("Ocurrió un error al cargar el programa del curso.", {
                position: "bottom-right"
            });
        });
}

const btnPrograma = document.querySelector(".btn2-jardines");
btnPrograma.addEventListener("click", () => {
    cargarContenidoDesdeJSON("./scripts/jardines.json");
});

const btnProgramaOrganicos = document.querySelector(".btn2-organicos");
btnProgramaOrganicos.addEventListener("click", () => {
    cargarContenidoDesdeJSON("./scripts/organicos.json");
});

const btnProgramaHuerta = document.querySelector(".btn2-huerta");
btnProgramaHuerta.addEventListener("click", () => {
    cargarContenidoDesdeJSON("./scripts/huerta.json");
});

const btnProgramaInterior = document.querySelector(".btn2-interior");
btnProgramaInterior.addEventListener("click", () => {
    cargarContenidoDesdeJSON("./scripts/interior.json");
});
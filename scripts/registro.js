const btnIniciar = document.getElementById("sign-in");
const btnRegistro = document.getElementById("sign-up");
const formRegistros = document.querySelector(".registro");
const formIngresos = document.querySelector(".ingreso");

btnIniciar.addEventListener("click", () => toggleForms(formRegistros, formIngresos));
btnRegistro.addEventListener("click", () => toggleForms(formIngresos, formRegistros));

const toggleForms = (formToHide, formToShow) => {
    formToHide.classList.add("hide");
    formToShow.classList.remove("hide");
};

const formRegistro = document.getElementById("formNuevo");
const inputs = [
    { element: document.getElementById("usuarioNuevo"), error: 'Campo vacío' },
    { element: document.getElementById("contraseñaNuevo"), error: 'Campo vacío' },
    { element: document.getElementById("contraseña2Nuevo"), error: 'Repite tu contraseña' }
];

formRegistro.addEventListener('submit', (event) => {
    event.preventDefault();
    validarCampos();
});

const validarCampos = () => {
    quitarAvisos();
    let isValid = true;

    inputs.forEach(inputData => {
        const { element, error } = inputData;
        const valor = element.value.trim();

        if (!valor) {
            noValida(element, error);
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const usuarioValor = inputs[0].element.value.trim();
    const passValor = inputs[1].element.value.trim();
    const passValidaValor = inputs[2].element.value.trim();

    const passInput = inputs[1].element;
    const isPassValid = passValor.length >= 8;

    if (!isPassValid) {
        noValida(passInput, 'Debe tener 8 caracteres como mínimo');
        isValid = false;
    }

    if (passValor !== passValidaValor) {
        noValida(inputs[2].element, 'Las contraseñas no coinciden');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if (usuarioExisteEnLocalStorage(usuarioValor)) {
        noValida(inputs[0].element, 'El usuario ya existe. Prueba con otro nombre de usuario.');
    } else {
        validaOk(inputs.map(inputData => inputData.element));
        const nuevoUsuario = crearUsuario(usuarioValor, passValor);
        guardarUsuarioEnLocalStorage(nuevoUsuario);
        mostrarFormularioIngreso(); // Muestra el formulario de inicio de sesión
    }
};

const usuarioExisteEnLocalStorage = (nombreUsuario) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosGuardados.some(usuario => usuario.nombre === nombreUsuario);
};

const noValida = (input, msje) => {
    const formControl = input.parentElement;
    const aviso = formControl.querySelector('.aviso');
    aviso.innerText = msje;
    formControl.classList.remove('valido');
    formControl.classList.add('falla');
};

const validaOk = (inputElements) => {
    inputElements.forEach(input => {
        const formControl = input.parentElement;
        formControl.classList.remove('falla');
        formControl.classList.add('valido');
    });
};

const quitarAvisos = () => {
    const avisos = document.querySelectorAll('.aviso');
    avisos.forEach(aviso => {
        aviso.innerText = '';
    });

    const controles = document.querySelectorAll('.control-form');
    controles.forEach(control => {
        control.classList.remove('falla', 'valido');
    });
};

function crearUsuario(nombre, contraseña) {
    return {
        nombre: nombre,
        contraseña: contraseña
    };
}

function guardarUsuarioEnLocalStorage(usuario) {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosGuardados.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
}

function mostrarFormularioIngreso() {
    toggleForms(formRegistros, formIngresos);
}
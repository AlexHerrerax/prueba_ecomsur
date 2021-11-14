const formulario = document.getElementById("formulario");
const resultado = document.createElement('div');
const lista = document.querySelector('#lista');
const logo = document.querySelector("#logo");

//Se recibe evento click
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    lista.innerHTML = ""
    var input = document.getElementById("inputValue").value;

//Se valida input
    if (!input.trim()) {
        console.log("Error. Campo vacio")
        mostrarError("Campo vacío. Ingrese un País.")
        return;
    }
    //Se llama a la API y se limpia el input
    consultaApi(input);
    formulario.reset();

})

//Mensaje de Errores
const mostrarError = (mensaje) => {
    const errores = document.createElement('p');
    errores.textContent = mensaje
    errores.classList.add('error')
    lista.appendChild(errores)
    lista.appendChild(logo)

}

//Se llama a la API y se envían los resultados a la función "datos"
const consultaApi = async (pais) => {
    try {
        resultado.innerHTML = ""
        lista.innerHTML = ""
        const resp = await fetch(`https://restcountries.com/v3.1/name/${pais}`)
        const [data] = await resp.json()
        datos(data)
    } catch (error) {
        mostrarError("No existe el País ingresado.")
    }
}

//Se reciben los datos y se desestructuran
const datos = (data,) => {
    const [capital] = data.capital;
    const { common } = data.name;
    const { official } = data.name;
    const { region } = data;
    const [...borders] = data.borders;
    const { languages } = data;
    const lenguas = Object.values(languages).toString();
    const { currencies } = data;
    const paisDinamico = Object.keys(currencies).toString();
    const { name, symbol } = data.currencies[paisDinamico];
    const { png } = data.flags;
    const { png: escudo } = data.coatOfArms;

// Se llama a la Api nuevamente para obtener los países limítrofes
    const limistrofe = async () => {
        const resp = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
        const [...data] = await resp.json();
        const x = data.map(item => item.name.common);
        Limi(x);
    }

    limistrofe();

//Se consiguen todos los datos y son enviados a la función "mostrarDatos"
    const Limi = (x) => {
        const paisLimi = x;
        setTimeout(() => {
            mostrarDatos(capital, common, region, borders, lenguas, name, symbol, png, escudo, paisLimi, official)
        }, 1);
    }
}

const mostrarDatos = (capital, common, region, borders, lenguas, name, symbol, png, escudo, paisLimi, official) => {

    //Se coloca todo dentro del HTML
    resultado.innerHTML = `

    <div id="listas">

        <div id="cabecera">

            <div class="escudo">
                <img src=${escudo} alt="Escudo País" id="esc">
                <p>Escudo</p>
            </div>

            <div class="pais">
                <h2>${common}</h2>
            </div>

            <div class="bandera">
                <img src=${png} alt="Bandera País" id="ban">
                <p>Bandera</p>
            </div>
        </div>

        <div id="contenido">

            <ul>
                <li>
                    <p class="key">Nombre Oficial: <span class="valor">${official}</span></p>
                </li>
                <li>
                    <p class="key">Capital: <span class="valor">${capital}</span></p>
                </li>
                <li>
                    <p class="key">Región: <span class="valor">${region}</span></p>
                </li>
                <li>
                    <p class="key">Países Limítrofes: <span class="valor">${paisLimi}</span></p>
                </li>
                <li>
                    <p class="key">Lengua: <span class="valor">${lenguas}</span></p>
                </li>
                <li>
                    <p class="key">Nombre moneda: <span class="valor">${name}</span></p>
                </li>
                <li>
                    <p class="key">Símbolo: <span class="valor">${symbol}</span></p>
                </li>
            </ul>
        </div>
    </div>
    `
    //Se agrega al HTML
    lista.appendChild(resultado);

}





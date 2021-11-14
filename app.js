const formulario = document.getElementById("formulario");
const resultado = document.createElement('div');
const lista = document.querySelector('#lista');

const consultaApi = async (pais) => {
    try {
        resultado.innerHTML=""
        lista.innerHTML=""
        const resp = await fetch(`https://restcountries.com/v3.1/name/${pais}`)
        const [data] = await resp.json()
        console.log(data);
        datos(data)
    } catch (error) {
        console.log()
        mostrarError("No existe el pais ingresado.")
    }
}


const datos =(data) =>{
    const [capital] = data.capital;
    console.log("Capital : " + capital)

    const { common } = data.name;
    console.log("Nombre oficial: " + common)

    const { region } = data;
    console.log("Region: " + region)

    const [...borders] = data.borders;
    console.log(borders.toString())
    console.log(borders)

    const { languages } = data;
    const lenguas = Object.values(languages).toString();
    console.log(lenguas)
    
    const {currencies} = data;
    const paisDinamico = Object.keys(currencies).toString();
    
    const {name, symbol} = data.currencies[paisDinamico];
    console.log("Nombre moneda: "+name+ ", Simbolo: "+symbol)

    const{png} = data.flags
    console.log(png)

    const{png:escudo} = data.coatOfArms
    console.log(escudo)

    mostrarDatos(capital, common, region, borders, lenguas, name, symbol, png, escudo)

}

const mostrarDatos =(capital, common, region, borders, lenguas, name, symbol, png,escudo)=>{
    
    

    /* const liCapital = document.createElement('p');
    liCapital.classList.add('rojo')
    liCapital.innerHTML=`<h1>Capital: ${capital}</h1>`
    lista.appendChild(liCapital) */

    

 /*    resultado.innerHTML= `
    <p class="rojo">Capital: ${capital}</p>
    <p class="rojo">Nombre Pais: ${official}</p>
    <p class="rojo">Region: ${region}</p>
    <p class="rojo">Paises Lim: ${borders}</p>
    <p class="rojo">Lenguaje: ${lenguas}</p>
    <p class="rojo">Nombre moneda: ${name}</p>
    <p class="rojo">Simbolo: ${symbol}</p>
    <img src=${png} alt="Bandera">
    ` */


    resultado.innerHTML = `

    <div id="ejemplo">

    <div id="cabecera">

        <div class="escudo">
            <img src=${escudo} alt="Escudo Pais" id="esc">
            <p>Escudo</p>

        </div>




        <div class="pais">
            <h2>${common}</h2>
        </div>




        <div class="bandera">
            <img src=${png} alt="Bandera Pais" id="ban">
            <p>Bandera</p>
        </div>
    </div>

    <div id="contenido">

        <ul>
            <li>
                <p class="key">Capital: <span class="valor">${capital}</span></p>
            </li>
            <li>
                <p class="key">Region: <span class="valor">${region}</span></p>
            </li>
            <li>
                <p class="key">Paises Limestrofes: <span class="valor">${borders}</span></p>
            </li>
            <li>
                <p class="key">Lengua: <span class="valor">${lenguas}</span></p>
            </li>
            <li>
                <p class="key">Nombre moneda: <span class="valor">${name}</span></p>
            </li>
            <li>
                <p class="key">Simbolo: <span class="valor">${symbol}</span></p>
            </li>
        </ul>


    </div>


    `

    lista.appendChild(resultado);
    

}

const mostrarError =(mensaje) =>{
    const errores = document.createElement('p');
    errores.textContent=mensaje
    errores.classList.add('error')
    lista.appendChild(errores)
    
}


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    lista.innerHTML=""
    var input = document.getElementById("inputValue").value;

    if(!input.trim()){
        console.log("Error. Campo vacio")
        mostrarError("Campo vacio. Ingrese un pais.")
        return;
    }

    consultaApi(input);
    //e.target.reset();
    formulario.reset();

    

    

});
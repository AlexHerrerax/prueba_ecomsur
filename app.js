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
        mostrarError("No existe el pais ingresado")
    }
}


const datos =(data) =>{
    const [capital] = data.capital;
    console.log("Capital : " + capital)

    const { official } = data.name;
    console.log("Nombre oficial: " + official)

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

    mostrarDatos(capital, official, region, borders, lenguas, name, symbol, png)

}

const mostrarDatos =(capital, official, region, borders, lenguas, name, symbol, png)=>{
    
    

    /* const liCapital = document.createElement('p');
    liCapital.classList.add('rojo')
    liCapital.innerHTML=`<h1>Capital: ${capital}</h1>`
    lista.appendChild(liCapital) */

    

    resultado.innerHTML= `
    <p class="rojo">Capital: ${capital}</p>
    <p class="rojo">Nombre Pais: ${official}</p>
    <p class="rojo">Region: ${region}</p>
    <p class="rojo">Paises Lim: ${borders}</p>
    <p class="rojo">Lenguaje: ${lenguas}</p>
    <p class="rojo">Nombre moneda: ${name}</p>
    <p class="rojo">Simbolo: ${symbol}</p>
    <img src=${png} alt="Bandera">
    `

    lista.appendChild(resultado);
    

}

const mostrarError =(mensaje) =>{
    const errores = document.createElement('p');
    errores.textContent=mensaje
    lista.appendChild(errores)
    
}


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    lista.innerHTML=""
    var input = document.getElementById("inputValue").value;

    if(!input.trim()){
        console.log("Error. Campo vacio")
        mostrarError("Campo vacio")
        return;
    }

    consultaApi(input);
    //e.target.reset();
    formulario.reset();

    

    

});
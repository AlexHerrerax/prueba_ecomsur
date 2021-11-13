const boton = document.getElementById("boton");

const consultaApi = async (pais) => {

    const resp = await fetch(`https://restcountries.com/v3.1/name/${pais}`)
    const [data] = await resp.json()
    console.log(data);

    datos(data)

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

    mostrarDatos(capital, official, region, borders, lenguas, currencies, name, symbol, png)


}





boton.addEventListener("click", () => {
    var input = document.getElementById("inputValue").value;

    consultaApi(input);

    

    

});
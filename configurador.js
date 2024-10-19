//Listener que se encarga de lazar el js cuando se pulsa el boton
document.getElementById("boton")?.addEventListener("click", comprobarCampos);

//Esta funcion se encarga de comprobar que todos los campos requeridos sean seleccionados
function comprobarCampos(){
    const tipoMotor = document.getElementsByName("tipoMotor");
    const potencia = document.getElementsByName("potencia");
    const pintura = document.getElementsByName("pintura");
    const color = document.getElementsByName("color");

    // Esta función  verifica si se ha seleccionado alguna opción en el grupo
    function isSelected(inputs) {
        return Array.from(inputs).some(input => input.checked);
    }

    if (!isSelected(tipoMotor)) {
        alert("Debes seleccionar un tipo de motor.");
        return;
    }
    if (!isSelected(potencia)) {
        alert("Debes seleccionar una potencia.");
        return;
    }
    if (!isSelected(pintura)) {
        alert("Debes seleccionar un tipo de pintura.");
        return;
    }
    if (!isSelected(color)) {
        alert("Debes seleccionar un color de pintura.");
        return;
    }

    // Llamamos a configurador solo si todas las validaciones son correctas
    configurador();
}

async function configurador() {
    let parrafo = document.getElementsByTagName('p')[0];
    
    let tipoMotor = document.querySelector('input[name="tipoMotor"]:checked').id;
    let potenciaSeleccionada = document.querySelector('input[name="potencia"]:checked').id;
    let pinturaSeleccionada = document.querySelector('input[name="pintura"]:checked').id;
    let colorSeleccionado = document.querySelector('input[name="color"]:checked').id;
    let aleron = document.getElementById("aleron");
    let radio = document.getElementById("radio");
    let altavoces = document.getElementById("altavoces");
    let gps = document.getElementById("gps");

    let precioMotor = calculaPrecioMotor(tipoMotor);
    let precioPotencia = calculaPrecioPotencia(tipoMotor, potenciaSeleccionada);
    let precioPintura = calculaPrecioPintura(pinturaSeleccionada);
    let comprobarColor = comprobarColorSeleccionadoFabricar(pinturaSeleccionada, colorSeleccionado);
    let precioAleron = calculaPrecioAleron(aleron, pinturaSeleccionada);
    let precioRadio = calculaPrecioRadio(radio);
    let precioAltavoces = calculaPrecioAltavoces(radio, altavoces);
    let preciogps = calculaPrecioGps(gps);

    // Calculamos el total
    let total = precioMotor + precioPotencia + precioPintura + precioAleron + precioRadio + precioAltavoces + preciogps;

    // Mostramos el precio total
    if(precioPotencia != -1 && comprobarColor == true ){
        parrafo.innerHTML = `El precio total es ${total}`;
    }else{
        parrafo.innerHTML = 'Configuracion no disponible'
    }
    
}


//Funcion que calcula el precio que recine de un radius devuleve un precio de tipo numero
function calculaPrecioMotor(tipoMotor){
    
    if(tipoMotor == 'gasolina') return 7500
    return 9200
}
/*Esta funcion calcula el precio de la potencia seleccionada ademas
comprueba que no se escoja un motor (Diesel 2300) ya que este no 
se puede fabricar
*/
function calculaPrecioPotencia(tipoMotor,potenciaSeleccionada){
    if(tipoMotor == 'diesel' && potenciaSeleccionada == 2300){
        alert("No se puede fabricar un motor diesel de 2300")
        return -1;
    } else{
        switch(potenciaSeleccionada){
            case '1200':
            return 900
            break;
            case '1900':
            return 2100
            break;
            case '2300':
            return 2600
            break;
        }
    }
}
//Esta funcion calcula el precio de la pintura seleccionada
function calculaPrecioPintura(pinturaSeleccionada){
    switch(pinturaSeleccionada){
        case 'normal':
        return 750
        break;
        case 'mate':
        return 1400
        break;
        case 'metalizado':
        return 1580
        break;
    }
}
//Esta funcion comprueba que el color seleccionado se pueda seleccionar
function comprobarColorSeleccionadoFabricar(pinturaSeleccionada,colorSeleccionado){
    if(pinturaSeleccionada == 'normal'){
        switch(colorSeleccionado){
            case 'azul':
                alert('Este color no se puede seleccionar con pintura normal')
                return false
                break;
            case 'verde':
                alert('Este color no se puede seleccionar con pintura normal')
                return false
                break;
            case 'gris':
                alert('Este color no se puede seleccionar con pintura normal')
                return false
                break;
        }
    }
    return true
}

//Este metodo calcula el precio del aleron y comprueba que este se pueda instalar en el coche
function calculaPrecioAleron(aleron,pinturaSeleccionada){
    if(aleron.checked){
        if(pinturaSeleccionada != 'metalizado') {
            alert('El aleron solo se puede montar con pintura metalizada')
            return 0
        }
        return 190
    }
    return 0
}
//Calcula el precio de la radio
function calculaPrecioRadio(radio){
    if(radio.checked) return 230
    return 0
}

//Calcula el precio de los altavoces y comprueba que se pueda instalar en el coche
function calculaPrecioAltavoces(radio,altavoces){
    if(altavoces.checked){
        if(!radio.checked){
            alert('Los altavoces no se pueden montar sin antes montar la radio')
            return 0
        }
        return 530
    }
    return 0
}

//Calcula el precio del gps
function calculaPrecioGps(gps){
    if(gps.checked) return 520;
    return 0
}
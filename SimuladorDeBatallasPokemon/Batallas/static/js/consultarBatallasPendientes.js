async function consultarBatallasPendientes() {
    console.log("consultarBatallasPendientes");
    let url = "/batallas/consultar_batallas_pendientes";

    const respuesta = await fetch(url);
    const resultados = await respuesta.json();

    if (respuesta.ok) {
        console.log("resultados: ", resultados);

        if (resultados) {
            let idsBatallasPendientes = resultados['idsBatallasPendientes'];

            idsBatallasPendientes.forEach(id => {
                if (!localStorage.getItem(`ventanasAbiertas_${id}`)) {
                    let url = `/batallas/batalla_${id}`;
                    window.open(url, "_blank");
                    localStorage.setItem(`ventanasAbiertas_${id}`, true);
                    console.log("batalla encontrada con id: ", id);
                }
                else {
                    console.log("intentando abrir ventana repetida...");
                }
            });
        }
    }
}

//setInterval(consultarBatallasPendientes, 20000);

//export {consultarBatallasPendientes};
function mostrarNotificacionDeInvitacion(mensaje) {
    const notificacion = document.getElementById('notificacion');
    const mensajeElemento = document.getElementById('mensaje');

    const botonRedireccionAInvitaciones = document.getElementById("redireccionAInvitaciones");
    botonRedireccionAInvitaciones.addEventListener("click", function() {
      window.location.href = "/batallas/invitaciones_pendientes/";
      //detenerNotificacionesDeInvitacion(invervaloParaEnvioDeNotificaciones);
    });

    mensajeElemento.textContent = mensaje;
    notificacion.style.display = 'block'; // muestra la notificacion

    const cerrarBoton = document.getElementById('cerrar');
    cerrarBoton.addEventListener('click', function() {
      notificacion.style.display = 'none'; // Oculta la notificación al hacer clic en el botón
    });

}


function detenerNotificacionesDeInvitacion(idIntervalo) {
  clearInterval(idIntervalo);
  idIntervalo = null;
}

  // Función para manejar el evento de inicio del arrastre
function dragStart(event) {
  // Guardar la posición inicial del mouse
  event.dataTransfer.setData('text/plain', (event.clientX - notificacion.offsetLeft) + ',' + (event.clientY - notificacion.offsetTop));
}

// Función para manejar el evento de arrastre
function dragging(event) {
  // Calcular la nueva posición del div de la notificación
  const [offsetX, offsetY] = event.dataTransfer.getData('text/plain').split(',');
  notificacion.style.left = (event.clientX - parseInt(offsetX, 10)) + 'px';
  notificacion.style.top = (event.clientY - parseInt(offsetY, 10)) + 'px';
}


export {mostrarNotificacionDeInvitacion};
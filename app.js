/**
 * Ejemplo de uso de la IA Gemini con HTML/CSS y Javascript
 */

function enviarMensajeApi(mensaje) {

    data = { contents: [{ parts: [{ text: mensaje}]}] };

    $.ajax({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCJFY1Qt23EWHBh6Ztopb89xwN_mjAcBls",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json",
        success: function (respuesta) {
            mensaje = respuesta.candidates[0].content.parts[0].text;
            insertarMensajeRespuestaAI(mensaje);
        },
        error: function(error){
            alert( "Ocurrió un error al intentar contactar con la IA" );
        }
    });
}

function insertarMensaje() {
    mensaje = $('#entrada_mensaje').val()

    // Verifica si el mensaje está vacio
    if ($.trim(mensaje) == '') {
        return false;
    }

    // Ingresa mensaje en chat
    $('<div class="mensaje_propio">' + mensaje + '</div>').appendTo($(".mensajes"));

    enviarMensajeApi(mensaje)

    // Remueve valor de entrada
    $('#entrada_mensaje').val(null)
    scrollMensajes();
}

function insertarMensajeRespuestaAI(mensaje) {
    // Ingresa mensaje en chat
    $('<div class="mensaje">' + mensaje + '</div>').appendTo($(".mensajes"));
    scrollMensajes();
}

// Baja hasta el fondo con nuevos mensajes
function scrollMensajes() {
    $('.mensajes').animate({
        scrollTop: $('.mensajes').get(0).scrollHeight
    }, 500);
}

// Tecla de enter para enviar mensajes
$(window).on('keydown', function(e) {
    if (e.which == 13) {
        insertarMensaje();
        return false;
    }
})

// Boton de enviar mensajes
$("#btn_enviar_mensaje").on('click', insertarMensaje)
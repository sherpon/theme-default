import { getPriceFormat } from '../tools'

export const culqi = (storeName, shortDescription, cart, publicKey, callback) => {
  Culqi.publicKey = publicKey

  Culqi.settings({
    title: storeName,
    currency: cart.total.currency,
    description: shortDescription,
    amount: ( (getPriceFormat(cart.total.price)) * 100 )
  })

  // Abre el formulario con las opciones de Culqi.settings
  Culqi.open()
  //e.preventDefault()
  // Recibimos el token desde los servidores de Culqi
  window.culqi = function () {
    callback()
  }
}

/*

Tarjetas de prueba
===================
Visa              4111 1111 1111 1111   09/2020   123   Venta exitosa
Master Card       5111 1111 1111 1118   06/2020   039   Venta exitosa
American Express  3712 1212 1212 122    11/2020   2841  Venta exitosa
Diners Club       360012 1212 1210      04/2020   964   Venta exitosa

Tarjetas con respuestas y errores específicos
==============================================
Visa              4000 0200 0000 0000   10/2019   354   stolen_card
Visa              4000 0300 0000 0009   08/2018   836   lost_card
Visa              4000 0400 0000 0008   03/2021   295   insufficient_funds
MasterCard        5400 0000 0000 0005   01/2022   492   contact_issuer
MasterCard        5400 0100 0000 0004   02/2020   784   invalid_cvv
MasterCard        5400 0200 0000 0003   07/2022   203   incorrect_cvv
American Express  3700 010000 00000     06/2019   1701  too_many_attempts_cvv
American Express  3700 010000 00000     04/2021   2511  issuer_not_available
American Express  3700 020000 00008     05/2022   1810  issuer_decline_operation
Diners Club       3600 000000 0008      09/2019   683   invalid_card
Diners Club       3600 010000 0007      12/2018   820   processing_error
Diners Club       3600 020000 0006      01/2020   230   fraudulent

 */

$(document).ready(function(){

    // Link API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

    // Creiamo un calendario dinamico con le festività.
    // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

    // Milestone 1
    // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

    // 1. creo un oggetto moment sulla data di partenza
    var dataDiPartenza = moment('2018-01-01');

    // 2. ne mostro mese e anno
    var meseDiPartenza = moment(dataDiPartenza).month();
    var annoDiPartenza = moment(dataDiPartenza).year();
    // per inserirli nell'h1 però devo usare format perchè altrimenti restituisce un numero
    $('h1#mese').html(dataDiPartenza.format('MMMM' + ' ' + 'YYYY'));

    // 5. creiamo una funzione dove racchiudere tutto con un argomento (data di partenza)

    // creiamo nuova fz per le festività

    // metodo ajax per la API
    // inserisco nuova coppia chiave / valore in data per le key
    // in success ciclo for o each
    //
    // cambiare valore di un attributo con attr e due parametri

    // Milestone 2
    // Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
    // Attenzione!
    // Ogni volta che cambio mese dovrò:
    // Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
    // Controllare quanti giorni ha il mese scelto formando così una lista
    // Chiedere all’API quali sono le festività per il mese scelto
    // Evidenziare le festività nella lista

    // BONUS: grafica

});

// ----- funzioni ----- //

// funzione addZero per aggiungere uno 0 ai numeri di una sola cifra
function addZero(giorno){
    if (giorno < 10){
        return '0' + giorno;
    } else {
        return giorno;
    }
}

// funzione per implementare il calendario con i giorni
function inserisciGiorni(dataDiPartenza){
    // 3. memorizzo in una variabile i giorni all'interno di un mese
    var giorniDelMese = moment(dataDiPartenza).daysInMonth();

    // 4. con un ciclo for e handlebars creo i giorni di gennaio
    for (var i = 1; i <= giorniDelMese; i++) {
        console.log('Ciao');
        var source = $("#date-template").html();
        var template = Handlebars.compile(source);

        var context = {             // personalizzo il context creando un oggetto
            'day': addZero(i),      // funzione addZero per aggiungere uno 0 ai numeri di una sola cifra
            'month': dataDiPartenza.format('MMMM'),
            // dataCompleta: annoDiPartenza + '-' + meseDiPartenza + '-' + i
        };
        var html = template(context);
        $('#elenco-date').append(html);
    }
}

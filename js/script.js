$(document).ready(function(){

    // 1. creo un oggetto moment sulla data di partenza
    var dataDiPartenza = moment('2018-01-01');

    // 5. creiamo una funzione dove racchiudere tutto con un argomento (data di partenza)
    inserisciGiorni(dataDiPartenza);

    // 6. creiamo nuova fz per integrare le festività
    inserisciFeste(dataDiPartenza);

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
function inserisciGiorni(data){
    // 2. ne mostro mese e anno
    var meseDiPartenza = moment(data).month() + 1;
    var annoDiPartenza = moment(data).year();
    console.log(annoDiPartenza);
    // per inserirli nell'h1 però devo usare format perchè altrimenti restituisce un numero
    $('h1#mese').html(data.format('MMMM' + ' ' + 'YYYY'));

    // 3. memorizzo in una variabile i giorni all'interno di un mese
    var giorniDelMese = moment(data).daysInMonth();

    // 4. con un ciclo for e handlebars creo i giorni di gennaio
    for (var i = 1; i <= giorniDelMese; i++) {
        var source = $("#date-template").html();
        var template = Handlebars.compile(source);

        var context = {             // personalizzo il context creando un oggetto
            'day': addZero(i),      // funzione addZero per aggiungere uno 0 ai numeri di una sola cifra
            'month': data.format('MMMM'),
            'dataCompleta': annoDiPartenza + '-' + addZero(meseDiPartenza) + '-' + addZero(i)
        };
        var html = template(context);
        $('#elenco-date').append(html);
    }
}

// funzione per integrare le festività
function inserisciFeste(data){
    // metodo ajax per la API
    $.ajax(
        {
            url:'https://flynn.boolean.careers/exercises/api/holidays',
            method:'GET',
            data:{          // inserisco nuova coppia chiave / valore in data per le key
                year:data.year(),
                month:data.month()
            },
            success:function(risposta){
                // OPZIONE 1 CON CICLO FOR
                for (var i = 0; i < risposta.response.length; i++) {    // perchè non riprendiamo la i all'interno del ciclo?
                    console.log('ciao');
                    var listItem = $('li[data-completa="' + risposta.response[i].date + '"]');
                    console.log(listItem);
                    listItem.append('- ' + risposta.response[i].name);
                    listItem.addClass('festivita');
                };
                // OPZIONE 2 CON EACH??
            },
            error: alert('Si è verificato un errore')
        }
    )
}

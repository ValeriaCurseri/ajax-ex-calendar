$(document).ready(function(){

    // var dataDiPartenza = moment("2018-01-01");
    var dataDiPartenza = moment($('h1#mese').attr('data-partenza')); // MEMORIZZO l'attributo data-partenza del tag h1 e lo considero come data di partenza per generare le date

    inserisciDate(dataDiPartenza);

    inserisciFesta(dataDiPartenza);

    $('#next').click(function(){
        next(dataDiPartenza);
    })

    $('#prev').click(function(){
        prev(dataDiPartenza);
    })



});

// --- funzioni --- //

function addZero(n){
    if (n < 10){
        return '0' + n;
    }
    return n;
}

function inserisciDate(data){
    $('ul#calendario').empty();                         // svuoto l'elenco ul prima di riempirlo

    var giorniTotali = data.daysInMonth();              // calcolo i giorni totali in un mese

    var meseParola = data.format('MMMM');       // memorizzo in una variabile il nome del mese
    var anno = data.year();                     // memorizzo in una variabile l'anno

    $('h1#mese').html(meseParola + ' ' + anno);         // implemento l'h1 con mese e anno

    for (var i = 1; i <= giorniTotali; i++){            // ciclo tutti i giorni del mese
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        var context = {                                 // vado a implementare con handlebars
            giorno: addZero(i),                         // i giorni
            mese: meseParola,                           // i mesi in parola
            dataCompleta: anno + '-' + data.format('MM') + '-' + addZero(i) // la data completa nel tag (servirà per il controllo delle festività)
        };
        var html = template(context);

        $('#calendario').append(html);                  // appendo gli li nell'ul appena ripulito
    }
}

function inserisciFesta(data){
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method:'GET',
            data:{                  // inserisco le due chiavi dell'API
                year: data.year(),
                month: data.month()
            },
            success: function(risposta){
                for (var i = 0; i < risposta.response.length; i++){                             // ciclo l'array delle festività
                    var elemento = $('li[data-completa="' + risposta.response[i].date + '"]');  // memorizzo gli li corrispondenti alla festività
                    elemento.addClass('festa');                                                 // aggiungo la class festa
                    elemento.find('.festività').text(risposta.response[i].name);                         // appendo il nome della festa dopo la data
                }
            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    );
}

function next(data){
    if (data.month() == 11){            // se il mese è dicembre
        alert('Non puoi proseguire');
    } else {                            // altrimenti
        data.add(1, 'months');          // aggiungo un mese alla data di partenza
        inserisciDate(data);            // ri-eseguo la fz
        inserisciFesta(data);           // ri-eseguo la fz
    }
}

function prev(data){
    if (data.month() == 0){             // se il mese è gennaio
        alert('Non puoi proseguire');
    } else {                            // altrimenti
        data.subtract(1, 'months');     // tolgo un mese alla data di partenza
        inserisciDate(data);            // ri-eseguo la fz
        inserisciFesta(data);           // ri-eseguo la fz
    }
}

const dataFine = new Date('June 11, 2026 12:25:00').getTime();
const giorniFestivi = ['2026-06-01', '2026-06-02'];
let modalitaCorrente = 'all';

function setMode(modalita) {
    modalitaCorrente = modalita;
    document.getElementById('btn-tutti').classList.toggle('attivo', modalita === 'all');
    document.getElementById('btn-scuola').classList.toggle('attivo', modalita === 'school');
    aggiorna();
}

function aggiorna() {
    const adesso = new Date();
    const differenza = dataFine - adesso.getTime();

    if (differenza <= 0) {
        document.querySelector('.timer-principale').innerHTML = "<div style='grid-column: span 4; font-size: 32px; font-weight: 900; text-align: center;'>LIBERI!</div>";
        return;
    }

    let giorni, ore, minuti, secondi, settimane;

    if (modalitaCorrente === 'all') {
        giorni = Math.floor(differenza / 86400000);
        ore = Math.floor((differenza % 86400000) / 3600000);
        minuti = Math.floor((differenza % 3600000) / 60000);
        secondi = Math.floor((differenza % 60000) / 1000);
        settimane = (differenza / (86400000 * 7)).toFixed(1);
    } else {
        let giorniScuola = 0;
        let dataTemp = new Date(adesso);
        dataTemp.setHours(0,0,0,0);
        const giornoFine = new Date(dataFine);
        giornoFine.setHours(0,0,0,0);

        while (dataTemp <= giornoFine) {
            const giornoSettimana = dataTemp.getDay();
            const dataISO = dataTemp.toISOString().split('T')[0];
            if (giornoSettimana !== 0 && giornoSettimana !== 6 && !giorniFestivi.includes(dataISO)) {
                giorniScuola++;
            }
            dataTemp.setDate(dataTemp.getDate() + 1);
        }

        giorni = giorniScuola > 0 ? giorniScuola - 1 : 0;
        ore = Math.floor((differenza % 86400000) / 3600000);
        minuti = Math.floor((differenza % 3600000) / 60000);
        secondi = Math.floor((differenza % 60000) / 1000);
        settimane = (giorniScuola / 5).toFixed(1);
    }

    document.getElementById('display-giorni').innerText = giorni;
    document.getElementById('display-ore').innerText = ore.toString().padStart(2, '0');
    document.getElementById('display-minuti').innerText = minuti.toString().padStart(2, '0');
    document.getElementById('display-secondi').innerText = secondi.toString().padStart(2, '0');
}

setInterval(aggiorna, 1000);
aggiorna();
const targetDate = new Date('June 11, 2026 12:25:00').getTime();
const holidays = ['2026-06-01', '2026-06-02'];
let currentMode = 'all';

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-all').classList.toggle('active', mode === 'all');
    document.getElementById('btn-school').classList.toggle('active', mode === 'school');
    refresh();
}

function refresh() {
    const now = new Date();
    const diff = targetDate - now.getTime();

    if (diff <= 0) {
        document.querySelector('.main-timer').innerHTML = "<div style='grid-column: span 4; font-size: 32px; font-weight: 900; text-align: center;'>LIBERI!</div>";
        return;
    }

    let d, h, m, s, w;

    if (currentMode === 'all') {
        d = Math.floor(diff / 86400000);
        h = Math.floor((diff % 86400000) / 3600000);
        m = Math.floor((diff % 3600000) / 60000);
        s = Math.floor((diff % 60000) / 1000);
        w = (diff / (86400000 * 7)).toFixed(1);
    } else {
        let schoolDays = 0;
        let tempDate = new Date(now);
        tempDate.setHours(0,0,0,0);
        const endDay = new Date(targetDate);
        endDay.setHours(0,0,0,0);

        while (tempDate <= endDay) {
            const day = tempDate.getDay();
            const iso = tempDate.toISOString().split('T')[0];
            if (day !== 0 && day !== 6 && !holidays.includes(iso)) {
                schoolDays++;
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }

        d = schoolDays > 0 ? schoolDays - 1 : 0;
        h = Math.floor((diff % 86400000) / 3600000);
        m = Math.floor((diff % 3600000) / 60000);
        s = Math.floor((diff % 60000) / 1000);
        w = (schoolDays / 5).toFixed(1);
    }

    document.getElementById('display-d').innerText = d;
    document.getElementById('display-h').innerText = h.toString().padStart(2, '0');
    document.getElementById('display-m').innerText = m.toString().padStart(2, '0');
    document.getElementById('display-s').innerText = s.toString().padStart(2, '0');
    document.getElementById('display-w').innerText = w;
}

setInterval(refresh, 1000);
refresh();
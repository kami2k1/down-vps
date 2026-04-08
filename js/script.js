class CountdownTimer {
    constructor(targetDateStr) {
        this.targetDate = new Date(targetDateStr).getTime();
        this.startDate = new Date('2025-05-17T00:00:00').getTime();
        
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            progressBar: document.getElementById('progress-bar')
        };
        
        this.init();
    }
    
    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.setElements('00', '00', '00', '00');
            this.elements.progressBar.style.width = '100%';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.setElements(
            this.formatNumber(days),
            this.formatNumber(hours),
            this.formatNumber(minutes),
            this.formatNumber(seconds)
        );
        
        const totalDuration = this.targetDate - this.startDate;
        const passedDuration = now - this.startDate;
        let progressPercent = (passedDuration / totalDuration) * 100;
        progressPercent = Math.min(Math.max(progressPercent, 0), 100);
        
        this.elements.progressBar.style.width = `${progressPercent}%`;
    }
    
    setElements(d, h, m, s) {
        if(this.elements.days.textContent !== d) this.elements.days.textContent = d;
        if(this.elements.hours.textContent !== h) this.elements.hours.textContent = h;
        if(this.elements.minutes.textContent !== m) this.elements.minutes.textContent = m;
        if(this.elements.seconds.textContent !== s) this.elements.seconds.textContent = s;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer('2026-05-17T00:00:00');
});

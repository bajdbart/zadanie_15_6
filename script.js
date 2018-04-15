class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        };
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        };
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        };
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetStoper() {
        this.stop();
        this.reset();
        this.print();
    }

    addResult() {
        const element = document.createElement('li');
        element.innerHTML = `${pad0(this.times.minutes)}:${pad0(this.times.seconds)}:${pad0(Math.floor(this.times.miliseconds))}`;
        document.querySelector('.results').appendChild(element);
    }

    clearResults() {
        const list = document.querySelector('.results').querySelectorAll('li');
        const listArr = Array.from(list);

        listArr.forEach(function (el) {
            document.querySelector('.results').removeChild(el);
        });
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));

// Listeners
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetStoper());

const resButton = document.getElementById('res');
resButton.addEventListener('click', () => stopwatch.addResult());

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clearResults());

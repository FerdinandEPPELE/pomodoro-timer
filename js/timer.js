// Déclaration des variables
let timer;
let minutes = 0;
let seconds = 2;

// Récupération des boutons
const startButton = document.querySelector('button:nth-of-type(1)');
const pauseButton = document.querySelector('button:nth-of-type(2)');
const stopButton = document.querySelector('button:nth-of-type(3)');
const libelleTravail = document.getElementById("travail");
const libellePause = document.getElementById("pause");

libellePause.style.visibility = 'hidden'

// Fonction pour mettre à jour l'affichage du chronomètre
function updateTimerDisplay() {
  const timerDisplay = document.querySelector('#timer-display');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer le chronomètre
function startTimer() {
  timer = setInterval(function () {
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        clearInterval(timer);
        switchTimer();
      }
    }
    updateTimerDisplay();
  }, 1000);

  // Désactiver le bouton "Start" et activer le bouton "Pause"
  startButton.setAttribute('disabled', 'true');
  pauseButton.removeAttribute('disabled');

}

// Fonction pour mettre en pause le chronomètre
function pauseTimer() {
  clearInterval(timer);

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
}

// Fonction pour réinitialiser le chronomètre
function stopTimer() {
  clearInterval(timer);
  minutes = 0;
  seconds = 5;
  updateTimerDisplay();

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
}

//Fonction pour switch en le temps de pause et le temps de travail.
function switchTimer() {
    if(minutes == 0 && seconds == 0 && libellePause.style.visibility == 'hidden') {
        libelleTravail.style.visibility = 'hidden'
        libellePause.style.visibility = 'visible'
        minutes = 0;
        seconds = 2;
        startButton.removeAttribute('disabled');
    } else {
        if(minutes == 0 && seconds == 0 && libelleTravail.style.visibility == 'hidden') {
            libelleTravail.style.visibility = 'visible'
            libellePause.style.visibility = 'hidden'
            minutes = 0;
            seconds = 2;
            startButton.removeAttribute('disabled');
        }
    }
}

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

// Appel initial pour afficher le temps initial
updateTimerDisplay();

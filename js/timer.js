// Déclaration des variables
let timer;
let minutes = 0;
let seconds = 2;
let isRunning = false;

// Récupération des boutons et du libellé
const startButton = document.querySelector('button:nth-of-type(1)');
const pauseButton = document.querySelector('button:nth-of-type(2)');
const stopButton = document.querySelector('button:nth-of-type(3)');
const libelleTravail = document.getElementById("travail");
const libellePause = document.getElementById("pause");

libellePause.style.visibility = 'hidden';
pauseButton.setAttribute('disabled', 'true');

// Fonction pour mettre à jour l'affichage du chronomètre
function updateTimerDisplay() {
  const timerDisplay = document.querySelector('#timer-display');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer ou réinitialiser le chronomètre
function startOrResetTimer() {
  if (isRunning) {
    clearInterval(timer);
    minutes = 0;
    seconds = 2;
    updateTimerDisplay();
    isRunning = false;
    startButton.textContent = "Start";
  } else {
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

    isRunning = true;
    startButton.textContent = "Reset";
  }

  // Activer ou désactiver les boutons en conséquence
  startButton.removeAttribute('disabled');
  pauseButton.removeAttribute('disabled');
  stopButton.removeAttribute('disabled');
}

// Fonction pour mettre en pause le chronomètre
function pauseTimer() {
  clearInterval(timer);

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.textContent = "Start";
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
  isRunning = false;
}

// Fonction pour réinitialiser le chronomètre
function stopTimer() {
  clearInterval(timer);
  minutes = 20;
  seconds = 0;
  updateTimerDisplay();

  // Réinitialiser le libellé du bouton
  startButton.textContent = "Start";

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
  isRunning = false;
}

// Fonction pour passer entre le temps de pause et le temps de travail
function switchTimer() {
  if (minutes == 0 && seconds == 0 && libellePause.style.visibility == 'hidden') {
    libelleTravail.style.visibility = 'hidden';
    libellePause.style.visibility = 'visible';
    minutes = 0;
    seconds = 2;
    startOrResetTimer();
  } else {
    if (minutes == 0 && seconds == 0 && libelleTravail.style.visibility == 'hidden') {
      libelleTravail.style.visibility = 'visible';
      libellePause.style.visibility = 'hidden';
      minutes = 0;
      seconds = 2;
      startOrResetTimer();
    }
  }
}

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startOrResetTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

// Appel initial pour afficher le temps initial
updateTimerDisplay();

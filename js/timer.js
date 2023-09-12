// Déclaration des variables
let timer;
let minutes = 0;
let seconds = 2;
let isRunning = false;

// Récupération des boutons et du libellé
const startButton = document.querySelector('button:nth-of-type(1)');
const pauseButton = document.querySelector('button:nth-of-type(2)');
const libelleTravail = document.getElementById("travail");
const libellePause = document.getElementById("pause");
const boutonEnvoyer = document.getElementById("submit");
const tempTravail = document.getElementById("tempTravail");
const tempPause = document.getElementById("tempPause");

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
  }

    startButton.textContent = "Reset";
      // Activer ou désactiver les boutons en conséquence
    pauseButton.removeAttribute('disabled');
    startButton.removeEventListener('click', startOrResetTimer);
    startButton.addEventListener('click', stopTimer);
}


// Fonction pour mettre en pause le chronomètre
function pauseTimer() {
  clearInterval(timer);

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.textContent = "Start";
  startButton.addEventListener('click', startOrResetTimer);
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
  isRunning = false;
}

// Fonction pour réinitialiser le chronomètre
function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = 0;
  seconds = 2;
  updateTimerDisplay();

  // Réinitialiser le libellé du bouton
  startButton.textContent = "Start";
  startButton.addEventListener('click', startOrResetTimer);

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
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

// Appel initial pour afficher le temps initial
updateTimerDisplay();

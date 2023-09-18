// Récupération des boutons et du libellé

const startButton = document.getElementById("startandresetbutton")
const pauseButton = document.querySelector('button:nth-of-type(2)');
const libelleTravail = document.getElementById("travail");
const libellePause = document.getElementById("pause");

const choixMinutesT = document.getElementById('tempsTravail').value;
const choixMinutesP = document.getElementById('tempsPause').value;

// Déclaration des variables

let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;


// Initialisation des variables quand on charge la page pour la première fois.

libellePause.style.visibility = 'hidden';
pauseButton.setAttribute('disabled', 'true');

// Fonction pour mettre à jour l'affichage du chronomètre
function updateTimerDisplay() {
  const timerDisplay = document.querySelector('#timer-display');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer ou réinitialiser le chronomètre
function startOrResetTimer() {
  const choixMinutesT = document.getElementById('tempsTravail').value;
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
  startButton.removeEventListener('click', stopTimer);
  startButton.addEventListener('click', startOrResetTimer);
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');
  isRunning = false;
}

// Fonction pour réinitialiser le chronomètre
function stopTimer() {
  const choixMinutesT = document.getElementById('tempsTravail').value;

  clearInterval(timer);
  isRunning = false;
  minutes = choixMinutesT;
  seconds = 0;
  updateTimerDisplay();

  // Réinitialiser le libellé du bouton
  startButton.textContent = "Start";
  startButton.addEventListener('click', startOrResetTimer);

  // Activer le bouton "Start" et désactiver le bouton "Pause"
  startButton.removeAttribute('disabled');
  pauseButton.setAttribute('disabled', 'true');

  // On repasse en mode travaille quand on reset le timer
  if(libelleTravail.style.visibility == 'hidden') {
    libellePause.style.visibility = 'hidden';
    libelleTravail.style.visibility = 'visible';
  }
}

// Fonction pour passer entre le temps de pause et le temps de travail
function switchTimer() {

  const choixMinutesT = document.getElementById('tempsTravail').value;
  const choixMinutesP = document.getElementById('tempsPause').value;

  if (minutes == 0 && seconds == 0 && libellePause.style.visibility == 'hidden') {
    libelleTravail.style.visibility = 'hidden';
    libellePause.style.visibility = 'visible';
    minutes = choixMinutesP;
    seconds = 0;
    startOrResetTimer();
  } else { 
      libelleTravail.style.visibility = 'visible';
      libellePause.style.visibility = 'hidden';
      minutes = choixMinutesT;
      seconds = 0;
      startOrResetTimer();
    
  }
}

//Fonction pour permettre à l'utilisateur de choisir les minutes de travail et de pause qu'il veut.
function changeValue() {

  let choixMinutesT = document.getElementById('tempsTravail').value;
  let choixMinutesP = document.getElementById('tempsPause').value;

  minutes = choixMinutesT;

  updateTimerDisplay();

  // Alerte l'utilisateur du choix qu'il à fait
  alert(`Choix minutes travail : ${choixMinutesT}\nChoix minutes repos : ${choixMinutesP}`);

}

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startOrResetTimer);
pauseButton.addEventListener('click', pauseTimer);

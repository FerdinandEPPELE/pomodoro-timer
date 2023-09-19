// Récupération des boutons et du libellé

const startButton = document.getElementById("startandresetbutton")
const pauseButton = document.querySelector('button:nth-of-type(2)');
const libelleTravail = document.getElementById("travail");
const libellePause = document.getElementById("pause");

const choixMinutesT = document.getElementById('tempsTravail').value;
const choixMinutesP = document.getElementById('tempsPause').value;

// Déclaration des variables

let timer;
let minutes = 25;
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
  const choixMinutesT = parseFloat(document.getElementById('tempsTravail').value);
  const choixMinutesP = parseFloat(document.getElementById('tempsPause').value);

  if(choixMinutesT === "" || !Number.isInteger(choixMinutesT) || !Number.isInteger(choixMinutesP)) {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    minutes = choixMinutesT;
    seconds = 0;
    updateTimerDisplay();
  }

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

  const choixMinutesT = parseFloat(document.getElementById('tempsTravail').value);
  const choixMinutesP = parseFloat(document.getElementById('tempsPause').value);

  //Permets de faire en sorte de vérifier en console que les valeurs renseignées dans les champs sont bien des entiers.
  console.log(Number.isInteger(choixMinutesT));
  console.log(Number.isInteger(choixMinutesP));

  //Vérifie si les valeurs renseignées dans les champs sont bien des entiers, et sinon, reviens aux valeurs par défaut.
  if(!Number.isSafeInteger(choixMinutesT) || !Number.isSafeInteger(choixMinutesP)) {
    alert("Il faut mettre des nombre entiers !");
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
  } else {
    minutes = choixMinutesT;
    seconds = 0;
  }

  //Quand on clique sur le bouton "Envoyer", on revient à une session de travail.
  if(libelleTravail.style.visibility = 'hidden') {
    libelleTravail.style.visibility = 'visible';
    libellePause.style.visibility = 'hidden';
  }

  updateTimerDisplay();
}

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startOrResetTimer);
pauseButton.addEventListener('click', pauseTimer);

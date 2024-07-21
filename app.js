function startAnimation() {
    const rats = [
        { id: 'rat1', element: document.getElementById('rat1') },
        { id: 'rat2', element: document.getElementById('rat2') }
    ];
    const track = document.getElementById('raceTrack');
    const trackWidth = track.offsetWidth;
    const ratWidth = 50; // Ancho de la rata
    let positions = [0, 0]; // Posiciones iniciales
    let directions = [1, 1]; // 1 para moverse a la derecha, -1 para moverse a la izquierda
    let speeds = [2, 2]; // Velocidad inicial
    let animationFrameIds = []; // Variables para almacenar los IDs del requestAnimationFrame

    function getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function adjustSpeed(index) {
        const number = getRandomNumber();
        console.log(`Número aleatorio para ${rats[index].id}: ${number}`);

        if (number === 1 || number === 2 || number === 3) {
            speeds[index] = 0.5; // Cuarta parte de la velocidad inicial
        } else if (number === 4 || number === 5) {
            if (positions[index] === 0) {
                directions[index] = 1;
            } else {
                directions[index] *= -1; // Invertir la dirección
            }
            if (directions[index] === -1) {
                // Cambiar la velocidad a una cuarta parte solo si la dirección es -1
                speeds[index] = 0.5;
                // Restablecer la dirección a 1 después de 2 segundos
                setTimeout(() => {
                    directions[index] = 1;
                    speeds[index] = 2; // Restaurar la velocidad inicial
                }, 2000);
            }
        } else {
            speeds[index] = 2; // Velocidad inicial
        }
    }

    function endGame(ratIndex) {
        // Detiene la animación
        cancelAnimationFrame(animationFrameIds[ratIndex]);
        // Muestra un mensaje de finalización
        alert(`¡La rata ${rats[ratIndex].id} ha llegado al final de la pista!`);
    }

    function animateRat(ratIndex) {
        // Mueve la rata a la posición actual
        rats[ratIndex].element.style.left = `${positions[ratIndex]}px`;

        // Actualiza la posición
        positions[ratIndex] += directions[ratIndex] * speeds[ratIndex]; // Cambia la velocidad

        // Verifica si la rata ha llegado al final de la pista
        if (positions[ratIndex] + ratWidth >= trackWidth) {
            positions[ratIndex] = trackWidth - ratWidth; // Asegura que no se pase del límite
            endGame(ratIndex); // Llama a la función para terminar el juego
            return;
        } else if (positions[ratIndex] <= 0) {
            positions[ratIndex] = 0; // Asegura que no se pase del límite
            directions[ratIndex] = 1; // Cambia la dirección a 1
        }

        // Repite la animación
        animationFrameIds[ratIndex] = requestAnimationFrame(() => animateRat(ratIndex));
    }

    function startDecisionTimer(ratIndex) {
        setInterval(() => {
            adjustSpeed(ratIndex); // Ajusta la velocidad y dirección según el número aleatorio
        }, 500); // Cada 4 segundos
    }

    // Inicia la animación y el temporizador de decisiones para cada rata
    rats.forEach((rat, index) => {
        startDecisionTimer(index);
        animateRat(index);
    });
}

// Asignar la función al botón
document.getElementById('startButton').addEventListener('click', startAnimation);


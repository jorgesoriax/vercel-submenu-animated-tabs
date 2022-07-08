const submenu = document.querySelector(".submenu");
const highlight = document.querySelector(".submenu__highlight");
const tabs = document.querySelectorAll(".submenu__tab");

// 1. El ancho del highlight es el mismo que el de las tabs

// 2. Para mover el highlight este recibe la suma de todas las tabs previas a el primer
// 	  tab sobre el que hicimos hover, es decir que si hicimos hover sobre el tab 3, la
// 	  distancia que el highlight recorrerá será igual a la suma del ancho de las tabs 1 y 2

// 3. Al momento de hacer hover sobre una tab su transition es igual a 0 para que el highlight
//	  no realice la animación de desplazamiento y en su lugar realice una de aparición, si nos
//	  mantenemos dentro del submenu y nos movemos hacia otra tab, la transition recibirá un valor
// 	  y realizará la animación original

let transitionState = 0;

// 1. Creamos un arreglo con las distancias que cada tab debe recorrer para ser resaltada
const allDistances = setDistances()

// 2. Asignamos funciones para las tabs
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener("mouseover", () => {
    	let distance = allDistances[i - 1] == undefined ? 0 : allDistances[i - 1];
    	const tabWidth = parseFloat(tabs[i].getBoundingClientRect().width.toFixed(2));
		const activeTab = tabs[i]

		// Recorremos y dimensionamos el highlight
    	setHighlight(distance, tabWidth);
		// Si lo necesitamos, preparamos el clic para la tab sobre la hacemos hover
    	setActiveTab(activeTab);
		// Añadimos transition
		setTransitionState()
  	});
}
// 3. Reseteamos transitionState
submenu.addEventListener("mouseleave", resetTransition);

/**
 * 
 */
function setTransitionState(){
	if (transitionState == 0) {
		highlight.style.transitionDuration = "0ms";
		highlight.style.opacity = 1;

		// Mientras continuemos dentro del submenu, transitionState será diferente de 0
		// por lo que aplicaremos una transition al highlight
		transitionState = 1;
	  } else {
		highlight.style.transitionDuration = "150ms";
	  }
}

/**
 * 
 */
function resetTransition(){
	transitionState = 0;
  	highlight.style.opacity = 0;
}

/**
 * 
 * @returns 
 */
function setDistances(){
	const distances = [];
	let total = 0;

	for (let i = 0; i < tabs.length - 1; i++) {
		// Recuperamos el ancho de cada tab
		const position = tabs[i].getBoundingClientRect().width;

		// Utilizamos un acumulador para sumarlas y para almacenar cada resultado
		// en una posición del array distances
		total += position;
		distances.push(parseFloat(total.toFixed(2)));
	}

	return distances
}

/**
 * 
 * @param {*} distance 
 * @param {*} tabActiveWidth 
 */
function setHighlight(distance, tabActiveWidth) {
	// Igualamos el width del highlight al de la active tab
  	highlight.style.width = `${tabActiveWidth}px`;
	// Recorremos la distancia que le corresponde a la active tab
  	highlight.style.transform = `translateX(${distance}px)`;
}

/**
 * 
 * @param {*} activeTab 
 */
function setActiveTab(activeTab) {
  activeTab.addEventListener("click", () => {
	// Removemos la siguiente clase de todas las tabs
    tabs.forEach((tab) => {
      tab.classList.remove("submenu__tab--active");
    });

	// Añadimos la siguiente clase a la tab sobre la que se hizo clic
    activeTab.classList.add("submenu__tab--active");
  });
}

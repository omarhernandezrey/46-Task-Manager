// Seleccionamos el formulario de tareas
const taskForm = document.getElementById("task-form");

// Seleccionamos el contenedor de la lista de tareas
const taskList = document.getElementById("task-list");

// Cargamos las tareas almacenadas en localStorage
loadTasks();

// Manejamos el envío del formulario
taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenimos la recarga de la página al enviar el formulario

  // Obtenemos el valor ingresado en el campo de entrada
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value;

  console.log(task); // Mostramos el valor en consola

  // Si la tarea no está vacía, la añadimos a la lista y localStorage
  if (task) {
    taskList.append(createTaskElement(task)); // Agregamos la tarea al DOM
    storeTaskInLocalStorage(task); // Guardamos la tarea en localStorage
    taskInput.value = ""; // Limpiamos el campo de entrada
  }
});

// Función para crear un elemento de tarea <li>
function createTaskElement(task) {
  const li = document.createElement("li"); // Creamos un <li> para la tarea
  li.textContent = task; // Asignamos el texto de la tarea

  // Añadimos botones para eliminar y editar
  li.append(
    createButton("❌", "delete-btn"), // Botón para eliminar
    createButton("✏️", "edit-btn")   // Botón para editar
  );

  return li; // Retornamos el elemento <li>
}

// Función para crear botones con texto o íconos
function createButton(text, className) {
  const btn = document.createElement("span"); // Creamos un <span>
  btn.textContent = text; // Asignamos el texto o ícono
  btn.className = className; // Asignamos la clase
  return btn; // Retornamos el botón
}

// Delegamos eventos de clic en los botones de la lista
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    // Si el botón tiene clase "delete-btn", eliminamos la tarea
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains("edit-btn")) {
    // Si el botón tiene clase "edit-btn", editamos la tarea
    editTask(event.target.parentElement);
  }
});

// Función para eliminar una tarea
function deleteTask(taskItem) {
  if (confirm("¿Estás segura / seguro de borrar este elemento?")) {
    removeFromLocalStorage(taskItem.firstChild.textContent); // Eliminamos de localStorage
    taskItem.remove(); // Eliminamos del DOM
  }
}

// Función para editar una tarea
function editTask(taskItem) {
  const newTask = prompt("Edita la tarea:", taskItem.firstChild.textContent); // Pedimos nuevo texto
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask; // Actualizamos el texto
    updateLocalStorage(); // Actualizamos localStorage
  }
}

// Almacena una tarea en localStorage
function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Obtenemos las tareas actuales
  tasks.push(task); // Agregamos la nueva tarea
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Guardamos las tareas actualizadas
}

// Carga las tareas desde localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Obtenemos las tareas guardadas
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task)); // Añadimos cada tarea al DOM
  });
}

// Actualiza las tareas en localStorage
function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.firstChild.textContent // Obtenemos el texto de cada tarea
  );
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Guardamos las tareas actualizadas
}

// Elimina una tarea de localStorage
function removeFromLocalStorage(taskContent) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); // Obtenemos las tareas actuales
  const updatedTasks = tasks.filter((task) => task !== taskContent); // Eliminamos la tarea específica
  localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Guardamos las tareas restantes
}

// Selección del botón para cambiar de tema
const themeToggleButton = document.getElementById("toggle-theme-btn");

// Obtenemos el tema actual desde localStorage
const currentTheme = localStorage.getItem("theme");
console.log(currentTheme);

// Evento para alternar el tema
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme"); // Alternamos la clase "dark-theme"

  // Guardamos el tema actual en localStorage
  const theme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
});

// Aplicamos el tema guardado al cargar la página
if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}

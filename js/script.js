document.addEventListener('DOMContentLoaded', async () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    const taskList = document.getElementById('taskList');
    
    document.body.style.backgroundColor = "#e6f7ff"; // Azul muy tenue

    const container = document.querySelector('.container');
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.maxWidth = "800px"; // Para que no sea demasiado ancho en pantallas grandes
    container.style.margin = "auto"; // Centrar

    const title = document.querySelector('h2');
    title.style.fontFamily = `"Segoe UI", sans-serif`; // Fuente similar a Aptos
    title.style.fontWeight = "bold"; // Hacerlo más grueso para que parezca título
    title.style.textAlign = "center";

    // Contenedor del input y el botón
    const inputContainer = document.createElement('div');
    inputContainer.style.display = "flex";
    inputContainer.style.justifyContent = "center";
    inputContainer.style.alignItems = "center";
    inputContainer.style.gap = "10px"; // Espaciado entre input y botón
    inputContainer.style.width = "100%";
    container.insertBefore(inputContainer, taskList); // Insertamos antes de la lista

    // Movemos el input y el botón dentro de este nuevo contenedor
    inputContainer.appendChild(newTaskInput);
    inputContainer.appendChild(addTaskBtn);

    // Estilos para el input
    newTaskInput.style.flex = "1"; // Que se ajuste automáticamente
    newTaskInput.style.padding = "10px";
    newTaskInput.style.border = "1px solid #ccc";
    newTaskInput.style.borderRadius = "5px";
    newTaskInput.style.width = "100%";
    newTaskInput.style.maxWidth = "400px"; // Máximo tamaño del input

    // Estilos para el botón
    addTaskBtn.style.backgroundColor = "#003366"; // Azul marino
    addTaskBtn.style.color = "white";
    addTaskBtn.style.border = "none";
    addTaskBtn.style.padding = "10px 15px";
    addTaskBtn.style.borderRadius = "5px";
    addTaskBtn.style.cursor = "pointer";
    addTaskBtn.style.whiteSpace = "nowrap"; // Evita que el texto del botón se rompa

    addTaskBtn.addEventListener("mouseover", () => {
        addTaskBtn.style.backgroundColor = "#002244"; // Un poco más oscuro en hover
    });

    addTaskBtn.addEventListener("mouseout", () => {
        addTaskBtn.style.backgroundColor = "#003366";
    });

    //Aqui em pieza lo que trabajamos en clase 
    await loadTasks();

    addTaskBtn.addEventListener('click', async ()=>{
        await addTask();
        saveTasks(); // Promesa y Async/await
    });

    // Este es el manejo de Formularios
    document.querySelector('form').addEventListener('submit', async(event) =>{
        event.preventDefault(); //Evita que el formulario se envie de manera tradicional y que este se envie y trate en el back
        await addTask();
        saveTasks();
    });

    async function addTask() {
        const taskText = newTaskInput.value.trim();
        if (!taskText) return;

        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item';

        // Ajustar el tamaño de la tarea a casi todo el ancho de la página
    //taskElement.style.display = 'flex';
    taskElement.style.alignItems = 'center'; // Aseguramos que el texto y el botón estén alineados verticalmente
    taskElement.style.justifyContent = 'space-between'; // Separar el texto y el botón
    taskElement.style.width = '90%'; // Ancho del 90% del contenedor
    taskElement.style.margin = '10px auto'; // Centrado con márgenes
    taskElement.style.padding = '10px';
    taskElement.style.boxSizing = 'border-box'; // Aseguramos que el padding no afecte el tamaño total

        taskElement.innerHTML = `
        <span class="task-content">${taskText}</span>
        <button class="btn btn-danger delete-btn">Eliminar</button>
        `;

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', ()=>{ taskElement.remove()})

        taskElement.addEventListener('click', ()=> {
            taskElement.classList.toggle('completed');
        });

        taskList.appendChild(taskElement);

        newTaskInput.value = '';

        return taskText //retorna nuestro texto de la taera para que la usemos en nuestra promesa
    }


    async function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-content').forEach(task => tasks.push(task.textContent));
        localStorage.setItem('tasks', JSON.stringify(tasks)) //aqui se guarda el JSON local
    }

    async function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')); //JSON y manejo de datos locales guardados
        if  (tasks) {
            tasks.forEach(taskText =>{
                const taskElement = document.createElement('div');
                taskElement.className = 'list-group-item';

               // Ajustar el tamaño de la tarea a casi todo el ancho de la página
            taskElement.style.display = 'flex';
            taskElement.style.alignItems = 'center'; // Aseguramos que el texto y el botón estén alineados verticalmente
            taskElement.style.justifyContent = 'space-between'; // Separar el texto y el botón
            taskElement.style.width = '90%'; // Ancho del 90% del contenedor
            taskElement.style.margin = '10px auto'; // Centrado con márgenes
            taskElement.style.padding = '10px';
            taskElement.style.boxSizing = 'border-box'; // Aseguramos que el padding no afecte el tamaño total


                taskElement.innerHTML = `
                <span class="task-content">${taskText}</span>
                <button class="btn btn-danger delete-btn">Completado</button>
            `;
            const deleteBtn = taskElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', ()=>{ taskElement.remove()})
    
            taskElement.addEventListener('click', ()=> {
                taskElement.classList.toggle('completed');
            });
    
            taskList.appendChild(taskElement);
            });
        }
    }
})
      

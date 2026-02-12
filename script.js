const terminal = document.getElementById("terminal");

const PROMPT = "root@ozalbidea:/CV#";

let history = [];
let historyIndex = -1;

const commands = {

    help: `
Comandos disponibles:
whoami
ls skills
cat experience.txt
nmap interests
clear
`,

    whoami: `
Nombre: Oier Zalbidea Uriarte
Perfil: Técnico en Sistemas / Ciberseguridad
Ubicación: Bilbao
`,

    "ls skills": `
skills/
├── Linux
├── Networking
├── Python
├── Ciberseguridad
└── Virtualización
`,

    "cat experience.txt": `
Experiencia:
- Laboratorios de pentesting
- Redes virtuales
- Proyectos personales
`,

    "nmap interests": `
✔ Hacking ético
✔ Redes
✔ Impresión 3D
✔ Automatización
`
};

function createInputLine() {

    const line = document.createElement("div");
    line.classList.add("line");

    const prompt = document.createElement("span");
    prompt.classList.add("prompt");
    prompt.textContent = PROMPT;

    const input = document.createElement("input");

    line.appendChild(prompt);
    line.appendChild(input);
    terminal.appendChild(line);

    input.focus();

    input.addEventListener("keydown", function(e) {

        // ENTER
        if (e.key === "Enter") {

            const command = input.value.trim();

            history.push(command);
            historyIndex = history.length;

            input.disabled = true;

            executeCommand(command);
        }

        // HISTORIAL ↑
        if (e.key === "ArrowUp") {

            if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
            }

            e.preventDefault();
        }

        // HISTORIAL ↓
        if (e.key === "ArrowDown") {

            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = "";
            }

            e.preventDefault();
        }

    });

    window.scrollTo(0, document.body.scrollHeight);
}

function printOutput(text) {

    const pre = document.createElement("pre");
    pre.classList.add("output");
    pre.textContent = text;

    terminal.appendChild(pre);

    window.scrollTo(0, document.body.scrollHeight);
}

function executeCommand(command) {

    if (command === "clear") {

        // 🔥 Limpiar TODO completamente
        terminal.innerHTML = "";

        // 🔥 Crear nueva línea limpia
        createInputLine();

        return;
    }

    if (commands[command]) {
        printOutput(commands[command]);
    } else {
        printOutput("Comando no encontrado. Usa 'help'");
    }

    createInputLine();
}

/* Primera línea */
createInputLine();

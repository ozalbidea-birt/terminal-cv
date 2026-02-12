const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const promptElement = document.getElementById("prompt");

let username = "user";
let hostname = "cv";

let history = [];
let historyIndex = -1;

const commands = {

    help: `
Comandos disponibles:
whoami
ls skills
cat experience.txt
nmap interests
sudo hire-me
clear
`,

    whoami: `
Nombre: Tu Nombre
Perfil: Técnico en Sistemas / Ciberseguridad
Ubicación: Madrid
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
- Configuración redes virtuales
- Proyectos personales
`,

    "nmap interests": `
Scanning interests...

✔ Hacking ético
✔ Redes
✔ Impresión 3D
✔ Automatización
`,

    "sudo hire-me": `
[+] Acceso root concedido...

🚀 Gracias por revisar mi CV
📧 Contacto: tuemail@email.com
🔗 LinkedIn: linkedin.com/in/tuusuario
🐙 GitHub: github.com/tuusuario
`
};

input.addEventListener("keydown", function(e) {

    // ENTER
    if (e.key === "Enter") {

        const command = input.value.trim();

        if (command === "") return;

        history.push(command);
        historyIndex = history.length;

        printLine(`${getPrompt()} ${command}`);

        executeCommand(command);

        input.value = "";
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

function executeCommand(command) {

    if (command === "clear") {
        output.innerHTML = "";
        return;
    }

    // Cambio dinámico de prompt
    if (command.startsWith("setuser ")) {
        username = command.split(" ")[1];
        updatePrompt();
        return;
    }

    if (command.startsWith("sethost ")) {
        hostname = command.split(" ")[1];
        updatePrompt();
        return;
    }

    if (commands[command]) {
        printLine(commands[command]);
    } else {
        printLine("Comando no encontrado. Usa 'help'");
    }

    scrollToBottom();
}

function printLine(text) {

    const div = document.createElement("div");
    div.classList.add("line");
    div.textContent = text;
    output.appendChild(div);

    scrollToBottom();
}

function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

function getPrompt() {
    return `${username}@${hostname}:~$`;
}

function updatePrompt() {
    promptElement.textContent = getPrompt();
}

function focusInput() {
    input.focus();
}

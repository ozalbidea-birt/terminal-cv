const terminal = document.getElementById("terminal");

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
setuser <nombre>
sethost <nombre>
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
- Redes virtuales
- Proyectos personales
`,

    "nmap interests": `
✔ Hacking ético
✔ Redes
✔ Impresión 3D
✔ Automatización
`,

    "sudo hire-me": `
[+] Acceso root concedido

🚀 Gracias por revisar mi CV
📧 Email: tu@email.com
🔗 LinkedIn: linkedin.com/in/tuusuario
🐙 GitHub: github.com/tuusuario
`
};

function getPrompt() {
    return `${username}@${hostname}:~$`;
}

function createInputLine() {

    const line = document.createElement("div");
    line.classList.add("line");

    const prompt = document.createElement("span");
    prompt.classList.add("prompt");
    prompt.textContent = getPrompt();

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
            createInputLine();
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
        terminal.innerHTML = "";
        return;
    }

    if (command.startsWith("setuser ")) {
        username = command.split(" ")[1];
        return;
    }

    if (command.startsWith("sethost ")) {
        hostname = command.split(" ")[1];
        return;
    }

    if (commands[command]) {
        printOutput(commands[command]);
    } else {
        printOutput("Comando no encontrado. Usa 'help'");
    }
}

/* Primera línea al cargar */
createInputLine();

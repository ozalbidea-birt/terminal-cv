const input = document.getElementById("commandInput");
const output = document.getElementById("output");

const commands = {

    help: `
Comandos disponibles:
- whoami
- ls skills
- cat experience.txt
- nmap interests
- clear
`,

    "whoami": `
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
- Proyectos personales de laboratorio
- Configuración de redes virtuales
- Prácticas en seguridad
`,

    "nmap interests": `
Intereses detectados:
- Hacking ético
- Redes
- Impresión 3D
- Automatización
`
};

input.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        const command = input.value.trim();

        printLine("user@cv:~$ " + command);

        if (command === "clear") {
            output.innerHTML = "";
        }
        else if (commands[command]) {
            printLine(commands[command]);
        }
        else {
            printLine("Comando no encontrado. Escribe 'help'");
        }

        input.value = "";
    }
});

function printLine(text) {
    const div = document.createElement("div");
    div.classList.add("line");
    div.innerText = text;
    output.appendChild(div);
}

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const tempFolder = path.join(__dirname, "temp");
const codeFilePath = path.join(tempFolder, "code.js");

function runCode(userCode) {
  return new Promise((resolve) => {
    fs.writeFileSync(codeFilePath, userCode);

    const containerName = `run-${Date.now()}`;
    const docker = spawn("docker", [
      "run", "--memory", "50m", "--cpus", "0.5", "--rm",
      "--name", containerName,
      "-v", `${tempFolder}:/app/temp`,
      "code-runner", "node", "/app/temp/code.js"
    ]);

    const timer = setTimeout(() => {
      spawn("docker", ["kill", containerName]);
    }, 5000);

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => { stdout += data.toString(); });
    docker.stderr.on("data", (data) => { stderr += data.toString(); });

    docker.on("close", (code) => {
      clearTimeout(timer);
      resolve({ exitCode: code, stdout, stderr });
    });
  });
}

module.exports = runCode;

if (require.main === module) {
  const testPath = process.argv[2];
  const code = fs.readFileSync(testPath, "utf8");
  runCode(code).then(console.log);
}
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const githubRepoUrl = "https://github.com/designer-rxk/project-mono-v3.git";

function createProject(projectName, projectPath) {
  try {
    execSync(`git clone ${githubRepoUrl} ${projectPath}`, { stdio: "inherit" });

    process.chdir(projectPath);

    execSync("rm -rf .git", { stdio: "inherit" });
    execSync("git init", { stdio: "inherit" });
    execSync("pnpm install", { stdio: "inherit" });

    console.log(
      `Your project ${projectName} has been created in ${projectPath}!`,
    );
  } catch (error) {
    console.error("Error creating project:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

function askForProjectName() {
  rl.question("Please provide a project name: ", (projectName) => {
    if (!projectName) {
      console.error("Project name is required.");
      process.exit(1);
    } else {
      askForProjectPath(projectName);
    }
  });
}

function askForProjectPath(projectName) {
  rl.question(
    "Please provide a folder to place the project (enter '.' for current directory): ",
    (folder) => {
      const projectPath =
        folder === "."
          ? process.cwd()
          : path.join(process.cwd(), folder, projectName);
      createProject(projectName, projectPath);
    },
  );
}

const projectName = process.argv[2];

if (!projectName) {
  askForProjectName();
} else {
  askForProjectPath(projectName);
}

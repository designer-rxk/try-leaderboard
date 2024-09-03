#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const githubRepoUrl = "https://github.com/designer-rxk/project-mono-v3.git";

function createProject(projectPath) {
  try {
    execSync(`git clone ${githubRepoUrl} ${projectPath}`, { stdio: "inherit" });

    process.chdir(projectPath);

    execSync("rm -rf .git", { stdio: "inherit" });
    execSync("git init", { stdio: "inherit" });
    execSync("pnpm install", { stdio: "inherit" });

    console.log(`Your project has been created in ${projectPath}!`);
  } catch (error) {
    console.error("Error creating project:", error);
    rl.close();
    process.exit(1); // Exiting on error
  } finally {
    rl.close();
    deleteBinFolders(projectPath);
  }
}

function deleteBinFolders(projectPath) {
  const scriptPath = process.argv[1];
  const npxBinFolderPath = path.dirname(scriptPath);
  const projectBinFolderPath = path.join(projectPath, "bin");

  console.log("Script path:", scriptPath);
  console.log("npx bin folder path:", npxBinFolderPath);
  console.log("Project bin folder path:", projectBinFolderPath);
  console.log("Current working directory:", process.cwd());

  try {
    // Delete the script and npx bin folder
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
      console.log(`Deleted script at ${scriptPath}`);
    } else {
      console.error(`Script path ${scriptPath} does not exist.`);
    }

    if (fs.existsSync(npxBinFolderPath)) {
      fs.rmSync(npxBinFolderPath, { recursive: true, force: true });
      console.log(`Deleted npx bin folder at ${npxBinFolderPath}`);
    } else {
      console.error(`npx bin folder path ${npxBinFolderPath} does not exist.`);
    }

    // Delete the project bin folder
    if (fs.existsSync(projectBinFolderPath)) {
      fs.rmSync(projectBinFolderPath, { recursive: true, force: true });
      console.log(`Deleted project bin folder at ${projectBinFolderPath}`);
    } else {
      console.error(
        `Project bin folder path ${projectBinFolderPath} does not exist.`,
      );
    }
  } catch (err) {
    console.error("Error deleting folders:", err);
  }
}

function askForProjectPath() {
  rl.question(
    "Please provide a folder to place the project (enter '.' for current directory): ",
    (folder) => {
      const projectPath =
        folder === "." ? process.cwd() : path.join(process.cwd(), folder);
      createProject(projectPath);
    },
  );
}

askForProjectPath();

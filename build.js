#!/usr/bin/env node
const pug = require("pug");
const glob = require("glob");

const fs = require("fs");
const path = require("path");

const sourceFolder = path.join(__dirname, "src");
const destFolder = path.join(__dirname, "build");
const pugFiles = glob.sync(path.join(sourceFolder, "**", "*.*"));

pugFiles.forEach(buildFile);

function buildFile(file){
	const ext = path.extname(file);
	switch (ext) {
	case ".pug":
		buildPugFile(file);
		break;
	default:
		copyFile(file);
		break;
	}
}

function buildPugFile(file){
	const compiledFunction = pug.compileFile(file);
	const htmlDir = path.join(destFolder, path.relative(sourceFolder, path.dirname(file, ".pug")));
	const htmlPath = path.format({
		dir: htmlDir,
		name: path.basename(file, ".pug"),
		ext: ".html"
	});
	fs.mkdirSync(htmlDir, { recursive: true });

	fs.writeFileSync(htmlPath, compiledFunction());
}
function copyFile(file){
	const buildDir = path.join(destFolder, path.relative(sourceFolder, path.dirname(file)));
	const buildPath = path.format({
		dir: buildDir,
		base: path.basename(file),
	});
	fs.mkdirSync(buildDir, { recursive: true });
	fs.copyFileSync(file, buildPath);
}
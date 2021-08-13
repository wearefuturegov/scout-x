/**
 *
 * this file populates the public folder with all the relevant theme files
 *
 */

require("dotenv").config()
const fs = require("fs")
const fsPromises = fs.promises
const path = require("path")

const sourceDirectory = `./src/data/themes/${process.env.REACT_APP_THEME.toLowerCase()}/public`

async function copyDir(src, dest) {
  await fsPromises.mkdir(dest, { recursive: true })
  let entries = await fsPromises.readdir(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let destPath = path.join(dest, entry.name)

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fsPromises.copyFile(srcPath, destPath)
  }
}

;(async () => {
  try {
    await fsPromises.stat(sourceDirectory)
    try {
      await copyDir(sourceDirectory, "./public")
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
})()

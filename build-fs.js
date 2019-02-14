const fs = require('fs')
const path = require('path')


const allFilesSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? {[file]: allFilesSync(filePath)}
        : file
    )
  })
  return fileList
}

const buildFs = homeDir => {
  const buildFsDir = (dir, fileList = [], depth = 0) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file)

      if (fs.statSync(filePath).isDirectory()) {
        fileList.push({
          name: file,
          type: 'dir',
          depth,
          contents: buildFsDir(filePath, [], depth + 1),
        })
      } else {
        fileList.push({
          name: file,
          type: 'text',
          depth,
          contents: fs.readFileSync(filePath).toString(),
        })
      }
    })
    return fileList
  }

  return {
    name: '~',
    type: 'dir',
    contents: buildFsDir(homeDir)
  }
}

if (process.argv.length) {
  const [_, _cmd, directory] = process.argv

  if (_cmd !== __filename) {
    return
  }

  if (directory) {
    console.log(JSON.stringify(buildFs(path.join(__dirname, directory)), null, 2))
  }
}

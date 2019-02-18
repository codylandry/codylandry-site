const fs = require('fs')
const path = require('path')

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const colorMap = {
  STYL: '#538642',
  JS: '#BD8E3E',
  CSS: '#3E86A0',
  HTML: '#579242',
  MD: '#3E86A0'
}

const ignored = [
  'node_modules',
  'dist',
  'package-lock.json',
  '.git',
  '.idea',
  '.DS_Store',
  'file-system.json',
  'amplify',
  'aws-exports.js'
]

const imageExtensions = [
  'JPG',
  'PNG'
]

const buildFs = homeDir => {
  const buildFsDir = (dir, fileList = [], depth = 1, projectPath = '') => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file)
      const id = makeid()
      if (ignored.includes(file)) {
        return
      }

      const newProjectPath = `${projectPath}/${file}`

      if (fs.statSync(filePath).isDirectory()) {
        fileList.push({
          name: file,
          type: 'dir',
          id,
          depth,
          path: newProjectPath,
          expanded: false,
          contents: buildFsDir(filePath, [], depth + 1, newProjectPath),
        })
      } else {
        const extension = file.substr(file.lastIndexOf('.') + 1).toUpperCase()

        if (imageExtensions.includes(extension)) {
          const imgPath = dir === 'public'
            ? `./${file}`
            : `/img/${file}`
          fileList.push({
            id,
            depth,
            extension,
            name: file,
            type: 'img',
            path: newProjectPath,
            iconColor: colorMap[extension] || '#579242',
            contents: imgPath,
          })
          return
        }

        fileList.push({
          id,
          depth,
          extension,
          name: file,
          type: 'text',
          path: newProjectPath,
          iconColor: colorMap[extension] || '#579242',
          contents: fs.readFileSync(filePath).toString(),
        })
      }
    })
    return fileList
  }

  return {
    id: makeid(),
    name: 'codylandry',
    type: 'dir',
    expanded: true,
    depth: 0,
    path: 'codylandry',
    contents: buildFsDir(homeDir, [], 1, 'codylandry')
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

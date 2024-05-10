const fs = require('fs')

const packageJsonFileName = __dirname + '/../package.json'
const packageJson = require(packageJsonFileName)

const manifestJsonFileName = __dirname + '/../manifest.json'
const manifestJson = require(manifestJsonFileName)

manifestJson.version = packageJson.version

// マニフェストバージョン更新
fs.writeFileSync(manifestJsonFileName, JSON.stringify(manifestJson, null , 2))


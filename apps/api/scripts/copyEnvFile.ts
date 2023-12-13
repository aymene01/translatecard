import { promises as fsPromises } from 'fs'

const copyEnvFile = async () => {
  const source = '.env.sample'
  const destination = '.env'

  try {
    try {
      await fsPromises.access(destination)
      console.log(`The destination file ${destination} already exists.`)
    } catch {
      await fsPromises.copyFile(source, destination)
      console.log(`File copied successfully from ${source} to ${destination}`)
    }
  } catch (error) {
    console.error('An error occurred while copying the file:', error)
  }
}

copyEnvFile()

import { uuid } from '@/utils'
import type { Options } from 'multer'
import multer from 'multer'

export const uploadService = () => {
  const folderPath = process.env.NODE_ENV === 'development' ? './' : './'
  const { limits: templateLimits }: Options = {
    limits: {
      files: 1,
      fieldNameSize: 400,
      fileSize: 80 * 1024 * 1024,
    },
  }

  // const createFolderIfNotExist = (path: string) => {
  //   if (!fs.existsSync(path)) {
  //     fs.mkdirSync(path, { recursive: true })
  //   }
  // }

  const { filename }: multer.DiskStorageOptions = {
    filename: (_req: any, file: any, cb: any) => {
      const name = `${uuid()}.${file.mimetype.split('/').pop()}`
      cb(null, name)
    },
  }

  const destination = () => {
    const { destination }: multer.DiskStorageOptions = {
      destination: (_req: any, _file: any, cb: any) => {
        cb(null, folderPath)
      },
    }
    return destination
  }

  const generateHandler = (itemType: any, fileType: any) => {
    // try {
    if (
      !fileType
      || (fileType !== 'document' && fileType !== 'icon' && fileType !== 'image')
    )
      throw new Error('File type error.')

    if (
      !itemType
      || (itemType !== 'assortment'
        && itemType !== 'carousel'
        && itemType !== 'catalog')
    )
      throw new Error('Item type error.')

    const options: Options = {
      limits: {
        ...templateLimits,
      },
      storage: multer.diskStorage({
        filename,
        destination: destination(),
      }),
    }

    return multer(options).single('file')
    // } catch (e) {
    //   throw e
    // }
  }
  return { generateHandler }
}

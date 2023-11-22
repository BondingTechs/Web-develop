import { uuid } from '@/utils';
import request from '@/utils/request';
import FormData from 'form-data';
import { uploadService } from '../../services/upload-service';

import fs from 'fs';
import sharp from 'sharp';

export default defineEventHandler(async (event: any) => {
  try {
    const handler: any = uploadService().generateHandler('carousel', 'image')
    await callNodeListener(handler, event.req, event.res)

    const formData = new FormData()
    const fileName = uuid()
    const fileType = event?.req?.file.originalname.split('.').pop()

    const minifyPath: string = await minify(event?.req?.file.filename)

    formData.append('file', fs.createReadStream(minifyPath))
    formData.append('key', `${fileName}.${fileType}`)
    const data = await request.post('/comm/upload', formData, {
      headers: formData.getHeaders(),
    })
    fs.unlink(event?.req?.file.path, () => { })
    fs.unlink(minifyPath, () => { })
    return { error: false, code: 1000, message: '上傳成功', data }
  }
  catch (err: any) {
    const { code, message = '' } = err
    return { error: code !== 1000, code, message }
  }
})


async function minify(inputImagePath: string): Promise<string> {
  const outputFilePath = `minify_${inputImagePath}`
  const targetWidth = 1024; // 壓縮後圖片的寬度
  const targetHeight = 1024; // 壓縮後圖片的高度
  try {
    await sharp(inputImagePath)
      .resize(targetWidth, targetHeight) // 如果不設置resize，圖片尺寸不會改變，只壓縮質量
      .toFile(outputFilePath);

    console.log('壓縮後的圖片已保存到:', outputFilePath);
    return outputFilePath;
  } catch (error) {
    console.error('圖片壓縮失敗:', error);
    return ''
  }
}
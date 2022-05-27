import React, { memo, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { Image } from 'react-native'
import { apx } from '../utils/device'

export interface IAutoHeightImage {
  uri: string;
  width: number;
}

const AutoHeightImage = ({ uri, width }: IAutoHeightImage) => {
  const [imageRealSize, setImageRealSize] = useState({
    width,
    height: apx(1),
  })

  useEffect(() => {
    Image.getSize(uri, (imgWidth, imgHeight) => {
      const ratio = width / imgWidth
      setImageRealSize({
        width,
        height: imgHeight * ratio,
      })
    })
  }, [uri, width])

  return <FastImage source={{ uri }} style={{ ...imageRealSize }} />
}
export default memo(AutoHeightImage)

import React, { memo } from 'react'
import { SvgCss } from 'react-native-svg'
import { ViewStyle } from 'react-native'
import svgs from '../assets/svgs/svgs'

interface IProps {
  icon: string;
  size?: number;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

function SvgIcon({
  icon,
  style = {},
  size = null,
  width = 0,
  height = 0,
}: IProps) {
  const svgXmlData = svgs[icon]

  if (!svgXmlData) {
    const errMsg = `Miss "${icon}" svg file`
    return null
    // throw new Error(errMsg)
  }

  return (
    <SvgCss
      width={size || width}
      height={size || height}
      xml={svgXmlData}
      style={style}
    />
  )
}

export default memo(SvgIcon)

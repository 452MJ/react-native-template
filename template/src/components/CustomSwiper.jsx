import React from 'react'
import { ViewStyle } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import { apx } from '../utils/device'
import Row from './Row'

interface IProps {
  style?: ViewStyle;
  paginationContainerStyle?: ViewStyle;
}

const CustomSwiper: React.FC<IProps> = props => {
  const { children, style, paginationContainerStyle } = props
  return (
    <Carousel
      style={style}
      autoplay
      autoplayInterval={3000}
      infinite
      dotStyle={{
        width: apx(12),
        height: apx(12),
        borderRadius: apx(12),
        backgroundColor: '#E9EDEF',
        opacity: 0.55,
      }}
      dotActiveStyle={{
        width: apx(12),
        height: apx(12),
        borderRadius: apx(12),
        backgroundColor: '#E9EDEF',
      }}
      pagination={({ current, count, dotStyle, dotActiveStyle }) => (
        <Row
          style={{
            width: apx(750),
            height: apx(50),
            position: 'absolute',
            bottom: apx(0),
            ...paginationContainerStyle,
          }}
          justify="center"
          align="center"
        >
          {new Array(count).fill(0).map((item, index) => (
            <Row
              key={index.toString()}
              style={[
                current === index ? dotActiveStyle : dotStyle,
                { marginHorizontal: apx(16 / 2) },
              ]}
            />
          ))}
        </Row>
      )}
    >
      {children}
    </Carousel>
  )
}
export default CustomSwiper

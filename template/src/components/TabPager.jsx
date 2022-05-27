import React, { memo, useRef, useState } from 'react'
import { Text } from 'react-native'
import Swiper from 'react-native-swiper'
import Col from './Col'
import Row from './Row'
import { apx } from '../utils/device'
import Touchable from './Touchable'

interface IProps {
  labels: string[];
  children: React.ReactNode[];
  isTrail?: boolean;
}

const TabPager = (props: IProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const swipeRef = useRef(null)

  return (
    <Col style={{ flex: 1 }}>
      <Row
        style={{
          width: apx(750),
          height: apx(88),
          backgroundColor: '#F7F9FB',
        }}
        justify="start"
      >
        {props.labels.map((item, index) => (
          <Touchable
            key={index.toString()}
            onPress={() => {
              // @ts-ignore
              swipeRef.current.scrollTo(index, true)
              setTabIndex(index)
            }}
          >
            <Col
              style={{
                height: apx(88),
                marginHorizontal: apx(34),
              }}
              justify="center"
              align="start"
            >
              <Text
                style={{
                  fontSize: apx(24),
                  fontWeight: '600',
                  color: index === tabIndex ? '#000000' : '#617485',
                }}
              >
                {item}
              </Text>

              <Col
                style={{
                  position: 'absolute',
                  bottom: apx(14),
                  width: apx(74),
                  height: apx(8),
                  borderRadius: apx(2),
                  backgroundColor: '#FEBE18',
                  opacity: index === tabIndex ? 1 : 0,
                }}
              />
            </Col>
          </Touchable>
        ))}
      </Row>

      <Swiper
        ref={swipeRef}
        showsPagination={false}
        removeClippedSubviews={false}
        loop={false}
        autoplay={false}
        onIndexChanged={index => setTabIndex(index)}
      >
        {props.children}
      </Swiper>
    </Col>
  )
}
export default memo(TabPager)

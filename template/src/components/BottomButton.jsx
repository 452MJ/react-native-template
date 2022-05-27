import React, { memo } from 'react'
import { connect } from 'react-redux'
import Button from './Button'
import Col from './Col'
import { apx, IPXBarHeight } from '../utils/device'

export interface IBottomButton {
  text?: string;
  onPress?: () => void;
  clickable?: boolean;
}

export default connect(state => state)(memo(BottomButton))

function BottomButton({
  text = '完成',
  onPress = () => $navigation.goBack(),
  clickable = true,
}: IBottomButton) {
  return (
    <Col
      style={{
        width: apx(750),
        height: apx(140) + IPXBarHeight,
        paddingBottom: IPXBarHeight,
        backgroundColor: '#26292A',
      }}
    >
      <Button
        text={text}
        style={{}}
        contentContainerStyle={{ borderRadius: apx(6) }}
        clickable={clickable}
        onPress={onPress}
      />
    </Col>
  )
}

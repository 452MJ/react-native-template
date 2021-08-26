import React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Flex } from '@ant-design/react-native'
import Col from './Col'

// export default Platform.OS === 'ios'
//   ? TouchableOpacity
//   : TouchableNativeFeedback

interface IProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onPress?: void;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
}

function Touchable({
  children,
  style,
  contentContainerStyle,
  direction = 'column',
  justify = 'center',
  align = 'center',
  onPress,
}: IProps) {
  const Component =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback

  return (
    <Col style={style}>
      <Component onPress={onPress} useForeground>
        <Flex
          justify={justify}
          direction={direction}
          align={align}
          style={contentContainerStyle}
        >
          {children}
        </Flex>
      </Component>
    </Col>
  )
}

export default Touchable

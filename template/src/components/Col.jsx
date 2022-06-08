import React, { memo } from 'react'
import Flex from '@ant-design/react-native/lib/flex'
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { ViewStyle } from 'react-native'

interface IProps extends FlexPropsType {
  style?: ViewStyle;
  onPress?: () => void;
}

const Col: React.FC<IProps> = ({ children, ...other }) => (
    <Flex direction="column" justify="center" align="center" {...other}>
      {children}
    </Flex>
)
export default memo(Col)

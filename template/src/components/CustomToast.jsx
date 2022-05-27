import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { apx } from '../utils/device'
import Row from './Row'
import Col from './Col'

export interface ICustomToast {
  info: (msg: string) => void;
  error: (msg: string) => void;
  success: (msg: string) => void;
}

const TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
}

const CustomToast = forwardRef((props, ref) => {
  const DURATION: number = 3 * 1000

  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(TYPE.SUCCESS)
  const [message, setMessage] = useState('')

  const timer = useRef()

  useEffect(() => () => {
    clearTimeout(timer.current)
  })

  const exposeFunc = (): ICustomToast => ({
    success: (msg: string): void => {
      clearTimeout(timer.current)
      setType(TYPE.SUCCESS)
      setMessage(msg)
      setVisible(true)
      timer.current = setTimeout(() => setVisible(false), DURATION)
    },

    error: (msg: string): void => {
      clearTimeout(timer.current)
      setType(TYPE.ERROR)
      setMessage(msg)
      setVisible(true)
      timer.current = setTimeout(() => setVisible(false), DURATION)
    },
    info: (msg: string): void => {
      clearTimeout(timer.current)
      setType(TYPE.INFO)
      setMessage(msg)
      setVisible(true)
      timer.current = setTimeout(() => setVisible(false), DURATION)
    },
  })

  useImperativeHandle(ref, exposeFunc)

  if (!visible) {
    return null
  }

  return (
    <Col
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
      }}
    >
      <Row
        style={{
          borderRadius: apx(16),
          backgroundColor: '#3A3E40',
        }}
      >
        <Col
          style={{
            width: apx(2),
            height: apx(48),
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: apx(1),
          }}
        />
        <Text
          style={{
            width: 'auto',
            maxWidth: apx(560),
            color: '#E9EDEF',
            fontSize: apx(28),
            paddingHorizontal: apx(105),
            paddingVertical: apx(25),
          }}
        >
          {message}
        </Text>
      </Row>
    </Col>
  )
})

export default connect(state => state, null, null, { forwardRef: true })(
  CustomToast
)

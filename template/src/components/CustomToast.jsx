import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { apx } from '../utils/device'
import Row from './Row'
import Col from './Col'
import { FontFamily } from '../styles'
import SvgIcon from './SvgIcon'

const CustomToast = forwardRef((props, ref) => {
  const TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
  }
  const DURATION = 3 * 1000

  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(TYPE.SUCCESS)
  const [message, setMessage] = useState('')

  let timer

  useEffect(
    () => () => {
      clearTimeout(timer)
    },
    []
  )

  useImperativeHandle(ref, () => ({
    success: msg => {
      clearTimeout(timer)
      setType(TYPE.SUCCESS)
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), DURATION)
    },

    error: msg => {
      clearTimeout(timer)
      setType(TYPE.ERROR)
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), DURATION)
    },
    info: msg => {
      clearTimeout(timer)
      setType(TYPE.INFO)
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), DURATION)
    },
  }))

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
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <Col style={{ width: apx(96), height: apx(96) }}>
          <SvgIcon
            icon={
              {
                success: 'toast_success',
                error: 'toast_error',
                info: 'toast_info',
              }[type]
            }
            style={{ width: apx(48), height: apx(48) }}
          />
        </Col>

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
            maxWidth: apx(300),
            color: 'white',
            fontWeight: 'bold',
            fontFamily: FontFamily().Medium,
            paddingHorizontal: apx(30),
            paddingVertical: apx(28),
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

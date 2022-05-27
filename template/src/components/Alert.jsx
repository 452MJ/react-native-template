import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Col from './Col'
import { apx, apxInt } from '../utils/device'
import Divider from './Divider'
import Row from './Row'
import Touchable from './Touchable'

export interface IAlert {
  title?: string;
  message: string;
  buttons?: {
    negative?: {
      text?: string,
      onPress?: () => void,
    },
    positive?: {
      text?: string,
      onPress?: () => void,
    },
  };
}

export default connect(state => state)(Alert)
function Alert() {
  const params: IAlert = useRoute().params
  return (
    <Col style={{ flex: 1 }}>
      <Col
        style={{
          width: apx(622),
          borderRadius: apx(16),
          backgroundColor: '#3A3E40',
        }}
        align="stretch"
      >
        <Col
          style={{
            paddingVertical: apx(61),
          }}
        >
          {params.title && (
            <Text
              style={{
                marginTop: apx(4),
                marginBottom: apx(32),
                fontSize: apx(32),
                color: '#E9EDEF',
                fontWeight: '500',
              }}
            >
              {params.title}
            </Text>
          )}

          <Text
            style={{
              width: params.title ? apx(560) : apx(448),
              lineHeight: params.title ? apxInt(40) : apxInt(50),
              fontSize: apx(28),
              color: '#E9EDEF',
              textAlign: params.title ? 'left' : 'center',
            }}
          >
            {params.message}
          </Text>
        </Col>

        <Divider />
        <Row style={{ height: apx(96) }} align="stretch">
          {params.buttons ? (
            <>
              <Touchable
                style={{ flex: 1 }}
                onPress={() => {
                  if (params.buttons?.negative?.onPress) {
                    params.buttons?.negative?.onPress()
                  } else {
                    $navigation.goBack()
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: apx(32),
                    color: '#A6B4BF',
                  }}
                >
                  {params.buttons?.negative?.text || '取消'}
                </Text>
              </Touchable>
              <Row
                style={{
                  alignSelf: 'stretch',
                  borderColor: '#545B61',
                  borderLeftWidth: apx(1),
                  overflow: 'hidden',
                }}
              />

              <Touchable
                style={{ flex: 1 }}
                onPress={() => {
                  if (params.buttons?.positive?.onPress) {
                    params.buttons?.positive?.onPress()
                  } else {
                    $navigation.goBack()
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: apx(32),
                    color: '#F3E0BC',
                  }}
                >
                  {params.buttons?.positive?.text || '确定'}
                </Text>
              </Touchable>
            </>
          ) : (
            <Touchable
              style={{ flex: 1 }}
              onPress={() => {
                $navigation.goBack()
              }}
            >
              <Text
                style={{
                  fontSize: apx(32),
                  color: '#F3E0BC',
                }}
              >
                知道了
              </Text>
            </Touchable>
          )}
        </Row>
      </Col>
    </Col>
  )
}

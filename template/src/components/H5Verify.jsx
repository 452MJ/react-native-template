import React from 'react'
import { connect } from 'react-redux'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { useRoute } from '@react-navigation/native'
import { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes'
import { apx } from '../utils/device'
import Col from './Col'

export interface IH5Verify {
  onSuccess: (result: IH5VerifyResult) => void;
}

export interface IH5VerifyResult {
  token: string;
  sessionId: string;
  sig: string;
}

export default connect(state => state)(H5Verify)
function H5Verify() {
  const { onSuccess }: IH5Verify = useRoute().params

  return (
    <Col style={{ flex: 1 }} onPress={() => $navigation.goBack()}>
      <Col style={{ width: apx(560), height: apx(100) }} onPress={() => null}>
        <WebView
          androidHardwareAccelerationDisabled
          source={{ uri: 'http://testzcxh5.ccmgip.com/appAwsc' }}
          style={{ width: apx(560), flex: 1 }}
          onError={(event: WebViewErrorEvent) => {
            $toast.info('加载失败')
          }}
          onMessage={(event: WebViewMessageEvent) => {
            const result: IH5VerifyResult = JSON.parse(event.nativeEvent.data)
            onSuccess(result)
            $navigation.goBack()
          }}
        />
      </Col>
    </Col>
  )
}

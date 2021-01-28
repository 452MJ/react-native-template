import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import DeviceInfo from 'react-native-device-info'
import codePush from 'react-native-code-push'
import { apx } from '../utils/device'
import ProgressBar from './ProgressBar'
import Button from './Button'

export default class ModalCodePush extends React.PureComponent {
  state = {
    visible: false,
    patch: {},
    current: 0,
    total: 0,
    progress: 0,
    downloading: false,
  }

  componentDidMount() {
    this.check()
    // this.check(false)
  }

  check = async (showTips = false) => {
    try {
      if (showTips) {
        $loading.show(true)
      }

      await codePush.notifyAppReady()

      const currentPatch = await codePush.getUpdateMetadata()
      const latestPatch = await codePush.checkForUpdate()

      // console.log('codepush', currentPatch, latestPatch)
      $loading.hide()
      if (latestPatch === null) {
        // 无更新包
        if (showTips) $toast.show('It is currently the latest version.')
      } else {
        this.setState({ patch: latestPatch, visible: true })
      }
    } catch (e) {
      $loading.hide()
      if (showTips) {
        $toast.show(`Failed to check the new version.`)
      }
    }
  }

  render = () => {
    const { description = null, label = null } = this.state.patch
    return (
      <Modal
        isVisible={this.state.visible}
        style={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        useNativeDriver
      >
        <View
          style={{
            top: apx(-1),
            width: apx(560),
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: apx(20),
          }}
        >
          <Text
            style={{
              fontSize: apx(36),
              fontWeight: '500',
              marginTop: apx(20),
              color: '#FF0062',
            }}
          >
            发现新版本
          </Text>
          <Text
            style={{
              fontSize: apx(22),
              marginVertical: apx(20),
              color: '#1E0E02',
            }}
          >
            新版本 {DeviceInfo.getVersion()} ({label})
          </Text>

          {this.state.downloading ? (
            <View style={{ marginBottom: apx(48) }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: apx(20),
                  fontSize: apx(26),
                  color: '#333',
                }}
              >
                {this.state.current}MB / {this.state.total}MB
              </Text>
              <ProgressBar
                progress={this.state.progress}
                activeColor="#FF0062"
                width={apx(452)}
                height={apx(20)}
              />
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Button
                text="立即更新"
                style={{ width: apx(452), height: apx(80) }}
                textStyle={{ fontSize: apx(26) }}
                onPress={this.startDownload}
              />

              <TouchableOpacity
                style={{
                  width: apx(452),
                  marginBottom: apx(18),
                  paddingVertical: apx(30),
                  alignItems: 'center',
                }}
                onPress={() => this.setState({ visible: false })}
              >
                <Text
                  style={{
                    fontSize: apx(26),
                    color: '#FF0062',
                    textAlign: 'center',
                  }}
                >
                  稍后更新
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    )
  }

  startDownload = async () => {
    this.setState({
      downloading: true,
    })

    if (Platform.OS === 'ios') {
      await codePush.clearUpdates()
      const latestPatch = await codePush.checkForUpdate()
      this.state.patch = latestPatch
    }

    const newPatch = await this.state.patch
      .download(progress => {
        this.setState({
          current: (progress.receivedBytes / (1024 * 1024)).toFixed(2),
          total: (progress.totalBytes / (1024 * 1024)).toFixed(2),
          progress: progress.receivedBytes / progress.totalBytes,
          downloading: true,
        })
      })
      .catch(err => {
        this.setState({
          current: 0,
          total: 0,
          progress: 0,
          visible: false,
          downloading: false,
        })
      })

    this.setState({ visible: false, downloading: false }, () => {
      setTimeout(
        () => {
          newPatch
            .install(codePush.InstallMode.IMMEDIATE)
            .then(() => {
              codePush.allowRestart()
              codePush.restartApp()
            })
            .catch(err => {
              console.log(err)
            })
        },
        Platform.OS === 'ios' ? 0 : 1000
      )
    })
  }
}

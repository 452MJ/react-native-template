import React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import DeviceInfo from 'react-native-device-info'
import codePush from 'react-native-code-push'
import { apx } from '../utils/device'
import ProgressBar from './ProgressBar'
import Button from './Button'
import Touchable from './Touchable'

export default class ModalCodePush extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      patch: {},
      current: 0,
      total: 0,
      progress: 0,
      downloading: false,
    }
  }

  componentDidMount() {
    this.check()
    // this.check(false)
  }

  check = async (showTips = false) => {
    try {
      // if (showTips) {
      //   $loading.show(true)
      // }

      await codePush.notifyAppReady()

      const currentPatch = await codePush.getUpdateMetadata()
      const latestPatch = await codePush.checkForUpdate()

      $loading.hide()
      if (latestPatch === null) {
        // 无更新包
        if (showTips)
          $toast.show(
              $i18n.translation(
                  `当前已是最新版本`,
                  `當前已是最新版本`,
                  `It is currently the latest version.`
              )
          )
      } else {
        const isSilent = latestPatch.description?.indexOf('silent') === 0

        this.setState(
            {
              patch: latestPatch,
              visible: isSilent === false,
            },
            () => {
              if (isSilent) {
                this.startDownload(true)
              }
            }
        )
      }
    } catch (e) {
      $loading.hide()
      if (showTips) {
        $toast.show(
            $i18n.translation(
                `检测新版本失败`,
                `檢測新版本失敗`,
                `Failed to check the new version.`
            )
        )
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
                  color: '#FEBE18',
                }}
            >
              发现新版本
            </Text>
            <Text
                style={{
                  fontSize: apx(22),
                  marginVertical: apx(20),
                  color: '#323F4B',
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
                        color: '#617485',
                      }}
                  >
                    {this.state.current}MB / {this.state.total}MB
                  </Text>
                  <ProgressBar
                      progress={this.state.progress}
                      activeColor="#FEBE18"
                      width={apx(452)}
                      height={apx(20)}
                  />
                </View>
            ) : (
                <View style={{ alignItems: 'center', paddingBottom: apx(32) }}>
                  <Button
                      text="立即更新"
                      theme="gold"
                      contentContainerStyle={{ width: apx(452), height: apx(80) }}
                      textStyle={{ fontSize: apx(26) }}
                      onPress={this.startDownload}
                  />

                  {this.state.patch?.isMandatory === false && (
                      <Touchable
                          contentContainerStyle={{
                            width: apx(452),
                            paddingVertical: apx(30),
                            alignItems: 'center',
                          }}
                          onPress={() => this.setState({ visible: false })}
                      >
                        <Text
                            style={{
                              fontSize: apx(26),
                              color: '#FEBE18',
                              textAlign: 'center',
                            }}
                        >
                          稍后更新
                        </Text>
                      </Touchable>
                  )}
                </View>
            )}
          </View>
        </Modal>
    )
  }

  startDownload = async (silent = false) => {
    !silent &&
    this.setState({
      downloading: true,
    })

    const newPatch = await this.state.patch
        .download(progress => {
          !silent &&
          this.setState({
            current: (progress.receivedBytes / (1024 * 1024)).toFixed(2),
            total: (progress.totalBytes / (1024 * 1024)).toFixed(2),
            progress: progress.receivedBytes / progress.totalBytes,
            downloading: true,
          })
        })
        .catch(err => {
          !silent &&
          this.setState({
            current: 0,
            total: 0,
            progress: 0,
            visible: false,
            downloading: false,
          })
        })

    this.setState({ visible: false, downloading: false }, () => {
      newPatch
          .install(
              silent
                  ? codePush.InstallMode.ON_NEXT_SUSPEND
                  : codePush.InstallMode.IMMEDIATE
          )
          .then(() => {
            codePush.allowRestart()
            !silent && codePush.restartApp()
          })
          .catch(err => {
            console.log(err)
          })
    })
  }
}

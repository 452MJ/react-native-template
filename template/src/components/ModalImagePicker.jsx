import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import ImagePicker, { Image } from 'react-native-image-crop-picker'
import { apx, IPXBarHeight } from '../utils/device'
import Col from './Col'
import Touchable from './Touchable'
import Divider from './Divider'

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected: (res: Image) => void;
}

function ModalImagePicker({ isVisible, onClose, onImageSelected }: IProps) {
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{ margin: 0, padding: 0 }}
      backdropOpacity={0.6}
    >
      <Col
        style={{
          flex: 1,
        }}
        justify="end"
        align="center"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Col style={{ width: apx(750), flex: 1 }} />
        </TouchableWithoutFeedback>

        <Col
          style={{ backgroundColor: '#3A3E40', paddingBottom: IPXBarHeight }}
        >
          <Touchable
            contentContainerStyle={stylesheet.btn}
            onPress={async (): Promise<void> => {
              const res: Image = await ImagePicker.openCamera({
                mediaType: 'photo',
                includeBase64: false,
              })
              if (res) {
                onClose()
                onImageSelected(res)
              }
            }}
          >
            <Text style={stylesheet.text}>拍摄</Text>
          </Touchable>
          <Divider />
          <Touchable
            contentContainerStyle={stylesheet.btn}
            onPress={async (): Promise<void> => {
              const res: Image = await ImagePicker.openPicker({
                mediaType: 'photo',
                includeBase64: false,
                cropping: true,
                cropperCircleOverlay: true,
              })
              if (res) {
                onClose()
                onImageSelected(res)
              }
            }}
          >
            <Text style={stylesheet.text}>从相册选择照片</Text>
          </Touchable>
          <Col
            style={{
              width: apx(750),
              height: apx(12),
              backgroundColor: '#0D0D0D',
            }}
          />
          <Touchable contentContainerStyle={stylesheet.btn} onPress={onClose}>
            <Text style={stylesheet.text}>取消</Text>
          </Touchable>
        </Col>
      </Col>
    </Modal>
  )
}

const stylesheet = StyleSheet.create({
  btn: { backgroundColor: '#3A3E40', height: apx(96), width: apx(750) },
  text: {
    color: '#A6B4BF',
    fontSize: apx(30),
    fontWeight: '400',
  },
})

export default ModalImagePicker

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Orientation from 'react-native-orientation-locker'
// @ts-ignore
import {create} from 'dva-core';
import {Dimensions, LogBox, Platform, UIManager, View} from 'react-native';
import Entry from './entry';
import models from './models/index';

LogBox.ignoreAllLogs(true);

if (!__DEV__) {
  global.console.log = () => {};
}

const app = create();
models.forEach((model: any) => app.model(model));
app.start();

const store = app._store;
global.$store = app._store;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  const onChange = (): void => {};

  useEffect(() => {
    Orientation.lockToPortrait()
    const listener = Dimensions.addEventListener('change', onChange);
    return (): void => {
      listener.remove();
    };
  }, []);

  let width: number = Dimensions.get('window').width;
  if (width > 600) {
    width = 600;
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        flex: 1,
      }}>
      <View style={{flex: 1, width}}>
        <Provider store={store}>
          <Entry />
        </Provider>
      </View>
    </View>
  );
}

export default App;

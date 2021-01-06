export default {
  namespace: 'settings',
  state: {
    locale: {
      isRTL: false,
      languageTag: 'zh-TW',
      countryCode: 'TW',
      languageCode: 'zh',
    },
  },
  reducers: {
    setLocale(state, { payload }) {
      return {
        ...state,
        locale: payload,
      }
    },
  },
  effects: {},
  subscriptions: {},
}

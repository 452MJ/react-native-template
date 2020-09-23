import { action, observable } from 'mobx'

class Store {
  @observable locale = {
    isRTL: false,
    languageTag: 'zh-TW',
    countryCode: 'TW',
    languageCode: 'zh',
  }

  @observable currency = {
    name: 'USD',
    unit: '$',
  }

  @action
  setLocale = async data => {
    this.locale = data
  }

  @action
  setCurrency = async currency => {
    this.currency = currency
  }
}

export default new Store()

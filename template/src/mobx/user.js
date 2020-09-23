import { action, observable } from 'mobx'

interface Iinfo {
  id?: string;
}

class Store {
  @observable iap = []

  @observable login = false

  @observable info: Iinfo = {}

  @action
  setLogin = async (login: Boolean) => {
    this.login = login
    return this.login
  }

  @action
  setIap = async data => {
    this.iap = data
    return this.iap
  }

  @action
  async updateUserInfo(): Iinfo {
    return new Iinfo()
  }
}

export default new Store()

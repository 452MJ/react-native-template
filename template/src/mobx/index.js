import { observable } from 'mobx'
import user from './user'
import settings from './settings'

export const rootStore = observable({
  user,
  settings,
})

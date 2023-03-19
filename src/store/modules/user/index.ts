import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { getLocalState, removeLocalState, setLocalState } from './helper'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState(this.userInfo)
    },
    recordState(userInfo) {
      setLocalState(userInfo)
    },
    signOut() {
      removeLocalState()
    },

  },
  getters: {
    getuserstate() {
      return this.$state
    },
  },
})

import { defineStore } from 'pinia'
import type { UserInfo } from './helper'
import { getLocalState, removeLocalState, setLocalState } from './helper'

export const useUserStore = defineStore('user-store', {
  state: () => {
    return {
      userInfo: {
        ...getLocalState(),
      } as Partial<UserInfo>,
    }
  },
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

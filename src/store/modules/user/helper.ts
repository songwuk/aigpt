import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  email: string
  family_name: string
  given_name: string
  nick_name: string
  open_id: string
  wallet_address: string
  _id: string
  source: number
  status: number
}

export interface UserState {
  userInfo: UserInfo
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeLocalState(): void {
  ss.remove(LOCAL_NAME)
}

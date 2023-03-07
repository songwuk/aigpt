export const getAskContent = (): string | null => {
  const localAsk = localStorage.getItem('localAsk')
  if (localAsk)
    return localAsk
  return null
}

export const removeAskContent = (): void => {
  localStorage.removeItem('localAsk')
}

export const useGlobalLoading = () => {
  // Initially true so SSR HTML includes the loading state, preventing content flashes
  const isLoading = useState<boolean>('global_loading_is_active', () => true)
  const loadingMessage = useState<string>(
    'global_loading_custom_message',
    () => '',
  )

  let stopTimer: ReturnType<typeof setTimeout> | null = null

  const startLoading = (message = '') => {
    if (stopTimer) {
      clearTimeout(stopTimer)
      stopTimer = null
    }
    loadingMessage.value = message
    isLoading.value = true
  }

  const stopLoading = (delay = 350) => {
    if (stopTimer) {
      clearTimeout(stopTimer)
    }

    if (delay > 0) {
      stopTimer = setTimeout(() => {
        isLoading.value = false
        loadingMessage.value = ''
        stopTimer = null
      }, delay)
    } else {
      isLoading.value = false
      loadingMessage.value = ''
    }
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
  }
}

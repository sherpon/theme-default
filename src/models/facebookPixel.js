import { getEnv } from '../config'

/**
 * Send a Facebook pixel's pageView event
 * @param {string} storePixelId - Facebook pixel store id
 */
export const pixelPageView = (storePixelId) => {
  fbq('init', storePixelId)
  fbq('init', getEnv().FACEBOOK_PIXEL_ID)
  fbq('track', 'PageView')
}

import { getEnv } from '../config'

/**
 * Send a Analytics's pageView hit
 * @param {string} storeTrackerId - Analytics store tracker id
 */
export const pageView = (storeTrackerId) => {
  ga('create', storeTrackerId, 'auto')
  ga('create', getEnv().ANALYTICS_TRACK_ID, 'auto', 'sherponTracker')

  ga('send', 'pageview')
  ga('sherponTracker.send', 'pageview')
}

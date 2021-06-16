import kaxios from '../interceptors'
import { GPS } from '../types'

// 기본값 (광화문)
export const defaultGPS: GPS = {
  latitude: 37.575869,
  longitude: 126.976859,
}

export const getLocation = (success: (pos: GeolocationPosition) => void) => {
  if (!navigator.geolocation) {
    return
  }

  navigator.geolocation.getCurrentPosition(success, () => {
    console.log('Unable to access your current location')
  })
  return
}

export const getPlace = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  try {
    const res = await kaxios({
      url: '/place',
      method: 'get',
      params: {
        latitude: latitude,
        longitude: longitude,
      },
    })

    if (res.data.status.code === 3) {
      return '알 수 없음'
    }

    const result = res.data.results[0]

    const building =
      result.land?.addition0?.type === 'building'
        ? result.land?.addition0?.value
        : result.region?.area3?.name

    return building
  } catch (e) {
    console.error(e)
  }
  return '알 수 없음'
}

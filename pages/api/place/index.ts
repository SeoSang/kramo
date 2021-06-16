/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function place(req: NextApiRequest, res: NextApiResponse) {
  const { longitude, latitude } = req.query
  try {
    const addr = await axios({
      url: 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
      method: 'get',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_MAP_API_KEY,
        'X-NCP-APIGW-API-KEY': process.env.MAP_API_SECRET,
      },
      params: {
        request: 'coordsToaddr',
        coords: `${longitude},${latitude}`,
        sourcecrs: 'epsg:4326',
        orders: 'roadaddr',
        output: 'json',
      },
    })
    res.status(200).json(addr.data)
  } catch (e) {
    console.log(e)
    res.status(400).json({ alertText: 'Invalid Request' })
  }
}

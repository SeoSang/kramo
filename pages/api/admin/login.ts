/* eslint-disable no-case-declarations */

import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { UserModel } from 'src/model'
import { setCookie } from 'src/utils/cookies'
import { connectToDatabase } from 'src/utils/mongo'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const TOKEN_NAME = process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!

  try {
    await connectToDatabase()
    switch (req.method) {
      case 'POST':
        const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        const jwtSecret = process.env.JWT_SECRET
        if (!password || !jwtSecret) {
          res.status(501).json({ alertText: 'env 설정 오류' })
          return
        }
        if (req.body.password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          res.status(401).json({ alertText: '비밀번호가 틀립니다' })
          return
        }
        try {
          const mongoUser = await UserModel.findOne({
            email: req.body.email,
          })
          if (!mongoUser) {
            res.status(409).json({ alertText: '존재하지 않는 유저입니다' })
            return
          }
          jwt.sign(
            mongoUser.toJSON(),
            jwtSecret,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              console.log(`token => ${token}`)
              console.log(`err => ${err}`)
              setCookie(res, TOKEN_NAME, token, {
                path: '/',
                sameSite: true,
              })
              res.status(200).json({
                userInfo: mongoUser,
                token,
                alertText: '관리자 로그인 성공!',
              })
            },
          )
        } catch (e) {
          res.status(409).json({
            alertText: '존재하지 않는 유저거나 DB 에러가 발생하였습니다',
          })
          return
        }

        break
      default:
        res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    if (err?.response?.status) {
      res
        .status(err?.response?.status)
        .json({ alertText: err?.response?.statusText })
      return
    }
    console.log(err)
    res.status(500).json({ alertText: 'Unexpected Server Error' })
  }
}

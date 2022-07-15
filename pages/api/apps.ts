import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([])
  //res.status(200).json([{name:'GeForce Now',url:'https://play.geforcenow.com/mall/',id:1},],)
}

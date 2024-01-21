// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {createFolderSupa} from './queries/supabase'

export default async function handler(req, res) {

  const resSupa = await createFolderSupa('shops')
  res.status(200).json({ name: 'John Doe', supaData: resSupa })
}

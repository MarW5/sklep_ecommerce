// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async(req, res) => {
    if(req.method !== "POST"){
        return res.setHeader("Allow", "POST").status(405).json({})
    }
    const email = req.body.email;
    const name = req.body.name;
    if(typeof email !== "string" && typeof name !== "string") {
        return res.status(400).json(req.body)
    }

    const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${process.env.MAILER_GROUP_ID}/subscribers`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-MailerLite-ApiKey': process.env.MAILER_TOKEN
            },
            body: JSON.stringify({
                email,
                name
            })
      })
      if(!response.ok){
        return res.status(500).json({
            error: `Pojawił się problem z zapisem do Newslettera`,
        });
      }
    return res.status(201).json({})
}

export default handler;
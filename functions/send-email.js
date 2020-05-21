const fetch = require("isomorphic-unfetch")
const template = require("./template")

exports.handler = async (event, context, callback) => {
    try{
        let { email, pins } = JSON.parse(event.body)

        let host = process.env.EMAIL_HOST || "https://scout-x.netlify.app/service/"

        let res = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + [process.env.SENDGRID_API_KEY],
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "from": {
                    "email": process.env.EMAIL_FROM || "CHANGEME@CHANGEME.com"
                },
                "subject": "Your pinned services",
                "personalizations": [
                    {
                        "to": [
                            {
                                "email": email
                            }
                        ]
                    }
                ],
                "content": [
                    {
                      "type": "text/html",
                      "value": template(host, pins)
                    }
                ]
            })
        })


        return {
            statusCode: res.status,
            body: JSON.stringify({
                status: res.body
            })
        }
    } catch(e){
        console.error(e)
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e
            })
        }
    }
}


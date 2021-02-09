const NotifyClient = require("notifications-node-client").NotifyClient
const template = require("./template")

var client = new NotifyClient(process.env.NOTIFY_API_KEY)

exports.handler = async (event, context, callback) => {
  try {
    let { email, pins } = JSON.parse(event.body)
    let host = process.env.EMAIL_HOST || "https://scout-x.netlify.app"

    let res = await client.sendEmail(process.env.NOTIFY_TEMPLATE_ID, email, {
      personalisation: {
        pins: template(host, pins),
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: res,
      }),
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e,
      }),
    }
  }
}

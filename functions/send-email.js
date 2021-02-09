const NotifyClient = require("notifications-node-client").NotifyClient

const client = new NotifyClient(process.env.NOTIFY_API_KEY)

exports.handler = async (event, context, callback) => {
  try {
    let { email, pins } = JSON.parse(event.body)
    let host = process.env.EMAIL_HOST || "https://scout-x.netlify.app"

    let res = await client.sendEmail(process.env.NOTIFY_TEMPLATE_ID, email, {
      reference: null,
      personalisation: {
        pins: template(host, pins),
      },
    })

    console.log(res)

    return {
      statusCode: 200,
      body: res,
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

const truncate = (str, noWords) => {
  if (str && noWords > 1) {
    if (str.split(" ").length > noWords) {
      return str.split(" ").splice(0, noWords).join(" ") + "..."
    } else {
      return str
    }
  }
}

const template = (host, pins) =>
  pins
    .map(
      (pin, i) => `
          # ${i}. ${pin.name}\r\n
          ${host}/service/${pin.id}\r\n
          ${truncate(pin.description, 30)}\r\n
        `
    )
    .join()

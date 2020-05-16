const fetch = require("isomorphic-unfetch")
const mail = require("@sendgrid/mail")

exports.handler = async (event, context, callback) => {
    let { email, pins } = JSON.parse(event.body)

    const msg = {
        to: email,
        from: 'test@example.com',
        subject: 'Your pinned services',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    mail.send(msg)


    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: event.queryStringParameters,
            data: event.body
        })
    }
}
const mail = require("@sendgrid/mail")

exports.handler = async (event, context, callback) => {
    try{
        let { email, pins } = JSON.parse(event.body)

        let host = process.env.EMAIL_HOST || "https://scout-x.netlify.app/service/"

        console.log("API KEY: ", process.env.SENDGRID_API_KEY)
        mail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM || "CHANGEME@CHANGEME.com",
            subject: "Your pinned services",
            template_id: process.env.SENDGRID_TEMPLATE_ID,
            dynamic_template_data: { 
                "pins": pins.map(pin =>
                    `<div style="margin-bottom: 25px;">
                        <h2>
                            <a href="${host}${pin.id}">${pin.name}</a>
                        </h2>
                        <p>${truncate(pin.description, 30)}</p>
                        ${pin.website ? `<p><a href="${pin.website}">Visit website</a></p>` : ""}
                        ${pin.email ? `<p><a href="mailto:${pin.email}">Send email</a></p>` : ""}
                    </div>`    
                )
            }
        }
        console.log(msg)
        mail.send(msg)
            .then(() => {
            // Celebrate
            })
            .catch(error => {
            // Log friendly error
                console.error(error);
            });
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: "OK"
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

const truncate = (str, noWords) => {
    if(str && (noWords > 1)){
        if(str.split(" ").length > noWords){
            return str.split(" ").splice(0,noWords).join(" ") + "..."
        } else {
            return str
        }
    }
}
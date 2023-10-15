import ClientModels from "../Models/ClientModel.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const clientDetails = (req, res) => {
    const clientname = req.body.clientname;
    const email = req.body.email;
    const mobile = req.body.mobile;
    if (!clientname || !email || !mobile) {
        return res.status(400).json({
            message: "fill the data properly"
        })
    }
    //logic for phone number
    if ((mobile.trim()).length != 10) {
        return res.status(400).json({
            message: "pls fill 10 digit phone number"
        })
    }
    //logic for checking mail
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const isValidMail = () => {
        return emailRegex.test(email);
    }
    if (!isValidMail) {
        return res.status(400).json({
            message: "pls enter a valid mail"
        })
    }

    // for sending the email automatically
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "chi.chiragbhardwaj@gmail.com",
            pass: "xbhussqqlbkfnlxa"
        }
    })
    var mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            // Appears in header & footer of e-mails
            name: 'Shubh dental clinics',
            link: 'https://mailgen.js/',
            // Optional product logo
        }
    });
    var emailGen = {
        body: {
            name: clientname,
            intro: `<p style="text-align: left;">Welcome to Shubh Dental Clinics! We're very excited to have you on board.<br>
          Here are the details you have submitted:</p>
            <table>
              <tr>
                <td><b>Email:</b></td>
                <td>${email}</td>
              </tr>
              <tr>
                <td><b>Phone :</b></td>
                <td>${mobile}</td>
              </tr>
            </table>
         <p style ="text-align : left">
         Thanks,
         <br>
         Regards
         Shubham Singh(Dental surgeon)
         </>
          `,
            action: {
                instructions: 'To visit our website again, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Services',
                    link: ''
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        },
        // New alignment property
        alignment: 'left'
    };



    const emailbody = mailGenerator.generate(emailGen);
    let message = {
        from: "chi.chiragbhardwaj@gmail.com",
        to: email,
        subject: "Shubg Dental Clinics",
        html: emailbody
    }
    transport.sendMail(message);
    // end of automatic section


    ClientModels.create({
        clientname: clientname,
        email: email,
        mobile: mobile
    }).then((data, err) => {
        if (data) {
            return res.status(201).json({
                message: "client added successfully",
                sent: data
            })
        }
        if (err) {
            return res.status(500).json({
                message: "internal server error"
            })
        }
    });

}

export default clientDetails;
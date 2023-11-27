require("dotenv").config();

const mandrillPkg = require("mandrill-api/mandrill");
const mandrill = new mandrillPkg.Mandrill(process.env.MANDRILL_API_KEY);
const mandrillConfig = {
  mandrill: mandrill,
};
module.exports = mandrillConfig;

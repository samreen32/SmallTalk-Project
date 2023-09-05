import React from "react";
import Navbar from "../Home/HomeSections/Section1/Navbar";
import contact from "../../assets/img/Image-01.svg";
import cdsLogo from "../../assets/img/CDS_Logo_Footer.png";
import { TextField, MenuItem } from "@mui/material";
import call from "../../assets/img/call.svg";
import email from "../../assets/img/Mail.svg";
import support from "../../assets/img/Icon-help.svg";
import "../../App.css";
import ReactCountryFlag from "react-country-flag";

function Contact() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Deps",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Rep",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo {Democratic Rep}",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland {Republic}",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea North",
    "Korea South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar, {Burma}",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St Kitts & Nevis",
    "St Lucia",
    "Saint Vincent & the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  function getCountryCode(countryName) {
    const countryCodes = {
      Afghanistan: "AF",
      Albania: "AL",
      Algeria: "DZ",
      Andorra: "AD",
      Angola: "AO",
      "Antigua & Deps": "AG",
      Argentina: "AR",
      Armenia: "AM",
      Australia: "AU",
      Austria: "AT",
      Azerbaijan: "AZ",
      Bahamas: "BS",
      Bahrain: "BH",
      Bangladesh: "BD",
      Barbados: "BB",
      Belarus: "BY",
      Belgium: "BE",
      Belize: "BZ",
      Benin: "BJ",
      Bhutan: "BT",
      Bolivia: "BO",
      "Bosnia Herzegovina": "BA",
      Botswana: "BW",
      Brazil: "BR",
      Brunei: "BN",
      Bulgaria: "BG",
      Burkina: "BF",
      Burundi: "BI",
      Cambodia: "KH",
      Cameroon: "CM",
      Canada: "CA",
      "Cape Verde": "CV",
      "Central African Rep": "CF",
      Chad: "TD",
      Chile: "CL",
      China: "CN",
      Colombia: "CO",
      Comoros: "KM",
      Congo: "CG",
      "Congo {Democratic Rep}": "CD",
      "Costa Rica": "CR",
      Croatia: "HR",
      Cuba: "CU",
      Cyprus: "CY",
      "Czech Republic": "CZ",
      Denmark: "DK",
      Djibouti: "DJ",
      Dominica: "DM",
      "Dominican Republic": "DO",
      "East Timor": "TL",
      Ecuador: "EC",
      Egypt: "EG",
      "El Salvador": "SV",
      "Equatorial Guinea": "GQ",
      Eritrea: "ER",
      Estonia: "EE",
      Ethiopia: "ET",
      Fiji: "FJ",
      Finland: "FI",
      France: "FR",
      Gabon: "GA",
      Gambia: "GM",
      Georgia: "GE",
      Germany: "DE",
      Ghana: "GH",
      Greece: "GR",
      Grenada: "GD",
      Guatemala: "GT",
      Guinea: "GN",
      "Guinea-Bissau": "GW",
      Guyana: "GY",
      Haiti: "HT",
      Honduras: "HN",
      Hungary: "HU",
      Iceland: "IS",
      India: "IN",
      Indonesia: "ID",
      Iran: "IR",
      Iraq: "IQ",
      "Ireland {Republic}": "IE",
      Israel: "IL",
      Italy: "IT",
      "Ivory Coast": "CI",
      Jamaica: "JM",
      Japan: "JP",
      Jordan: "JO",
      Kazakhstan: "KZ",
      Kenya: "KE",
      Kiribati: "KI",
      "Korea North": "KP",
      "Korea South": "KR",
      Kosovo: "XK",
      Kuwait: "KW",
      Kyrgyzstan: "KG",
      Laos: "LA",
      Latvia: "LV",
      Lebanon: "LB",
      Lesotho: "LS",
      Liberia: "LR",
      Libya: "LY",
      Liechtenstein: "LI",
      Lithuania: "LT",
      Luxembourg: "LU",
      Macedonia: "MK",
      Madagascar: "MG",
      Malawi: "MW",
      Malaysia: "MY",
      Maldives: "MV",
      Mali: "ML",
      Malta: "MT",
      "Marshall Islands": "MH",
      Mauritania: "MR",
      Mauritius: "MU",
      Mexico: "MX",
      Micronesia: "FM",
      Moldova: "MD",
      Monaco: "MC",
      Mongolia: "MN",
      Montenegro: "ME",
      Morocco: "MA",
      Mozambique: "MZ",
      "Myanmar, {Burma}": "MM",
      Namibia: "NA",
      Nauru: "NR",
      Nepal: "NP",
      Netherlands: "NL",
      "New Zealand": "NZ",
      Nicaragua: "NI",
      Niger: "NE",
      Nigeria: "NG",
      Norway: "NO",
      Oman: "OM",
      Pakistan: "PK",
      Palau: "PW",
      Panama: "PA",
      "Papua New Guinea": "PG",
      Paraguay: "PY",
      Peru: "PE",
      Philippines: "PH",
      Poland: "PL",
      Portugal: "PT",
      Qatar: "QA",
      Romania: "RO",
      "Russian Federation": "RU",
      Rwanda: "RW",
      "St Kitts & Nevis": "KN",
      "St Lucia": "LC",
      "Saint Vincent & the Grenadines": "VC",
      Samoa: "WS",
      "San Marino": "SM",
      "Sao Tome & Principe": "ST",
      "Saudi Arabia": "SA",
      Senegal: "SN",
      Serbia: "RS",
      Seychelles: "SC",
      "Sierra Leone": "SL",
      Singapore: "SG",
      Slovakia: "SK",
      Slovenia: "SI",
      "Solomon Islands": "SB",
      Somalia: "SO",
      "South Africa": "ZA",
      "South Sudan": "SS",
      Spain: "ES",
      "Sri Lanka": "LK",
      Sudan: "SD",
      Suriname: "SR",
      Swaziland: "SZ",
      Sweden: "SE",
      Switzerland: "CH",
      Syria: "SY",
      Taiwan: "TW",
      Tajikistan: "TJ",
      Tanzania: "TZ",
      Thailand: "TH",
      Togo: "TG",
      Tonga: "TO",
      "Trinidad & Tobago": "TT",
      Tunisia: "TN",
      Turkey: "TR",
      Turkmenistan: "TM",
      Tuvalu: "TV",
      Uganda: "UG",
      Ukraine: "UA",
      "United Arab Emirates": "AE",
      "United Kingdom": "GB",
      "United States": "US",
      Uruguay: "UY",
      Uzbekistan: "UZ",
      Vanuatu: "VU",
      "Vatican City": "VA",
      Venezuela: "VE",
      Vietnam: "VN",
      Yemen: "YE",
      Zambia: "ZM",
      Zimbabwe: "ZW",
    };

    return countryCodes[countryName] || "Unknown";
  }

  const currencies = countries.map((country, index) => ({
    value: index.toString(),
    label: country,
  }));

  return (
    <>
      <Navbar />

      {/* <header className="jumbotron">
          <div class="card text" style={{ maxHeight: "50%" }}>
            <img
              src={contact}
              width="100%"
              height="100%"
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay">
              <div
                class="col-12 col-sm-6 my-5"
                style={{
                  margin: "auto",
                  display: "block",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <h1>Contact Us</h1>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <div
                style={{
                  padding: "7% 10%",
                  backgroundColor: "#FFFFFF",
                  width: "70%",
                  margin: "auto",
                  display: "block",
                  alignItems: "center",
                  color: "black",
                }}
                className="my-5"
              >
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header> */}

      <div style={{ position: "relative" }}>
        {/* Contact Form */}
        <div
          style={{
            padding: "7% 10%",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            width: "70%",
            margin: "auto",
            display: "block",
            alignItems: "center",
            color: "black",
            position: "absolute",
            top: "80%",
            left: "0",
            right: "0",
          }}
        >
          <img
            src={cdsLogo}
            alt="Logo"
            width="25%"
            height="25%"
            style={{
              margin: "auto",
              display: "block",
              textAlign: "center",
              alignItems: "center",
            }}
          />
          <form className="my-5">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Your name*
                </label>
                <div className="mb-3">
                  <TextField required id="name" variant="filled" fullWidth />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="contactEmail" className="form-label">
                  Contact email*
                </label>
                <div className="mb-3">
                  <TextField
                    required
                    id="contactEmail"
                    variant="filled"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Company name*
                </label>
                <div className="mb-3">
                  <TextField required id="name" variant="filled" fullWidth />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="contactEmail" className="form-label">
                  Country*
                </label>
                <div className="mb-3">
                  <TextField
                    id="country"
                    select
                    helperText="Please select your country"
                    variant="filled"
                    style={{ width: "100%" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <ReactCountryFlag
                          countryCode={getCountryCode(option.label)}
                          svg
                          style={{ marginRight: "8px" }}
                        />
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            <label htmlFor="contactEmail" className="form-label">
              Your message*
            </label>

            <div className="mb-3">
              <textarea
                class="form-control"
                placeholder="Type your message here...."
                id="floatingTextarea"
              ></textarea>
            </div>

            <p style={{ color: "#5A7184" }}>
              {" "}
              By submitting this form you agree to our terms and conditions and
              our Privacy Policy which explains how we may collect, use and
              disclose your personal information including to third parties.
            </p>
            <button
              type="submit"
              className="btn project-button"
              // style={{ width: "20%" }}
            >
              Contact
            </button>
          </form>
        </div>

        {/* Contact Header */}
        <header class="jumbotron">
          <div
            style={{
              margin: "auto",
              display: "block",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <div class="row row-header">
              <div
                class="col-12 col-sm-6"
                style={{
                  margin: "auto",
                  display: "block",
                  textAlign: "center",
                  alignItems: "center",
                  marginTop: "-20vh",
                }}
              >
                <h1 style={{ fontSize: "4vw" }}>
                  <b>Contact Us</b>
                </h1>
                <p className="my-3">
                  If you need our help, have questions about how to use the
                  platform or are experiencing technical difficulties, please do
                  not hesitate to contact us.
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Contact footer */}
      <div className="contentFooter">
        <div class="row">
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={email} className="my-3" />
                </div>
                <h5 class="card-title my-3">Email us</h5>
                <p class="card-text">
                  Email us for general queries, including marketing and
                  partnership opportunities.
                </p>
                <p className="contact-p">cds@helpcenter.com</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={call} className="my-3" />
                </div>
                <h5 class="card-title my-3">Call us</h5>
                <p class="card-text">
                  Call us to speak to a member of our team. We are always happy
                  to help.
                </p>
                <p className="contact-p">+1 (123) 456-7890</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={support} className="my-3" />
                </div>
                <h5 class="card-title my-3">Support</h5>
                <p class="card-text">
                  Check out helpful resources, FAQs and developer tools.
                </p>
                <button className="btn btn-outline-info contact-p">
                  Support Center{" "}
                  <i
                    class="fa fa-arrow-right"
                    color="#5CB3CF"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

// Warn when the page is being closed or reloaded
window.addEventListener("beforeunload", (event) => {
  hideWidget();
});

var feedbackInput;
var feedbackValue;
var starRating = 0;

function getStarValue(event) {
  if (event.target.tagName === "INPUT") {
    const rating = event.target.value;
    starRating = rating;
    if (rating <= 3) {
      handleGiveFeedback();
    } else {
      hideWidget();
    }
  }
}

function clearStarValue() {
  document.querySelectorAll(".stars input").forEach((input) => {
    input.checked = false;
  });

  starRating = 0;
}

const handleGiveFeedback = () => {
  const feedbackInputField = document.getElementById("feedback-input-field");
  feedbackInputField.classList.add("show");

  const feedbackButtonContainer = document.getElementById(
    "feedback-button-container"
  );
  feedbackButtonContainer.classList.add("hide");

  const feedbackSubmitButtonContainer = document.getElementById(
    "feedback-submit-button-container"
  );
  feedbackSubmitButtonContainer.classList.add("show");

  const feedbackQuestion = document.getElementById("feedback-question");
  feedbackQuestion.innerText =
    "Please specify the query intent and your feedback below";
};

// ------------ Form 1 -------------

function handleSaveUserDetails() {
  document.querySelectorAll(".error-text").forEach((e) => (e.textContent = ""));
  let isValid = true;

  const email = document.getElementById("email").value.trim();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const phone = document.getElementById("phone-number").value.trim();
  const city = document.getElementById("city").value.trim();
  const postcode = document.getElementById("postcode").value.trim();
  const country = document.getElementById("country").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("email-error", "Enter a valid email address.");
    isValid = false;
  }

  if (!firstName) {
    showError("first-name-error", "First name is required.");
    isValid = false;
  }

  if (!lastName) {
    showError("last-name-error", "Last name is required.");
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showError("phone-number-error", "Enter a valid 10-digit phone number.");
    isValid = false;
  }

  if (!city) {
    showError("city-error", "City is required.");
    isValid = false;
  }

  if (!postcode) {
    showError("postcode-error", "Postcode is required.");
    isValid = false;
  }

  if (!country) {
    showError("country-error", "Country is required.");
    isValid = false;
  }

  if (!isValid) return;

  const details = {
    email,
    firstName,
    lastName,
    phone,
    city,
    postcode,
    country,
  };
  userDetailsModalHide();
  sendUserDetailsToChatbot(details);
}

function sendUserDetailsToChatbot(details) {
  const messageText = `
                Email: ${details.email}
                FirstName: ${details.firstName}
                LastName: ${details.lastName}
                Phone: ${details.phone}
                City: ${details.city}
                Postcode: ${details.postcode}
                Country: ${details.country}
            `.trim();

  const triangleRight = document.createElement("div");
  triangleRight.className = "triangle-right";

  const outgoingMsgBox = document.createElement("div");
  outgoingMsgBox.className = "d-flex outgoing-msg";

  const outgoingMsgText = document.createElement("p");
  outgoingMsgText.className = "outgoing-msg-text";
  outgoingMsgText.innerText = messageText;

  const outgoingMsgTime = document.createElement("i");
  outgoingMsgTime.className = "outgoing-msg-time";
  outgoingMsgTime.innerText = formatAMPM(new Date());

  outgoingMsgText.append(outgoingMsgTime);

  const personImg = document.createElement("div");
  personImg.className = "person-img";

  outgoingMsgBox.append(outgoingMsgText, triangleRight, personImg);

  const bottomChat1 = document.createElement("div");
  MRChatboxUl.append(outgoingMsgBox, bottomChat1);

  bottomChat1.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    generateResponse("step", messageText);
  }, 0);
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = "";
}

function resetUserDetailsForm() {
  const form = document.getElementById("user-details-form");

  if (!form) return;

  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.value = "";
  });

  form.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = "";
  });

  form.querySelectorAll(".error, .success").forEach((el) => {
    el.classList.remove("error", "success");
  });
}

// ------------ Form 2 -------------

function handleSaveUserDetails2() {
  document.querySelectorAll(".error-text").forEach((e) => (e.textContent = ""));
  let isValid = true;

  const firstName = document.getElementById("first-name-2").value.trim();
  const lastName = document.getElementById("last-name-2").value.trim();
  const email = document.getElementById("email-2").value.trim();
  const phone = document.getElementById("phone-number-2").value.trim();
  const company = document.getElementById("company-name").value.trim();
  const street = document.getElementById("street-address").value.trim();
  const postcode = document.getElementById("postcode-2").value.trim();
  const city = document.getElementById("city-2").value.trim();
  const country = document.getElementById("country-2").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("email-2-error", "Enter a valid email address.");
    isValid = false;
  }

  if (!firstName) {
    showError("first-name-2-error", "First name is required.");
    isValid = false;
  }

  if (!lastName) {
    showError("last-name-2-error", "Last name is required.");
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showError("phone-number-2-error", "Enter a valid 10-digit phone number.");
    isValid = false;
  }

  if (!company) {
    showError("company-name-error", "Company name is required.");
    isValid = false;
  }

  if (!street) {
    showError("street-address-error", "Street address is required.");
    isValid = false;
  }

  if (!postcode) {
    showError("postcode-2-error", "Postcode is required.");
    isValid = false;
  }

  if (!city) {
    showError("city-2-error", "City is required.");
    isValid = false;
  }

  if (!country) {
    showError("country-2-error", "Country is required.");
    isValid = false;
  }

  if (!isValid) return;

  const details = {
    firstName,
    lastName,
    email,
    phone,
    company,
    street,
    postcode,
    city,
    country,
  };
  userDetailsModal2Hide();
  sendUserDetailsToChatbot2(details);
}

function sendUserDetailsToChatbot2(details) {
  const messageText = `
                First Name: ${details.firstName}
                Last Name: ${details.lastName}
                Email: ${details.email}
                Phone: ${details.phone}
                Company: ${details.company}
                Street: ${details.street}
                Postcode: ${details.postcode}
                City: ${details.city}
                Country: ${details.country}
                `.trim();

  const triangleRight = document.createElement("div");
  triangleRight.className = "triangle-right";

  const outgoingMsgBox = document.createElement("div");
  outgoingMsgBox.className = "d-flex outgoing-msg";

  const outgoingMsgText = document.createElement("p");
  outgoingMsgText.className = "outgoing-msg-text";
  outgoingMsgText.innerText = messageText;

  const outgoingMsgTime = document.createElement("i");
  outgoingMsgTime.className = "outgoing-msg-time";
  outgoingMsgTime.innerText = formatAMPM(new Date());

  outgoingMsgText.append(outgoingMsgTime);

  const personImg = document.createElement("div");
  personImg.className = "person-img";

  outgoingMsgBox.append(outgoingMsgText, triangleRight, personImg);

  const bottomChat1 = document.createElement("div");
  MRChatboxUl.append(outgoingMsgBox, bottomChat1);

  bottomChat1.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    generateResponse("step", messageText);
  }, 0);
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = "";
}

function resetUserDetailsForm2() {
  const form = document.getElementById("user-details-form-2");

  if (!form) return;

  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.value = "";
  });

  form.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = "";
  });

  form.querySelectorAll(".error, .success").forEach((el) => {
    el.classList.remove("error", "success");
  });
}

// ------------ Form 3 -------------
function handleSaveUserDetails3() {
  document.querySelectorAll(".error-text").forEach((e) => (e.textContent = ""));
  let isValid = true;

  const firstName = document.getElementById("first-name-3").value.trim();
  const lastName = document.getElementById("last-name-3").value.trim();
  const email = document.getElementById("email-3").value.trim();
  const phone = document.getElementById("phone-number-3").value.trim();
  const company = document.getElementById("company-name-3").value.trim();
  const street = document.getElementById("street-3").value.trim();
  const postcode = document.getElementById("postcode-3").value.trim();
  const city = document.getElementById("city-3").value.trim();
  const country = document.getElementById("country-3").value.trim();
  const product = document.getElementById("product-3").value.trim();
  const serialNumber = document.getElementById("serial-number-3").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("email-3-error", "Enter a valid email address.");
    isValid = false;
  }

  if (!firstName) {
    showError("first-name-3-error", "First name is required.");
    isValid = false;
  }

  if (!lastName) {
    showError("last-name-3-error", "Last name is required.");
    isValid = false;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showError("phone-number-3-error", "Enter a valid 10-digit phone number.");
    isValid = false;
  }

  if (!company) {
    showError("company-name-3-error", "Company name is required.");
    isValid = false;
  }

  if (!street) {
    showError("street-3-error", "Street is required.");
    isValid = false;
  }

  if (!postcode) {
    showError("postcode-3-error", "Postcode is required.");
    isValid = false;
  }

  if (!city) {
    showError("city-3-error", "City is required.");
    isValid = false;
  }

  if (!country) {
    showError("country-3-error", "Country is required.");
    isValid = false;
  }

  if (!product) {
    showError("product-3-error", "Product is required.");
    isValid = false;
  }

  if (!serialNumber) {
    showError("serial-number-3-error", "Serial number is required.");
    isValid = false;
  }

  if (!isValid) return;

  const details = {
    firstName,
    lastName,
    email,
    phone,
    company,
    street,
    postcode,
    city,
    country,
    product,
    serialNumber,
  };
  userDetailsModal3Hide();
  sendUserDetailsToChatbot3(details);
}

function sendUserDetailsToChatbot3(details) {
  const messageText = `
                First Name: ${details.firstName}
                Last Name: ${details.lastName}
                Email: ${details.email}
                Phone: ${details.phone}
                Company: ${details.company}
                Street: ${details.street}
                Postcode: ${details.postcode}
                City: ${details.city}
                Country: ${details.country}
                Product: ${details.product}
                Serial Number: ${details.serialNumber}
                `.trim();

  const triangleRight = document.createElement("div");
  triangleRight.className = "triangle-right";

  const outgoingMsgBox = document.createElement("div");
  outgoingMsgBox.className = "d-flex outgoing-msg";

  const outgoingMsgText = document.createElement("p");
  outgoingMsgText.className = "outgoing-msg-text";
  outgoingMsgText.innerText = messageText;

  const outgoingMsgTime = document.createElement("i");
  outgoingMsgTime.className = "outgoing-msg-time";
  outgoingMsgTime.innerText = formatAMPM(new Date());

  outgoingMsgText.append(outgoingMsgTime);

  const personImg = document.createElement("div");
  personImg.className = "person-img";

  outgoingMsgBox.append(outgoingMsgText, triangleRight, personImg);

  const bottomChat = document.createElement("div");
  MRChatboxUl.append(outgoingMsgBox, bottomChat);

  bottomChat.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    generateResponse("step", messageText);
  }, 0);
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

function resetUserDetailsForm3() {
  const form = document.getElementById("user-details-form-3");
  if (!form) return;

  form
    .querySelectorAll("input, select, textarea")
    .forEach((el) => (el.value = ""));
  form.querySelectorAll(".error-text").forEach((el) => (el.textContent = ""));
  form
    .querySelectorAll(".error, .success")
    .forEach((el) => el.classList.remove("error", "success"));
}

const MRChatbotSection = document.getElementById("MR-chatbot-section");
MRChatbotSection.className = "MR-chatbot-section";

const loadingContainer = document.createElement("div");
loadingContainer.className = "loading-container";
loadingContainer.innerHTML = `<div class="spinner"></div>`;

const feedbackModal = document.createElement("div");
feedbackModal.className = "feedback-modal";
feedbackModal.innerHTML = `<div id="feedback-container" class="feedback-container">
                                    <p id="feedback-question">Please rate your experience with us</p>
                                    <div class="stars" onclick="getStarValue(event)">
                                        <input type="radio" id="star5" name="rating" value="5">
                                        <label for="star5">★</label>

                                        <input type="radio" id="star4" name="rating" value="4">
                                        <label for="star4">★</label>

                                        <input type="radio" id="star3" name="rating" value="3">
                                        <label for="star3">★</label>

                                        <input type="radio" id="star2" name="rating" value="2">
                                        <label for="star2">★</label>

                                        <input type="radio" id="star1" name="rating" value="1">
                                        <label for="star1">★</label>
                                    </div>
                                    <textarea type="text" placeholder="Enter your feedback here" id="feedback-input-field" class="feedback-input-field" ></textarea>
                                    <div id="feedback-button-container" class="feedback-button-container" >
                                        <button style="background-color: #00904a; color: #fff; border: none; width: 50%; border-radius: 5px; padding: 3px;" onclick="handleGiveFeedback()">Yes</button>
                                        <button style="background-color: lightgrey; color: #000; border: none; width: 50%; border-radius: 5px; padding: 3px;" onclick="hideWidget()">No</button>
                                    </div>
                                    <div id="feedback-submit-button-container" class="feedback-submit-button-container">
                                        <button style="background-color: #00904a; color: #fff; border: none; width: 100%; border-radius: 5px; padding: 3px;" onclick="hideWidget()"">Submit</button>
                                    </div>
                                </div>`;

const userDetailsModal = document.createElement("div");
userDetailsModal.className = "feedback-modal";
userDetailsModal.innerHTML = `<div id="feedback-container" class="feedback-container">
                                        <p id="details-question">Please enter your contact information</p>
                                        <form id="user-details-form" class="user-details-container" noValidate>
                                            <input
                                                type="email"
                                                id="email"
                                                class="user-input-field"
                                                placeholder="Email address"
                                                required
                                                oninput="clearError('email-error')"
                                            />
                                            <small id="email-error" class="error-text"></small>

                                            <input
                                                type="text"
                                                id="first-name"
                                                class="user-input-field"
                                                placeholder="First name"
                                                required
                                                oninput="clearError('first-name-error')"
                                            />
                                            <small id="first-name-error" class="error-text"></small>

                                            <input
                                                type="text"
                                                id="last-name"
                                                class="user-input-field"
                                                placeholder="Last name"
                                                required
                                                oninput="clearError('last-name-error')"
                                            />
                                            <small id="last-name-error" class="error-text"></small>

                                            <input
                                                type="number"
                                                id="phone-number"
                                                class="user-input-field"
                                                placeholder="Phone number"
                                                pattern="[0-9]{10}"
                                                required
                                                oninput="clearError('phone-number-error')"
                                            />
                                            <small id="phone-number-error" class="error-text"></small>

                                            <input
                                                type="text"
                                                id="city"
                                                class="user-input-field"
                                                placeholder="City"
                                                required
                                                oninput="clearError('city-error')"
                                            />
                                            <small id="city-error" class="error-text"></small>

                                            <input
                                                type="text"
                                                id="postcode"
                                                class="user-input-field"
                                                placeholder="Postcode"
                                                required
                                                oninput="clearError('postcode-error')"
                                            />
                                            <small id="postcode-error" class="error-text"></small>


                                            <input list="countries" name="country" id="country" placeholder="Country" onchange="clearError('country-error')">

                                                <datalist id="countries">
                                                    <option value="Afghanistan">
                                                    <option value="Albania">
                                                    <option value="Algeria">
                                                    <option value="Andorra">
                                                    <option value="Angola">
                                                    <option value="Armenia">
                                                    <option value="Australia">
                                                    <option value="Austria">
                                                    <option value="Azerbaijan">
                                                    <option value="Bahrain">
                                                    <option value="Bangladesh">
                                                    <option value="Belarus">
                                                    <option value="Belgium">
                                                    <option value="Benin">
                                                    <option value="Bhutan">
                                                    <option value="Bosnia and Herzegovina">
                                                    <option value="Botswana">
                                                    <option value="Brunei Darussalam">
                                                    <option value="Bulgaria">
                                                    <option value="Burkina Faso">
                                                    <option value="Burundi">
                                                    <option value="Cabo Verde">
                                                    <option value="Cambodia">
                                                    <option value="Cameroon">
                                                    <option value="Cayman Islands">
                                                    <option value="Central African Republic">
                                                    <option value="Chad">
                                                    <option value="China">
                                                    <option value="Cocos (Keeling) Islands">
                                                    <option value="Comoros">
                                                    <option value="DR Congo">
                                                    <option value="Congo">
                                                    <option value="Cook Islands">
                                                    <option value="Croatia">
                                                    <option value="Cyprus">
                                                    <option value="Czechia">
                                                    <option value="Côte d'Ivoire">
                                                    <option value="Denmark">
                                                    <option value="Djibouti">
                                                    <option value="Egypt">
                                                    <option value="Equatorial Guinea">
                                                    <option value="Eritrea">
                                                    <option value="Estonia">
                                                    <option value="Eswatini">
                                                    <option value="Ethiopia">
                                                    <option value="Faroe Islands">
                                                    <option value="Fiji">
                                                    <option value="Finland">
                                                    <option value="France">
                                                    <option value="French Guiana">
                                                    <option value="French Polynesia">
                                                    <option value="Gabon">
                                                    <option value="Gambia (the)">
                                                    <option value="Georgia">
                                                    <option value="Germany">
                                                    <option value="Ghana">
                                                    <option value="Gibraltar">
                                                    <option value="Greece">
                                                    <option value="Greenland">
                                                    <option value="Guadeloupe">
                                                    <option value="Guinea">
                                                    <option value="Guinea-Bissau">
                                                    <option value="Hong Kong">
                                                    <option value="Hungary">
                                                    <option value="Iceland">
                                                    <option value="India">
                                                    <option value="Indonesia">
                                                    <option value="Iran">
                                                    <option value="Iraq">
                                                    <option value="Ireland">
                                                    <option value="Isle of Man">
                                                    <option value="Israel">
                                                    <option value="Italy">
                                                    <option value="Japan">
                                                    <option value="Jordan">
                                                    <option value="Kazakhstan">
                                                    <option value="Kenya">
                                                    <option value="Kiribati">
                                                    <option value="Korea">
                                                    <option value="Kuwait">
                                                    <option value="Kyrgyzstan">
                                                    <option value="Latvia">
                                                    <option value="Lebanon">
                                                    <option value="Lesotho">
                                                    <option value="Liberia">
                                                    <option value="Libya">
                                                    <option value="Liechtenstein">
                                                    <option value="Lithuania">
                                                    <option value="Macao">
                                                    <option value="Malawi">
                                                    <option value="Malaysia">
                                                    <option value="Maldives">
                                                    <option value="Mali">
                                                    <option value="Malta">
                                                    <option value="Moldova">
                                                    <option value="Monaco">
                                                    <option value="Mongolia">
                                                    <option value="Montenegro">
                                                    <option value="Morocco">
                                                    <option value="Mozambique">
                                                    <option value="Myanmar">
                                                    <option value="Namibia">
                                                    <option value="Nauru">
                                                    <option value="Nepal">
                                                    <option value="Netherlands">
                                                    <option value="New Caledonia">
                                                    <option value="New Zealand">
                                                    <option value="Nicaragua">
                                                    <option value="Niger">
                                                    <option value="Nigeria">
                                                    <option value="North Macedonia">
                                                    <option value="Norway">
                                                    <option value="Oman">
                                                    <option value="Pakistan">
                                                    <option value="Palestine">
                                                    <option value="Papua New Guinea">
                                                    <option value="Philippines">
                                                    <option value="Poland">
                                                    <option value="Portugal">
                                                    <option value="Qatar">
                                                    <option value="Romania">
                                                    <option value="Russia">
                                                    <option value="Rwanda">
                                                    <option value="Samoa">
                                                    <option value="San Marino">
                                                    <option value="Saudi Arabia">
                                                    <option value="Senegal">
                                                    <option value="Serbia">
                                                    <option value="Seychelles">
                                                    <option value="Sierra Leone">
                                                    <option value="Singapore">
                                                    <option value="Slovakia">
                                                    <option value="Slovenia">
                                                    <option value="Somalia">
                                                    <option value="South Africa">
                                                    <option value="South Sudan">
                                                    <option value="Spain">
                                                    <option value="Sri Lanka">
                                                    <option value="Sudan">
                                                    <option value="Suriname">
                                                    <option value="Sweden">
                                                    <option value="Switzerland">
                                                    <option value="Syria">
                                                    <option value="Taiwan">
                                                    <option value="Tajikistan">
                                                    <option value="Tanzania">
                                                    <option value="Thailand">
                                                    <option value="Togo">
                                                    <option value="Tonga">
                                                    <option value="Tunisia">
                                                    <option value="Turkey">
                                                    <option value="Turkmenistan">
                                                    <option value="Tuvalu">
                                                    <option value="Uganda">
                                                    <option value="Ukraine">
                                                    <option value="United Arab Emirates">
                                                    <option value="United Kingdom">
                                                    <option value="Uzbekistan">
                                                    <option value="Viet Nam">
                                                    <option value="Western Sahara">
                                                    <option value="Yemen">
                                                    <option value="Zambia">
                                                    <option value="Zimbabwe">
                                                    <option value="Kosovo">
                                            </datalist>

                                            <small id="country-error" class="error-text"></small>

                                            <div id="user-button-container" class="user-button-container">
                                                <button
                                                style="background-color: #00904a; color: #fff; border: none; width: 50%; border-radius: 5px; padding: 3px;"
                                                type="button"
                                                onclick="handleSaveUserDetails()"
                                                >
                                                Submit
                                                </button>
                                                <button
                                                style="background-color: lightgrey; color: #000; border: none; width: 50%; border-radius: 5px; padding: 3px;"
                                                type="button"
                                                onclick="userDetailsModalHide()"
                                                >
                                                Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>`;

const userDetailsModal2 = document.createElement("div");
userDetailsModal2.className = "feedback-modal";
userDetailsModal2.innerHTML = `<div id="feedback-container" class="feedback-container">
                                            <p id="details-question">Please enter your contact information</p>
                                            <form id="user-details-form-2" class="user-details-container" noValidate>
                                                <input
                                                    type="text"
                                                    id="first-name-2"
                                                    class="user-input-field"
                                                    placeholder="First name"
                                                    required
                                                    oninput="clearError('first-name-2-error')"
                                                />
                                                <small id="first-name-2-error" class="error-text"></small>

                                                <input
                                                    type="text"
                                                    id="last-name-2"
                                                    class="user-input-field"
                                                    placeholder="Last name"
                                                    required
                                                    oninput="clearError('last-name-2-error')"
                                                />
                                                <small id="last-name-2-error" class="error-text"></small>

                                                <input
                                                    type="email"
                                                    id="email-2"
                                                    class="user-input-field"
                                                    placeholder="Email address"
                                                    required
                                                    oninput="clearError('email-2-error')"
                                                />
                                                <small id="email-2-error" class="error-text"></small>

                                                <input
                                                    type="number"
                                                    id="phone-number-2"
                                                    class="user-input-field"
                                                    placeholder="Phone number"
                                                    pattern="[0-9]{10}"
                                                    required
                                                    oninput="clearError('phone-number-2-error')"
                                                />
                                                <small id="phone-number-2-error" class="error-text"></small>

                                                <input
                                                    type="text"
                                                    id="company-name"
                                                    class="user-input-field"
                                                    placeholder="Company name"
                                                    required
                                                    oninput="clearError('company-name-error')"
                                                />
                                                <small id="company-name-error" class="error-text"></small>

                                                <input
                                                    type="text"
                                                    id="street-address"
                                                    class="user-input-field"
                                                    placeholder="Street address"
                                                    required
                                                    oninput="clearError('street-address-error')"
                                                />
                                                <small id="street-address-error" class="error-text"></small>

                                                <input
                                                    type="text"
                                                    id="postcode-2"
                                                    class="user-input-field"
                                                    placeholder="Postcode"
                                                    required
                                                    oninput="clearError('postcode-2-error')"
                                                />
                                                <small id="postcode-2-error" class="error-text"></small>

                                                <input
                                                    type="text"
                                                    id="city-2"
                                                    class="user-input-field"
                                                    placeholder="City"
                                                    required
                                                    oninput="clearError('city-2-error')"
                                                />
                                                <small id="city-2-error" class="error-text"></small>

                                                
                                                <input list="countries-2" name="country" id="country-2" placeholder="Country" onchange="clearError('country-2-error')">

                                                <datalist id="countries-2">
                                                    <option value="Afghanistan">
                                                    <option value="Albania">
                                                    <option value="Algeria">
                                                    <option value="Andorra">
                                                    <option value="Angola">
                                                    <option value="Armenia">
                                                    <option value="Australia">
                                                    <option value="Austria">
                                                    <option value="Azerbaijan">
                                                    <option value="Bahrain">
                                                    <option value="Bangladesh">
                                                    <option value="Belarus">
                                                    <option value="Belgium">
                                                    <option value="Benin">
                                                    <option value="Bhutan">
                                                    <option value="Bosnia and Herzegovina">
                                                    <option value="Botswana">
                                                    <option value="Brunei Darussalam">
                                                    <option value="Bulgaria">
                                                    <option value="Burkina Faso">
                                                    <option value="Burundi">
                                                    <option value="Cabo Verde">
                                                    <option value="Cambodia">
                                                    <option value="Cameroon">
                                                    <option value="Cayman Islands">
                                                    <option value="Central African Republic">
                                                    <option value="Chad">
                                                    <option value="China">
                                                    <option value="Cocos (Keeling) Islands">
                                                    <option value="Comoros">
                                                    <option value="DR Congo">
                                                    <option value="Congo">
                                                    <option value="Cook Islands">
                                                    <option value="Croatia">
                                                    <option value="Cyprus">
                                                    <option value="Czechia">
                                                    <option value="Côte d'Ivoire">
                                                    <option value="Denmark">
                                                    <option value="Djibouti">
                                                    <option value="Egypt">
                                                    <option value="Equatorial Guinea">
                                                    <option value="Eritrea">
                                                    <option value="Estonia">
                                                    <option value="Eswatini">
                                                    <option value="Ethiopia">
                                                    <option value="Faroe Islands">
                                                    <option value="Fiji">
                                                    <option value="Finland">
                                                    <option value="France">
                                                    <option value="French Guiana">
                                                    <option value="French Polynesia">
                                                    <option value="Gabon">
                                                    <option value="Gambia (the)">
                                                    <option value="Georgia">
                                                    <option value="Germany">
                                                    <option value="Ghana">
                                                    <option value="Gibraltar">
                                                    <option value="Greece">
                                                    <option value="Greenland">
                                                    <option value="Guadeloupe">
                                                    <option value="Guinea">
                                                    <option value="Guinea-Bissau">
                                                    <option value="Hong Kong">
                                                    <option value="Hungary">
                                                    <option value="Iceland">
                                                    <option value="India">
                                                    <option value="Indonesia">
                                                    <option value="Iran">
                                                    <option value="Iraq">
                                                    <option value="Ireland">
                                                    <option value="Isle of Man">
                                                    <option value="Israel">
                                                    <option value="Italy">
                                                    <option value="Japan">
                                                    <option value="Jordan">
                                                    <option value="Kazakhstan">
                                                    <option value="Kenya">
                                                    <option value="Kiribati">
                                                    <option value="Korea">
                                                    <option value="Kuwait">
                                                    <option value="Kyrgyzstan">
                                                    <option value="Latvia">
                                                    <option value="Lebanon">
                                                    <option value="Lesotho">
                                                    <option value="Liberia">
                                                    <option value="Libya">
                                                    <option value="Liechtenstein">
                                                    <option value="Lithuania">
                                                    <option value="Macao">
                                                    <option value="Malawi">
                                                    <option value="Malaysia">
                                                    <option value="Maldives">
                                                    <option value="Mali">
                                                    <option value="Malta">
                                                    <option value="Moldova">
                                                    <option value="Monaco">
                                                    <option value="Mongolia">
                                                    <option value="Montenegro">
                                                    <option value="Morocco">
                                                    <option value="Mozambique">
                                                    <option value="Myanmar">
                                                    <option value="Namibia">
                                                    <option value="Nauru">
                                                    <option value="Nepal">
                                                    <option value="Netherlands">
                                                    <option value="New Caledonia">
                                                    <option value="New Zealand">
                                                    <option value="Nicaragua">
                                                    <option value="Niger">
                                                    <option value="Nigeria">
                                                    <option value="North Macedonia">
                                                    <option value="Norway">
                                                    <option value="Oman">
                                                    <option value="Pakistan">
                                                    <option value="Palestine">
                                                    <option value="Papua New Guinea">
                                                    <option value="Philippines">
                                                    <option value="Poland">
                                                    <option value="Portugal">
                                                    <option value="Qatar">
                                                    <option value="Romania">
                                                    <option value="Russia">
                                                    <option value="Rwanda">
                                                    <option value="Samoa">
                                                    <option value="San Marino">
                                                    <option value="Saudi Arabia">
                                                    <option value="Senegal">
                                                    <option value="Serbia">
                                                    <option value="Seychelles">
                                                    <option value="Sierra Leone">
                                                    <option value="Singapore">
                                                    <option value="Slovakia">
                                                    <option value="Slovenia">
                                                    <option value="Somalia">
                                                    <option value="South Africa">
                                                    <option value="South Sudan">
                                                    <option value="Spain">
                                                    <option value="Sri Lanka">
                                                    <option value="Sudan">
                                                    <option value="Suriname">
                                                    <option value="Sweden">
                                                    <option value="Switzerland">
                                                    <option value="Syria">
                                                    <option value="Taiwan">
                                                    <option value="Tajikistan">
                                                    <option value="Tanzania">
                                                    <option value="Thailand">
                                                    <option value="Togo">
                                                    <option value="Tonga">
                                                    <option value="Tunisia">
                                                    <option value="Turkey">
                                                    <option value="Turkmenistan">
                                                    <option value="Tuvalu">
                                                    <option value="Uganda">
                                                    <option value="Ukraine">
                                                    <option value="United Arab Emirates">
                                                    <option value="United Kingdom">
                                                    <option value="Uzbekistan">
                                                    <option value="Viet Nam">
                                                    <option value="Western Sahara">
                                                    <option value="Yemen">
                                                    <option value="Zambia">
                                                    <option value="Zimbabwe">
                                                    <option value="Kosovo">
                                                </datalist>

                                                <small id="country-2-error" class="error-text"></small>


                                                <div id="user-button-container-2" class="user-button-container">
                                                    <button
                                                        style="background-color: #00904a; color: #fff; border: none; width: 50%; border-radius: 5px; padding: 3px;"
                                                        type="button"
                                                        onclick="handleSaveUserDetails2()"
                                                    >
                                                        Submit
                                                    </button>

                                                    <button
                                                        style="background-color: lightgrey; color: #000; border: none; width: 50%; border-radius: 5px; padding: 3px;"
                                                        type="button"
                                                        onclick="userDetailsModal2Hide()"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>`;

const userDetailsModal3 = document.createElement("div");
userDetailsModal3.className = "feedback-modal";
userDetailsModal3.innerHTML = `<div id="feedback-container" class="feedback-container">
                                            <p id="details-question">Please enter your contact information</p>
                                            <form id="user-details-form-3" class="user-details-container" noValidate>

                                                <input type="text" id="first-name-3" class="user-input-field"
                                                    placeholder="First name" required oninput="clearError('first-name-3-error')" />
                                                <small id="first-name-3-error" class="error-text"></small>

                                                <input type="text" id="last-name-3" class="user-input-field"
                                                    placeholder="Last name" required oninput="clearError('last-name-3-error')" />
                                                <small id="last-name-3-error" class="error-text"></small>

                                                <input type="email" id="email-3" class="user-input-field"
                                                    placeholder="Email address" required oninput="clearError('email-3-error')" />
                                                <small id="email-3-error" class="error-text"></small>

                                                <input type="number" id="phone-number-3" class="user-input-field"
                                                    placeholder="Phone number" pattern="[0-9]{10}" required oninput="clearError('phone-number-3-error')" />
                                                <small id="phone-number-3-error" class="error-text"></small>

                                                <input type="text" id="company-name-3" class="user-input-field"
                                                    placeholder="Company name" required oninput="clearError('company-name-3-error')" />
                                                <small id="company-name-3-error" class="error-text"></small>

                                                <input type="text" id="street-3" class="user-input-field"
                                                    placeholder="Street" required oninput="clearError('street-3-error')" />
                                                <small id="street-3-error" class="error-text"></small>

                                                <input type="text" id="postcode-3" class="user-input-field"
                                                    placeholder="Postcode" required oninput="clearError('postcode-3-error')" />
                                                <small id="postcode-3-error" class="error-text"></small>

                                                <input type="text" id="city-3" class="user-input-field"
                                                    placeholder="City" required oninput="clearError('city-3-error')" />
                                                <small id="city-3-error" class="error-text"></small>


                                                    
                                                <input list="countries-3" name="country" id="country-3" placeholder="Country" onchange="clearError('country-3-error')">

                                                <datalist id="countries-3">
                                                    <option value="Afghanistan">
                                                    <option value="Albania">
                                                    <option value="Algeria">
                                                    <option value="Andorra">
                                                    <option value="Angola">
                                                    <option value="Armenia">
                                                    <option value="Australia">
                                                    <option value="Austria">
                                                    <option value="Azerbaijan">
                                                    <option value="Bahrain">
                                                    <option value="Bangladesh">
                                                    <option value="Belarus">
                                                    <option value="Belgium">
                                                    <option value="Benin">
                                                    <option value="Bhutan">
                                                    <option value="Bosnia and Herzegovina">
                                                    <option value="Botswana">
                                                    <option value="Brunei Darussalam">
                                                    <option value="Bulgaria">
                                                    <option value="Burkina Faso">
                                                    <option value="Burundi">
                                                    <option value="Cabo Verde">
                                                    <option value="Cambodia">
                                                    <option value="Cameroon">
                                                    <option value="Cayman Islands">
                                                    <option value="Central African Republic">
                                                    <option value="Chad">
                                                    <option value="China">
                                                    <option value="Cocos (Keeling) Islands">
                                                    <option value="Comoros">
                                                    <option value="DR Congo">
                                                    <option value="Congo">
                                                    <option value="Cook Islands">
                                                    <option value="Croatia">
                                                    <option value="Cyprus">
                                                    <option value="Czechia">
                                                    <option value="Côte d'Ivoire">
                                                    <option value="Denmark">
                                                    <option value="Djibouti">
                                                    <option value="Egypt">
                                                    <option value="Equatorial Guinea">
                                                    <option value="Eritrea">
                                                    <option value="Estonia">
                                                    <option value="Eswatini">
                                                    <option value="Ethiopia">
                                                    <option value="Faroe Islands">
                                                    <option value="Fiji">
                                                    <option value="Finland">
                                                    <option value="France">
                                                    <option value="French Guiana">
                                                    <option value="French Polynesia">
                                                    <option value="Gabon">
                                                    <option value="Gambia (the)">
                                                    <option value="Georgia">
                                                    <option value="Germany">
                                                    <option value="Ghana">
                                                    <option value="Gibraltar">
                                                    <option value="Greece">
                                                    <option value="Greenland">
                                                    <option value="Guadeloupe">
                                                    <option value="Guinea">
                                                    <option value="Guinea-Bissau">
                                                    <option value="Hong Kong">
                                                    <option value="Hungary">
                                                    <option value="Iceland">
                                                    <option value="India">
                                                    <option value="Indonesia">
                                                    <option value="Iran">
                                                    <option value="Iraq">
                                                    <option value="Ireland">
                                                    <option value="Isle of Man">
                                                    <option value="Israel">
                                                    <option value="Italy">
                                                    <option value="Japan">
                                                    <option value="Jordan">
                                                    <option value="Kazakhstan">
                                                    <option value="Kenya">
                                                    <option value="Kiribati">
                                                    <option value="Korea">
                                                    <option value="Kuwait">
                                                    <option value="Kyrgyzstan">
                                                    <option value="Latvia">
                                                    <option value="Lebanon">
                                                    <option value="Lesotho">
                                                    <option value="Liberia">
                                                    <option value="Libya">
                                                    <option value="Liechtenstein">
                                                    <option value="Lithuania">
                                                    <option value="Macao">
                                                    <option value="Malawi">
                                                    <option value="Malaysia">
                                                    <option value="Maldives">
                                                    <option value="Mali">
                                                    <option value="Malta">
                                                    <option value="Moldova">
                                                    <option value="Monaco">
                                                    <option value="Mongolia">
                                                    <option value="Montenegro">
                                                    <option value="Morocco">
                                                    <option value="Mozambique">
                                                    <option value="Myanmar">
                                                    <option value="Namibia">
                                                    <option value="Nauru">
                                                    <option value="Nepal">
                                                    <option value="Netherlands">
                                                    <option value="New Caledonia">
                                                    <option value="New Zealand">
                                                    <option value="Nicaragua">
                                                    <option value="Niger">
                                                    <option value="Nigeria">
                                                    <option value="North Macedonia">
                                                    <option value="Norway">
                                                    <option value="Oman">
                                                    <option value="Pakistan">
                                                    <option value="Palestine">
                                                    <option value="Papua New Guinea">
                                                    <option value="Philippines">
                                                    <option value="Poland">
                                                    <option value="Portugal">
                                                    <option value="Qatar">
                                                    <option value="Romania">
                                                    <option value="Russia">
                                                    <option value="Rwanda">
                                                    <option value="Samoa">
                                                    <option value="San Marino">
                                                    <option value="Saudi Arabia">
                                                    <option value="Senegal">
                                                    <option value="Serbia">
                                                    <option value="Seychelles">
                                                    <option value="Sierra Leone">
                                                    <option value="Singapore">
                                                    <option value="Slovakia">
                                                    <option value="Slovenia">
                                                    <option value="Somalia">
                                                    <option value="South Africa">
                                                    <option value="South Sudan">
                                                    <option value="Spain">
                                                    <option value="Sri Lanka">
                                                    <option value="Sudan">
                                                    <option value="Suriname">
                                                    <option value="Sweden">
                                                    <option value="Switzerland">
                                                    <option value="Syria">
                                                    <option value="Taiwan">
                                                    <option value="Tajikistan">
                                                    <option value="Tanzania">
                                                    <option value="Thailand">
                                                    <option value="Togo">
                                                    <option value="Tonga">
                                                    <option value="Tunisia">
                                                    <option value="Turkey">
                                                    <option value="Turkmenistan">
                                                    <option value="Tuvalu">
                                                    <option value="Uganda">
                                                    <option value="Ukraine">
                                                    <option value="United Arab Emirates">
                                                    <option value="United Kingdom">
                                                    <option value="Uzbekistan">
                                                    <option value="Viet Nam">
                                                    <option value="Western Sahara">
                                                    <option value="Yemen">
                                                    <option value="Zambia">
                                                    <option value="Zimbabwe">
                                                    <option value="Kosovo">
                                                </datalist>

                                                <small id="country-3-error" class="error-text"></small>

                                                <input type="text" id="product-3" class="user-input-field"
                                                    placeholder="Product" required oninput="clearError('product-3-error')" />
                                                <small id="product-3-error" class="error-text"></small>

                                                <input type="text" id="serial-number-3" class="user-input-field"
                                                    placeholder="Serial number" required oninput="clearError('serial-number-3-error')" />
                                                <small id="serial-number-3-error" class="error-text"></small>

                                                <div id="user-button-container-3" class="user-button-container">
                                                    <button
                                                        style="background-color: #00904a; color: #fff; border: none;
                                                        width: 50%; border-radius: 5px; padding: 3px;"
                                                        type="button"
                                                        onclick="handleSaveUserDetails3()"
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        style="background-color: lightgrey; color: #000; border: none;
                                                        width: 50%; border-radius: 5px; padding: 3px;"
                                                        type="button"
                                                        onclick="userDetailsModal3Hide()"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>

                                            </form>
                                        </div>`;

const MRChatbot = document.createElement("div");
MRChatbot.className = "MR-chatbot";

const MRheader = document.createElement("header");
MRheader.className = "MR-header";
const MRh2 = document.createElement("h2");
MRh2.className = "MR-h2";
MRh2.innerText = "Unger Agent";
const minimizedScreenCloseIcon = document.createElement("p");
minimizedScreenCloseIcon.className =
  "MR material-symbols-outlined close-icon chatbot-close-icon";
minimizedScreenCloseIcon.innerText = "close";
MRheader.append(MRh2, minimizedScreenCloseIcon);

const MRChatContainer = document.createElement("div");
MRChatContainer.setAttribute("class", "MR-chat-container");
MRChatContainer.setAttribute("id", "MR-chat-container");

const MRChatboxUl = document.createElement("ul");
MRChatboxUl.setAttribute("class", "MR-chatbox");
MRChatboxUl.setAttribute("id", "MR-chatbox");
const MRBotStarterMessage = document.createElement("div");
MRBotStarterMessage.setAttribute("class", "MR-botText");
MRBotStarterMessage.setAttribute("id", "MR-botStarterMessage");
const MRIncomingMsg = document.createElement("div");
MRIncomingMsg.className = "d-flex incoming-msg";
const MRBottomChat = document.createElement("div");
MRBottomChat.setAttribute("id", "MR-bottom-chat");
MRBotStarterMessage.append(MRIncomingMsg);
MRChatboxUl.append(MRBotStarterMessage, MRBottomChat);
MRChatContainer.append(MRChatboxUl);

const MRChatInput = document.createElement("div");
MRChatInput.className = "MR-chat-input";

const MRUserInputText = document.createElement("textarea");
MRUserInputText.setAttribute("autofocus", "");
MRUserInputText.setAttribute("class", "MR-userInputText");
MRUserInputText.setAttribute("id", "MR-userInputText");
MRUserInputText.setAttribute("placeholder", "Start typing to chat...");
MRUserInputText.setAttribute("required", "");
const MRSendbtnSpan = document.createElement("span");
MRSendbtnSpan.className = "material-symbols-outlined";
MRSendbtnSpan.setAttribute("id", "MR-send-btn");
MRSendbtnSpan.setAttribute("onclick", "handleSendClick()");
MRSendbtnSpan.innerText = "send";
MRChatInput.append(MRUserInputText, MRSendbtnSpan);

MRChatbot.append(
  loadingContainer,
  feedbackModal,
  MRheader,
  MRChatContainer,
  MRChatInput,
  userDetailsModal,
  userDetailsModal2,
  userDetailsModal3
);

const MRChatbotToggler = document.createElement("div");
MRChatbotToggler.className = "MR-chatbot-toggler";
const MRMessageIcon = document.createElement("p");
MRMessageIcon.className = "material-symbols-outlined message-icon";
MRMessageIcon.innerText = "mode_comment";
const MRCloseIcon = document.createElement("p");
MRCloseIcon.className = "material-symbols-outlined close-icon";
MRCloseIcon.innerText = "close";
MRChatbotToggler.append(MRMessageIcon, MRCloseIcon);

MRChatbotSection.append(MRChatbot, MRChatbotToggler);
document.body.append(MRChatbotSection);

let timerRef = null;
let randomNumber = null;

const randomNumberGenerate = () => {
  return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
};

const triangleLeft = document.createElement("div");
triangleLeft.className = "triangle-left";
const incomingMsgBox1 = document.createElement("div");
incomingMsgBox1.className = "d-flex placeholder-msg";
const essenceImg = document.createElement("img");
essenceImg.className = "essence-img";
essenceImg.setAttribute(
  "src",
  "https://cdn.modelrocket.ai/cdn/unger_digital_assistant.png"
);
const incomingMsgText = document.createElement("p");
incomingMsgText.className = "placeholder-msg-text";
//incomingMsgText.innerHTML = `<img src="./loading.gif" width="40" />`;
incomingMsgText.innerHTML = `Loading...`;
const incomingMsgTime = document.createElement("i");
incomingMsgTime.className = "placeholder-msg-time";
incomingMsgTime.innerText = formatAMPM(new Date());
incomingMsgText.append(incomingMsgTime);
const bottomChat1 = document.createElement("div");
incomingMsgBox1.append(essenceImg, triangleLeft, incomingMsgText, bottomChat1);

MRChatboxUl.append(incomingMsgBox1);

const handleToggler = async (value) => {
  if (value === "openWidget") {
    MRChatboxUl.innerHTML = "";
    MRUserInputText.value = "";
    const feedbackInputField = document.getElementById("feedback-input-field");
    feedbackInputField.classList.remove("show");
    feedbackInput = document.getElementById("feedback-input-field");
    feedbackInput.value = "";
    feedbackModal.classList.remove("show");
    // userDetailsModal2.classList.add("show")
    const feedbackButtonContainer = document.getElementById(
      "feedback-button-container"
    );
    feedbackButtonContainer.classList.remove("hide");

    const feedbackSubmitButtonContainer = document.getElementById(
      "feedback-submit-button-container"
    );
    feedbackSubmitButtonContainer.classList.remove("show");

    incomingMsgBox1.className = "d-flex placeholder-msg";
    MRChatboxUl.append(incomingMsgBox1);
    MRChatbotSection.classList.add("MR-show-chatbot");
    (async () => {
      await welcomeMessage();
    })();
    randomNumber = randomNumberGenerate();
  } else {
    feedbackModal.classList.add("show");
    MRChatbotToggler.style.pointerEvents = "none";
    MRChatbotToggler.style.opacity = "0.3";
  }
};

const userDetailsModalHide = () => {
  userDetailsModal.classList.remove("show");

  const form = document.getElementById("user-details-form");
  if (form) {
    form.reset();
  }

  document.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = "";
  });
};

const userDetailsModal2Hide = () => {
  userDetailsModal2.classList.remove("show");

  const form = document.getElementById("user-details-form-2");
  if (form) {
    form.reset();
  }

  document.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = "";
  });
};

const userDetailsModal3Hide = () => {
  userDetailsModal3.classList.remove("show");

  const form = document.getElementById("user-details-form-3");
  if (form) {
    form.reset();
  }

  document.querySelectorAll(".error-text").forEach((el) => {
    el.textContent = "";
  });
};

const hideWidget = () => {
  feedbackInput = document.getElementById("feedback-input-field");
  feedbackValue = feedbackInput.value;

  // const feedbackQuestion = document.getElementById("feedback-question")
  // feedbackQuestion.innerText = "Please rate your experience with us";
  // MRChatboxUl.innerHTML = "";
  // MRUserInputText.value = ""

  resetIdleTracking("close");

  // MRChatbotSection.classList.remove("MR-show-chatbot");

  //    setTimeout(() => {
  //         MRChatbotToggler.style.pointerEvents = "all"
  //         MRChatbotToggler.style.opacity = "1"
  //    },5000)

  // 🧹 Clean up form before closing
  resetUserDetailsForm();
  resetUserDetailsForm2();
  resetUserDetailsForm3();

  // Hide widget or modal
  const widget = document.getElementById("user-details-container");
  if (widget) widget.style.display = "none";
};

MRChatbotToggler.addEventListener("click", () => {
  if (MRChatbotSection.className.includes("MR-show-chatbot")) {
    handleToggler("closeWidget");
  } else {
    handleToggler("openWidget");
  }
});
minimizedScreenCloseIcon.addEventListener("click", function () {
  MRChatbotSection.classList.remove("MR-show-chatbot");
});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

let apiToken;

const generateToken = async () => {
  const url = "https://consumerapi.modelrocket.ai/gettoken";
  // const url = "http://10.10.1.18:5000/gettoken";
  // const url = "http://192.168.1.104:5000/gettoken";
  const username = "97c4dc06-b3fe-4538-a36a-ef9b3897eeda"; // Replace with your username
  const password = "CerriH1EXVuJ3esafw9JM4cqpxjUu2ZArm3HBTkbSb4";
  const base64Credentials = btoa(`${username}:${password}`);

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      domain: "onboardconfig.modelrocket.ai",
      // domain: "onboardconfig.modelrocket.ai"
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error_code === 200) {
        apiToken = data.data.token;
        (async () => {
          await getData("init", "");
        })();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const welcomeMessage = async () => {
  (async () => {
    await generateToken();
  })();
};

// --- Run this ONCE when the page loads ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".chatbot-btn");
  if (!btn) return;

  const action = btn.dataset.action;

  switch (action) {
    case "open-user-modal":
      userDetailsModal.classList.add("show");
      break;

    case "open-distributor-modal":
      userDetailsModal2.classList.add("show");
      break;

    case "open-product-modal":
      userDetailsModal3.classList.add("show");
      break;

    default:
      return;
  }
});

const getData = async (flag, userInputTextValue) => {
  let interval;
  const feedbackInputField = document.getElementById("MR-userInputText");
  const MRUserInputText = document.createElement("textarea");
  const incomingMsgBox2 = document.createElement("div");

  if (userInputTextValue) {
    const triangleLeft = document.createElement("div");
    triangleLeft.className = "triangle-left";

    incomingMsgBox2.className = "d-flex placeholder-msg";

    const essenceImg2 = document.createElement("img");
    essenceImg2.className = "essence-img";
    essenceImg2.setAttribute(
      "src",
      "https://cdn.modelrocket.ai/cdn/unger_digital_assistant.png"
    );

    const incomingMsgText2 = document.createElement("p");
    incomingMsgText2.className = "placeholder-msg-text";
    incomingMsgText2.innerHTML = `Analysing the query...`;

    const incomingMsgTime2 = document.createElement("i");
    incomingMsgTime2.className = "placeholder-msg-time";
    incomingMsgTime2.innerText = formatAMPM(new Date());
    incomingMsgText2.append(incomingMsgTime2);

    const bottomChat2 = document.createElement("div");
    incomingMsgBox2.append(
      essenceImg2,
      triangleLeft,
      incomingMsgText2,
      bottomChat2
    );

    MRChatboxUl.append(incomingMsgBox2);

    // --- ADD INTERVAL ---
    const texts = [
      "Sorting through relevant information...",
      "Framing response...",
    ];
    let index = 0;

    feedbackInputField.setAttribute("disabled", "");

    interval = setInterval(() => {
      incomingMsgText2.innerHTML =
        texts[index] +
        "<i class='placeholder-msg-time'>" +
        formatAMPM(new Date()) +
        "</i>";

      if (index < texts.length - 1) {
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  }

  let requiredParams;
  let apiData = "";
  let dataObject;

  if (flag === "close") {
    loadingContainer.classList.add("show");
    requiredParams = {
      // client_name: "GenAI WebAgent - Enterpri",
      client_name: "Unger - UK",
      service_name: "Unger - UK",
      language: "english",
      msg: userInputTextValue,
      flag: flag,
      session_id: randomNumber,
      feedback: feedbackValue === "" ? "" : feedbackValue,
      rating: starRating,
    };
  } else {
    requiredParams = {
      // client_name: "GenAI WebAgent - Enterpri",
      client_name: "Unger - UK",
      service_name: "Unger - UK",
      language: "english",
      msg: userInputTextValue,
      flag: flag,
      session_id: randomNumber,
    };
  }

  const url = "https://consumerapi.modelrocket.ai/chatbot_widget";
  // const url = "http://10.10.1.18:5000/chatbot_widget";
  // const url = "http://192.168.1.104:5000/chatbot_widget";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        domain: "onboardconfig.modelrocket.ai",
      },
      body: JSON.stringify(requiredParams),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dataObject = data.data;

    incomingMsgBox1.className = "d-none";
    if (incomingMsgBox2) {
      incomingMsgBox2.className = "d-none";
    }

    if (data.error_code === 201) {
      apiData = data.data.message;
      clearTimeout(timerRef);
      randomNumber = randomNumberGenerate();
      setTimeout(() => closeChat(), 1500);
    } else {
      if (
        data.error_code === 200 &&
        data.data.message === "Your chat has been closed."
      ) {
        closeChat();
        return;
      } else {
        apiData = data.data.message;
        resetIdleTracking("continous");
      }
    }
  } catch (error) {
    clearInterval(interval);
    if (incomingMsgBox2) incomingMsgBox2.remove();

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      apiData = "Network Error. Please check your internet connection.";
    } else {
      apiData = "Something went wrong.";
    }

    const errorMsgBox = document.createElement("div");
    errorMsgBox.className = "d-flex incoming-msg";
    const errorImg = document.createElement("img");
    errorImg.className = "essence-img";
    errorImg.setAttribute(
      "src",
      "https://cdn.modelrocket.ai/cdn/unger_digital_assistant.png"
    );

    const errorText = document.createElement("p");
    errorText.className = "incoming-msg-text";
    errorText.innerHTML = `${apiData}<i class='incoming-msg-time'>${formatAMPM(
      new Date()
    )}</i>`;

    const bottomChatErr = document.createElement("div");
    errorMsgBox.append(errorImg, errorText, bottomChatErr);
    MRChatboxUl.append(errorMsgBox);

    feedbackInputField.removeAttribute("disabled");
    document.getElementById("MR-userInputText").focus();

    bottomChatErr.scrollIntoView({ behavior: "smooth" });
  } finally {
    // feedbackInputField.removeAttribute("disabled");
    // document.getElementById("MR-userInputText").focus();
  }

  if (dataObject) {
    if (Object.keys(dataObject).length === 0) {
      // no data
    } else if (Object.keys(dataObject)?.length) {
      const incomingMsgBox = document.createElement("div");
      incomingMsgBox.className = "d-flex incoming-msg";

      const essenceImg = document.createElement("img");
      essenceImg.className = "essence-img";
      essenceImg.setAttribute(
        "src",
        "https://cdn.modelrocket.ai/cdn/unger_digital_assistant.png"
      );

      const triangleLeft = document.createElement("div");
      triangleLeft.className = "triangle-left";

      const incomingMsgText = document.createElement("div");
      incomingMsgText.className = "incoming-msg-text";

      let plainText = (apiData || "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<\/?p[^>]*>/gi, "")
        .replace(/<(?!\/?(a|u|ul|ol|li|br|button)\b)[^>]+>/gi, "")
        .replace(/<button([^>]*)>/gi, (_, attrs) => {
          const classMatch = attrs.match(/class=["']?(\d+)["']?/);
          const classNum = classMatch ? classMatch[1] : "";

          const actionMap = {
            1: "open-user-modal",
            2: "open-distributor-modal",
            3: "open-product-modal",
          };

          const action = actionMap[classNum] || "default-action";

          return `
                                    <br>
                                    <div style="text-align:center;">
                                    <button class="chatbot-btn"
                                            data-action="${action}"
                                            style="background-color:#fff;color:#00904a;border:none;border-radius:5px;padding:6px 12px;cursor:pointer;">
                                `;
        })
        .replace(/<\/button>/gi, "</button></div><br>")
        .replace(/<li[^>]*>/gi, "• ")
        .replace(/<\/li>/gi, "<br>")
        .replace(/<\/?ul[^>]*>/gi, "<br>")
        .replace(/<\/?ol[^>]*>/gi, "<br>")
        .replace(/<hr\s*\/?>/gi, "<br>----------------<br>")
        .replace(/\s*\n\s*/g, " ")
        .trim();

      incomingMsgText.innerHTML = plainText;
      const incomingMsgTime = document.createElement("div");
      incomingMsgTime.className = "incoming-msg-time";
      incomingMsgTime.innerText = formatAMPM(new Date());
      incomingMsgText.append(incomingMsgTime);

      const bottomChat1 = document.createElement("div");
      incomingMsgBox.append(
        essenceImg,
        triangleLeft,
        incomingMsgText,
        bottomChat1
      );

      if (apiData !== undefined) {
        MRChatboxUl.append(incomingMsgBox);
      }

      feedbackInputField.removeAttribute("disabled");
      document.getElementById("MR-userInputText").focus();

      bottomChat1.scrollIntoView({ behavior: "smooth" });
    } else {
      const incomingMsgBox = document.createElement("div");
      incomingMsgBox.className = "d-flex incoming-msg";

      const essenceImg = document.createElement("img");
      essenceImg.className = "essence-img";
      essenceImg.setAttribute(
        "src",
        "https://cdn.modelrocket.ai/cdn/unger_digital_assistant.png"
      );

      const incomingMsgText = document.createElement("p");
      incomingMsgText.className = "incoming-msg-text";
      incomingMsgText.innerHTML = `Something went wrong. Please try again later!`;

      const incomingMsgTime = document.createElement("i");
      incomingMsgTime.className = "incoming-msg-time";
      incomingMsgTime.innerText = formatAMPM(new Date());
      incomingMsgText.append(incomingMsgTime);

      const bottomChat1 = document.createElement("div");
      incomingMsgBox.append(essenceImg, incomingMsgText, bottomChat1);
      MRChatboxUl.append(incomingMsgBox);
      bottomChat1.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const generateResponse = async (flag, value) => {
  (async () => {
    await getData(flag, value);
  })();
};

function handleSendClick() {
  const triangleRight = document.createElement("div");
  triangleRight.className = "triangle-right";
  const outgoingMsgBox = document.createElement("div");
  outgoingMsgBox.className = "d-flex outgoing-msg";
  const outgoingMsgText = document.createElement("p");
  outgoingMsgText.className = "outgoing-msg-text";
  outgoingMsgText.innerText = MRUserInputText.value;
  const outgoingMsgTime = document.createElement("i");
  outgoingMsgTime.className = "outgoing-msg-time";
  outgoingMsgTime.innerText = formatAMPM(new Date());
  outgoingMsgText.append(outgoingMsgTime);
  const personImg = document.createElement("div");
  personImg.className = "person-img";
  personImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 160 160" fill="none">
                                        <path d="M159.828 79.552C159.828 100.995 151.34 120.459 137.544 134.76C123.077 149.757 102.777 159.085 80.2949 159.085C57.8119 159.085 37.5039 149.757 23.0449 134.756C9.24086 120.455 0.756836 100.991 0.756836 79.552C0.756836 35.626 36.3689 0.019043 80.2939 0.019043C124.22 0.019043 159.828 35.626 159.828 79.552Z" fill="#E3E3E3"/>
                                        <path d="M64.5518 35.8212C64.5518 32.2092 67.4798 29.2822 71.0908 29.2822H87.8508C98.3058 29.2822 106.781 37.7572 106.781 48.2122V68.5362H66.9198L64.5518 35.8212Z" fill="#383838"/>
                                        <path d="M58.3042 70.8831H52.7012V43.6121C52.7012 37.5091 58.9502 33.4011 64.5522 35.8211C65.8202 42.5991 58.3042 70.8831 58.3042 70.8831Z" fill="#383838"/>
                                        <path d="M92.4292 92.5002C90.6692 100.23 85.9042 105.774 80.2982 105.774C74.6882 105.774 69.9142 100.217 68.1582 92.4792L69.5122 87.2292L69.9182 85.6602H90.6662L92.2102 91.6591L92.3512 92.1972L92.4292 92.5002Z" fill="#DADADA"/>
                                        <path d="M106.399 63.0841C116.73 51.4921 109.837 79.8301 104.122 76.5181C94.0761 70.6961 106.399 63.0841 106.399 63.0841Z" fill="#F4F4F4"/>
                                        <path d="M137.54 134.759C132.17 140.319 126 145.099 119.22 148.919C108.76 154.809 96.84 158.389 84.13 158.989C82.86 159.059 81.58 159.089 80.29 159.089C73.88 159.089 67.65 158.329 61.68 156.899C53.36 154.909 45.56 151.609 38.49 147.229C32.82 143.719 27.64 139.529 23.04 134.759L24.41 129.359C26.48 121.249 32.87 114.949 41.02 112.999L41.92 112.789L51.91 110.399L54.64 109.749C55.79 109.469 56.89 109.079 57.93 108.579C58.8 108.159 59.63 107.669 60.41 107.109C61.25 106.509 62.04 105.829 62.75 105.079C64.66 103.069 66.07 100.589 66.79 97.7992L67.85 93.6792L68.13 92.5692L68.15 92.4792L69.51 87.2292L69.91 85.6592H90.66L92.21 91.6592L92.35 92.1992L92.43 92.4992L92.44 92.5692L92.73 93.6892L93.79 97.7992C94.78 101.619 97.07 104.889 100.18 107.109C101.88 108.339 103.83 109.249 105.94 109.749L108.46 110.349L119.56 112.999C127.71 114.949 134.1 121.249 136.17 129.359L137.54 134.759Z" fill="#F4F4F4"/>
                                        <path d="M92.4292 92.5002C90.6692 100.23 85.9042 105.774 80.2982 105.774C74.6882 105.774 69.9142 100.217 68.1582 92.4792L69.5122 87.2292L69.9182 85.6602H90.6662L92.2102 91.6591L92.3512 92.1972L92.4292 92.5002Z" fill="#DADADA"/>
                                        <path d="M54.1946 63.0841C43.8636 51.4921 50.7566 79.8301 56.4716 76.5181C66.5176 70.6961 54.1946 63.0841 54.1946 63.0841Z" fill="#F4F4F4"/>
                                        <path d="M104.333 54.7331C104.333 55.6131 104.283 56.4731 104.183 57.3331C104.103 58.1131 103.753 61.4431 103.133 65.6831L103.123 65.6931C102.783 68.0431 102.343 70.6731 101.823 73.3131C101.813 73.3431 101.813 73.3831 101.803 73.4131C100.533 79.8431 98.7427 86.2431 96.4027 88.5731C93.7627 91.2131 91.6427 93.6131 89.2227 95.3431C86.8027 97.0831 84.0927 98.1631 80.2927 98.1631C76.4927 98.1631 73.7827 97.0831 71.3627 95.3431C68.9527 93.6131 66.8227 91.2131 64.1827 88.5731C61.8427 86.2331 60.0527 79.8231 58.7727 73.4031V73.3931C58.7627 73.3831 58.7627 73.3731 58.7627 73.3631C58.6027 72.5331 58.4527 71.7031 58.3027 70.8831C58.2427 70.5431 58.1827 70.2031 58.1227 69.8631C57.8727 68.4231 57.6527 67.0131 57.4527 65.6931C56.7327 60.8231 56.3827 57.1531 56.3827 57.1531C56.3027 56.3631 56.2627 55.5531 56.2627 54.7331C56.2627 54.5231 56.2627 54.3131 56.2727 54.1031C56.3227 52.2131 56.5827 50.3731 57.0527 48.6131C57.0727 48.5331 57.0927 48.4531 57.1127 48.3731C59.7827 38.6131 68.4527 31.3231 78.9127 30.7431C79.3727 30.7131 79.8227 30.7031 80.2927 30.7031C86.9327 30.7031 92.9427 33.3931 97.2927 37.7431C101.053 41.4931 103.573 46.4931 104.183 52.0631C104.283 52.9431 104.333 53.8331 104.333 54.7331Z" fill="#F4F4F4"/>
                                        <path d="M84.0724 76.3423C84.0724 78.0013 82.3824 79.3453 80.2924 79.3453C78.2125 79.3453 76.5225 78.0013 76.5225 76.3423C76.5225 76.1433 76.5424 75.9453 76.6024 75.7593C76.9324 77.1373 78.4624 78.1793 80.2924 78.1793C82.1324 78.1793 83.6625 77.1373 83.9925 75.7593C84.0525 75.9453 84.0724 76.1433 84.0724 76.3423Z" fill="#EDF6FF"/>
                                        <path d="M105.057 54.9293C105.057 55.8353 105.006 56.7213 104.903 57.6073C104.821 58.4103 103.134 65.6823 103.134 65.6823C68.584 57.2863 65.821 42.5983 65.821 42.5983C65.934 56.6383 57.454 65.6923 57.454 65.6923C56.712 60.6753 55.664 57.4223 55.664 57.4223C55.582 56.6083 55.54 55.7743 55.54 54.9293C55.54 54.7133 55.54 54.4963 55.55 54.2803C55.601 52.3333 55.869 50.4383 56.353 48.6253C56.374 48.5433 56.394 48.4603 56.415 48.3783C59.165 38.3243 68.097 30.8153 78.872 30.2173C79.346 30.1863 79.809 30.1763 80.294 30.1763C87.134 30.1763 93.325 32.9473 97.806 37.4283C101.679 41.2913 104.275 46.4413 104.904 52.1793C105.006 53.0853 105.057 54.0023 105.057 54.9293Z" fill="#383838"/>
                                        <path d="M137.543 134.813C123.073 149.803 102.773 159.133 80.293 159.133C57.813 159.133 37.503 149.803 23.043 134.803L24.413 129.413C26.483 121.293 32.873 114.993 41.023 113.043L51.933 110.443L54.643 109.793C55.863 109.503 57.043 109.073 58.143 108.523C63.683 114.423 71.553 118.113 80.293 118.113C89.033 118.113 96.903 114.423 102.443 108.523C103.543 109.063 104.713 109.503 105.943 109.793L108.313 110.363L119.563 113.043C127.713 114.993 134.103 121.293 136.163 129.413L137.543 134.813Z" fill="#00904A"/>
                                        <path d="M108.314 110.363C105.874 113.323 96.9036 122.693 80.2936 123.353C61.1536 124.123 52.4536 111.223 51.9336 110.443L54.6436 109.793C55.8636 109.503 57.0436 109.073 58.1436 108.523C63.6836 114.423 71.5536 118.113 80.2936 118.113C89.0336 118.113 96.9036 114.423 102.444 108.523C103.544 109.063 104.714 109.503 105.944 109.793L108.314 110.363Z" fill="#383838"/>
                                        </svg>`;
  // const personImg = document.createElement("img");
  // personImg.id = "person-img";
  // personImg.className = "person-img";
  // personImg.setAttribute(
  //     "src",
  //     "https://cdn.adraproductstudio.com/person1.png"
  // );
  outgoingMsgBox.append(outgoingMsgText, triangleRight, personImg);

  const bottomChat1 = document.createElement("div");
  MRChatboxUl.append(outgoingMsgBox, bottomChat1);

  bottomChat1.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    generateResponse("step", MRUserInputText.value);
    MRUserInputText.value = "";
    bottomChat1.scrollIntoView({ behavior: "smooth" });
  }, 0);
}

MRUserInputText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (MRUserInputText.value.trim() === "") {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      handleSendClick();
    }
  }
});

const resetIdleTracking = (value) => {
  if (timerRef) {
    clearTimeout(timerRef);
  }
  if (value === "close") {
    startIdleTracking("close"); // Restart idle tracking
  } else {
    startIdleTracking("continous");
  }
};

const startIdleTracking = async (value) => {
  if (value === "close") {
    await getData("close", "");
  } else {
    timerRef = setTimeout(async () => {
      const response = await generateResponse("step", "");
      if (response) {
        resetIdleTracking("continous");
      }
    }, 15000);
  }
};

const closeChat = () => {
  loadingContainer.classList.remove("show");
  MRChatbotSection.classList.remove("MR-show-chatbot");
  const feedbackQuestion = document.getElementById("feedback-question");
  feedbackQuestion.innerText = "Please rate your experience with us";
  MRUserInputText.value = "";
  feedbackModal.classList.remove("show");
  MRChatboxUl.innerHTML = "";
  clearStarValue();
  MRChatbotToggler.style.pointerEvents = "all";
  MRChatbotToggler.style.opacity = "1";
  return;
};

import React from "react";

function FAQScreen() {
  return (
    <div style={{ padding: "50px 150px 0 150px" }}>
      <h2 style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
      <h5 className="my-4">
        <b>Table of Contents</b>
      </h5>
      <ul className="my-4">
        <li>How does SmallTalk evaluate your level?</li>
        <li>How is IELTS scored?</li>
        <li>What’s the confidence metric?</li>
        <li>How does the AI detect mistakes?</li>
        <li>Which are the standard language and accent used by SmallTalk?</li>
        <li>Does the tool recognize Indian and Filipino Accents?</li>
        <li>What language do you use as a reference?</li>
      </ul>
    </div>
  );
}

export default FAQScreen;

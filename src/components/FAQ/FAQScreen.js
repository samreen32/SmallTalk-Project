import React from "react";
import "../../App.css";

function FAQScreen() {
  return (
    <div style={{ padding: "7% 10%" }}>
      <h2 style={{ textAlign: "center" }}>
        <b>Frequently Asked Questions</b>
      </h2>
      <br />
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
      <br />
      <div>
        <h5 className="my-4">
          <b>Questions</b>
        </h5>
        <div class="card">
          <div class="card-body">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <b>How does SmallTalk evaluate your level?</b>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    SmallTalk assesses your level based on the Common European
                    Framework of Reference for Languages (CEFR), an
                    international standard for describing language ability. The
                    CEFR has six levels – from A1 for the most basic beginner to
                    C2 for the very highest level of ability. SmallTalk
                    recognizes and analyzes speech without human assistance and
                    with 95% accuracy with a possible error margin of 0.5 CEFR
                    level. We involve certified teachers and professional
                    examiners to develop our Deep Learning algorithms. We use AI
                    models trained on thousands of hours of speech samples
                    including multiple accents. We are constantly improving our
                    technology focusing on people with different accents and
                    English levels. SmallTalk AI analyzes speech using the
                    following indicators: fluency and coherence, vocabulary,
                    grammatical range and accuracy, and pronunciation.We assess
                    the English level and find mistakes during a Zoom call
                    better than average English teachers. The experiment we held
                    demonstrated that our algorithms outperformed in both cases
                    by 20%. Moreover, we provide a more complete speaking
                    assessment and give useful recommendations on how to improve
                    it.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <b>How is IELTS scored?</b>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    IELTS results are reported on a 9-band scale from 1 (the
                    lowest) to 9 (the highest). Check out the official
                    descriptions of the bands here.SmallTalk recognizes and
                    analyzes speech without human assistance and with 95%
                    accuracy with a possible error margin in one band. We
                    involve certified teachers and professional examiners to
                    develop our Deep Learning algorithms. We use AI models
                    trained on thousands of hours of speech samples including
                    multiple accents. We are constantly improving our technology
                    focusing on people with different accents and English
                    levels. SmallTalk AI analyzes speech using the following
                    indicators: fluency and coherence, vocabulary, grammatical
                    range and accuracy. We’re always comparing our predictions
                    with the official exam certificates obtained by our users
                    after they practice with SmallTalk. As per our research, 94%
                    of our users are satisfied with the results.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <b>What’s the confidence metric?</b>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Confidence is a metric showing how much your speech will be
                    understandable for a native speaker and how confident you
                    are when you talk.SmallTalk recognizes and analyzes speech
                    without human assistance. We involve certified teachers and
                    professional examiners to develop our Deep Learning
                    algorithms. We use AI models trained on thousands of hours
                    of speech samples including multiple accents. We are
                    constantly improving our technology focusing on people with
                    different accents and English levels. SmallTalk AI analyzes
                    speech using the following indicators: fluency and
                    coherence, lexical resource, grammatical range and accuracy.
                    We’re constantly comparing our predictions with the official
                    exam certificates obtained by our users after they practiced
                    with SmallTalk.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <b>How does the AI detect mistakes?</b>
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Our tool recognizes and analyzes speech through cutting-edge
                    deep learning algorithms with no human intervention and with
                    flawless accuracy.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <b>
                      Which are the standard language and accent used by
                      SmallTalk?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    We use American English as reference.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    <b>Does the tool recognize Indian and Filipino Accents?</b>
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Yes. The tool can recognize popular accents, such as Indian,
                    Filipino, East European, and so on.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    <b>What language do you use as a reference?</b>
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">American English.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default FAQScreen;

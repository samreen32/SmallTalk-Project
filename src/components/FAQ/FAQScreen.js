import React from "react";
import Navbar from "../Home/HomeSections/Section1/Navbar";
import "../../App.css";
import { UserLogin } from "../../context/AuthContext";

function FAQScreen() {
  const { stickyNav, setstickyNav, toTop, settoTop, active, setActive } =
    UserLogin();
  return (
    <>
      <Navbar
        stickyNav={stickyNav}
        setstickyNav={setstickyNav}
        toTop={toTop}
        settoTop={settoTop}
        active={active}
        setActive={setActive}
      />
      <div style={{ padding: "7% 10%" }}>
        <h2 style={{ textAlign: "center" }}>
          <b>Frequently Asked Questions</b>
        </h2>
        <br />
        <h5 className="my-4">
          <b>Table of Contents</b>
        </h5>
        <ul className="my-4">
          <li>
            What is the purpose of user testing with the Predictive Index and
            interviews in different languages?
          </li>
          <li>
            How does the Predictive Index assessment contribute to the selection
            process?
          </li>
          <li>
            What languages are the assessments and interviews available in?
          </li>
          <li>
            Are candidates required to take the assessment in all three
            languages?
          </li>
          <li>
            How do you ensure the fairness of the assessment across different
            languages?
          </li>
          <li>
            Can candidates switch languages after starting the assessment or
            interview process?
          </li>
          <li>
            How long does the entire assessment and interview process usually
            take?
          </li>
          <li>
            How are the assessment results and interview feedback used in the
            hiring decision?
          </li>
          <li>Is there a way to prepare for the assessment and interview?</li>
        </ul>
        <br />
        <div>
          <h5 className="my-4">
            <b>Questions</b>
          </h5>
          <div class="card">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <b>
                      What is the purpose of user testing with the Predictive
                      Index and interviews in different languages?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The purpose of this process is to assess candidates'
                    suitability for specific roles within our company by
                    evaluating their cognitive abilities, behavioral traits, and
                    language proficiency. This helps us make informed hiring
                    decisions that align with the requirements of the positions.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    style={{ backgroundColor: "lightgray", color: "black" }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <b>
                      How does the Predictive Index assessment contribute to the
                      selection process?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The Predictive Index assessment provides insights into
                    candidates' natural behavioral tendencies and cognitive
                    capabilities. It assists in matching candidates to roles
                    where their strengths and work styles are likely to excel,
                    enhancing the chances of a successful fit.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <b>
                      What languages are the assessments and interviews
                      available in?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The assessments and interviews are available in English,
                    Spanish, and Dutch. Candidates can choose the language they
                    are most comfortable with for the assessment and interview
                    process.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <b>
                      Are candidates required to take the assessment in all
                      three languages?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    No, candidates are only required to take the assessment and
                    participate in the interview in one language of their
                    choice: English, Spanish, or Dutch.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    <b>
                      How do you ensure the fairness of the assessment across
                      different languages?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The assessment content has been carefully translated and
                    adapted to ensure linguistic and cultural fairness across
                    the three languages. The underlying constructs being
                    measured remain consistent to ensure unbiased evaluation.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    <b>
                      Can candidates switch languages after starting the
                      assessment or interview process?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Once the assessment or interview process has started,
                    candidates cannot switch languages. It's important to choose
                    the language in which they are most confident and
                    proficient.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    <b>
                      How long does the entire assessment and interview process
                      usually take?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The duration varies, but on average, candidates should
                    allocate around 60-90 minutes for the assessment and 30-45
                    minutes for the interview. It's recommended to choose a time
                    when you can complete the process without interruptions.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    <b>
                      How are the assessment results and interview feedback used
                      in the hiring decision?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseEight"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    The assessment results and interview feedback provide a
                    comprehensive view of a candidate's suitability for the
                    role. These factors, along with other considerations, are
                    used collectively to make informed hiring decisions that
                    align with the company's requirements and values.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    style={{ backgroundColor: "lightgray" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseNine"
                    aria-expanded="false"
                    aria-controls="collapseNine"
                  >
                    <b>
                      Is there a way to prepare for the assessment and
                      interview?
                    </b>
                  </button>
                </h2>
                <div
                  id="collapseNine"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    While there's no specific preparation required, candidates
                    can review the job description and company information to
                    better understand the role and organization. Being authentic
                    and candid during the interview also helps in accurately
                    assessing your fit for the role.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQScreen;

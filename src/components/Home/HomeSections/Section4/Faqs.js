import React from "react";
import { useState } from "react";

const Faqs = () => {
  const faqWork = [
    {
      question:
        "How can I work for refining the verbal communication skills acquired from the Oral Proficiency Assessment",
      answer:
        "By actively practicing clear and articulate communication, leveraging a richer vocabulary, and refining pronunciation, you can enhance your workplace interactions.",
    },
    {
      question:
        "What steps should I take during an Oral Proficiency Assessment?",
      answer:
        "Focus on speaking clearly, expressing your thoughts coherently, and using appropriate vocabulary. Listen actively to prompts and engage in conversations to showcase your language proficiency.",
    },
    {
      question:
        "How to use Oral Proficiency Assessment results professionally?",
      answer:
        "Utilize the outcomes of the Oral Proficiency Assessment to pinpoint areas for improvement in your communication skills. Craft tailored language learning strategies based on the feedback",
    },
    {
      question: "How do I interpret the results of a Predictive Index Test?",
      answer:
        "Utilize the outcomes of the Oral Proficiency Assessment to pinpoint areas for improvement in your communication skills. Craft tailored language learning strategies based on the feedback",
    },
    {
      question:
        "How can I adapt my work style based on insights from the Predictive Index Test?",
      answer:
        "Utilize the insights gained from the test to tailor your communication and work approach to ultimately enhancing teamwork and productivity.",
    },
    {
      question:
        "How does the Predictive Index Test contribute to effective work relationships?",
      answer:
        "The Predictive Index Test offers insights into your colleagues behavioral tendencies, facilitating better understanding and communication",
    },
  ];

  const faqPrepare = [
    {
      question:
        "How can I prepare effectively for an Oral Proficiency Assessment?",
      answer:
        "Explore strategies such as practicing conversations, improving pronunciation, expanding vocabulary, and engaging in language immersion to enhance your verbal communication skills.",
    },
    {
      question:
        "How to enhance pronunciation and vocabulary before the assessment?",
      answer:
        "Consider practicing speaking regularly, listening to native speakers, expanding your vocabulary through reading, language apps, and language exchange",
    },
    {
      question:
        "What steps should I take to prepare for the Predictive Index Test?",
      answer:
        "Familiarize yourself with the test format, review sample questions, reflect on your work preferences, and consider how your traits align with potential job roles or team dynamics.",
    },
    {
      question:
        "How can I become familiar with the results assessed by the Predictive Index Test?",
      answer:
        "Results evaluated through the Predictive Index Test, review the provided materials explaining the outcomes. Reflect on how these results align with your work style and preferences",
    },
    {
      question:
        "How to grasp and respond to questions on the Predictive Index Test?",
      answer:
        "For optimal performance on the Predictive Index Test, read questions attentively, answer honestly, and align responses with your genuine work preferences and tendencies.",
    },
    {
      question:
        "How can I prepare for the tasks involved in an Oral Proficiency Assessment?",
      answer:
        "Practice active listening, engage in meaningful conversations, and refine your speaking skills through vocabulary enrichment and coherent expression.",
    },
  ];

  const [showStates, setShowStates] = useState(
    Array(faqWork.length).fill(false)
  );

  const [helloShowStates, setHelloShowStates] = useState(
    Array(faqPrepare.length).fill(false)
  );

  const toggleQuestion = (index) => {
    const updatedStates = showStates.map((state, i) =>
      i === index ? !state : false
    );
    setShowStates(updatedStates);
  };

  const toggleHelloQuestion = (index) => {
    const updatedStates = helloShowStates.map((state, i) =>
      i === index ? !state : false
    );
    setHelloShowStates(updatedStates);
  };

  return (
    <div id="Faqs" className="container-fluid my-5">
      <div className="test-section row gap-3 px-3 justify-content-center">
        {/* How To Work Div */}
        <div className="faq-work px-xl-3 px-lg-3 px-md-3 px-2">
          <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1">
            <h2 className="faq-heading text-center mt-4">How To Work</h2>
            {faqWork.map((q, index) => (
              <div className="question-section my-5 " key={index}>
                <div
                  key={index}
                  className={`collapse-area ${
                    showStates[index] && "collapse-show"
                  }`}
                  onClick={() => toggleQuestion(index)}
                >
                  <h2
                    className={`question ${
                      showStates[index] && "question-active"
                    }`}
                  >
                    {q.question}
                  </h2>
                  {showStates[index] && (
                    <p className="answer my-4">{q.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Prepare Div */}
        <div className="faq-prepare px-xl-3 px-lg-3 px-md-3 px-2">
          <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1">
            <h2 className="faq-heading text-center mt-4 ">How to Prepare</h2>
            {faqPrepare.map((q, index) => (
              <div className="question-section my-5 " key={index}>
                <div
                  key={index}
                  className={`collapse-area ${
                    helloShowStates[index] && "collapse-show"
                  }`}
                  onClick={() => toggleHelloQuestion(index)}
                >
                  <h2
                    className={`question ${
                      helloShowStates[index] && "question-active"
                    }`}
                  >
                    {q.question}
                  </h2>
                  {helloShowStates[index] && (
                    <p className="answer my-4">{q.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;

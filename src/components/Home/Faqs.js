import React from "react";
import { useState } from "react";
const Faqs = () => {
  const faqWork = [
    {
      question: "How to start language speaking ability test?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to share in Whatsapp?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to send feedback?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to share in Facebook?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to create an offline channel?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to set an Audio as your mobile ringtone?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
  ];
  const faqPrepare = [
    {
      question: "How to prepare for language speaking ability test?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to share in Whatsapp?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to send feedback?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to share in Facebook?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to create an offline channel?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
    },
    {
      question: "How to set an Audio as your mobile ringtone?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum amet nulla posuere nunc sagittis fusce a at rhoncus. Enim varius purus nec egestas amet et.",
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

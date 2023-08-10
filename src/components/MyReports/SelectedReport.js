import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  PointElement,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Radar, Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import meterBlack from "../../assets/img/meterBlack.jpg";
import meterBlue from "../../assets/img/meterBlue.jpg";
import cross from "../../assets/img/CrossIcon.png";

ChartJS.register(
  Tooltip,
  LineElement,
  PointElement,
  Legend,
  RadialLinearScale,
  ArcElement
);

export default function SelectedReport() {
  const [highestLevel, setHighestLevel] = useState(null);
  const [value, setValue] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const duration = queryParams.get("duration");
  const words_per_minute = queryParams.get("words_per_minute");
  const total_words = queryParams.get("total_words"); //active vocabulary
  const totalUniqueWords = queryParams.get("total_unique_words");
  const context = queryParams.get("context");
  const grammar_mistakes = JSON.parse(
    decodeURIComponent(queryParams.get("grammar_mistakes"))
  );
  const suggestions = grammar_mistakes.map((mistake) => mistake.suggestion);
  const mistake_index_text = grammar_mistakes.map((mistake) => [
    mistake.start,
    mistake.end,
  ]);

  /* Print Suggestions and Grammer Mistakes for table*/
  mistake_index_text.forEach((indexes, i) => {
    const [start, end] = indexes;
    const mistakeText = context.substring(start, end);

    const suggestionsForMistake = suggestions[i];
    if (suggestionsForMistake && suggestionsForMistake.length > 0) {
      suggestionsForMistake.forEach((suggestion, j) => {});
    }
  });

  /* Function for showing audio on rammer mistakes */
  const handleMouseEnter = () => {
    console.log("mouse enter");
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    console.log("mouse Leave");
    setIsHovering(false);
  };

  /* Function to Highlight Prounciation Mistakes */
  const highlightProunMistakes = (text, suggestions) => {
    if (!suggestions || suggestions.length === 0) return text;
    const characters = text.split("");
    suggestions.forEach((suggestion, i) => {
      const start = suggestion.start;
      const end = suggestion.end;
      characters[start] = (
        <span
          key={start}
          style={{ backgroundColor: "pink", position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <u>{characters[start]}</u>
          <i
            className={`fa fa-volume-up ${
              isHovering ? "opacity-100" : "opacity-25"
            } hover:opacity-100`}
            aria-hidden="true"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "-15px",
              right: "-20px",
              color: "gray",
            }}
            onClick={() => handleAudioClick(context.substring(start, end))}
          ></i>
        </span>
      );

      for (let i = start + 1; i <= end; i++) {
        characters[i] = (
          <span key={i} style={{ backgroundColor: "pink" }}>
            <u>{characters[i]}</u>
          </span>
        );
      }
    });
    return characters;
  };

  // const markGrammarMistakes = (context, mistakes, suggestions) => {
  //   const contextWords = context.split(" ");
  //   const markedContext = contextWords.map((word, index) => {
  //     const mistake = mistakes.find((m) => index >= m.start && index < m.end);
  //     if (mistake) {
  //       return (
  //         <mark key={index} style={{ backgroundColor: "pink" }}>
  //           <u>{word + ""}</u>
  //         </mark>
  //       );
  //     } else {
  //       return (
  //         <span key={index}>
  //           {highlightSuggestions(word, suggestions)}
  //           {word + " "}
  //         </span>
  //       );
  //     }
  //   });
  //   return markedContext;
  // };

  /* Function to Highlight Grammer Mistakes */
  const highlightGrammerMistakes = (text, suggestions) => {
    if (!suggestions || suggestions.length === 0) return text;

    const characters = text.split("");
    const highlightedText = [];
    let currentIndex = 0;

    suggestions.forEach((suggestion) => {
      const start = suggestion.start;
      const end = suggestion.end;

      // Add the text before the mistake
      for (let i = currentIndex; i < start; i++) {
        highlightedText.push(characters[i]);
        currentIndex++;
      }

      // Highlight suggestions in green
      suggestion.suggestion.forEach((word, j) => {
        highlightedText.push(
          <span
            key={currentIndex + j}
            style={{ color: "green", position: "relative" }}
          >
            {word}{" "}
          </span>
        );
        currentIndex += word.length + 1;
      });

      // Highlight mistakes in red
      const mistakeText = characters.slice(start, end + 1).join("");
      highlightedText.push(
        <span key={currentIndex} style={{ color: "red", position: "relative" }}>
          <strike>{mistakeText}</strike>
        </span>
      );
      currentIndex += mistakeText.length;
    });

    // Add the remaining text
    for (let i = currentIndex; i < characters.length; i++) {
      highlightedText.push(characters[i]);
    }

    return highlightedText;
  };

  /* Highest Level based on Words */
  useEffect(() => {
    const level_words_percentage = queryParams.get("level_words_percentage");
    const levelWordsPercentageData = JSON.parse(
      decodeURIComponent(level_words_percentage)
    );

    let highestLevel = "";
    let highestPercentage = -1;

    for (const [level, percentage] of Object.entries(
      levelWordsPercentageData
    )) {
      if (percentage > highestPercentage) {
        highestLevel = level;
        highestPercentage = percentage;
      }
    }

    highestLevel = highestLevel.charAt(0).toUpperCase() + highestLevel.slice(1);
    setHighestLevel(highestLevel);

    const updatedChartData = {
      labels: Object.keys(levelWordsPercentageData).map((level) => {
        const percentage = parseInt(levelWordsPercentageData[level]);
        let levelName = "";
        switch (level) {
          case "beginner":
            levelName = "Beginner (A1)";
            break;
          case "elementary":
            levelName = "Elementary (A2)";
            break;
          case "intermediate":
            levelName = "Intermediate (B1)";
            break;
          case "upper-intermediate":
            levelName = "Upper-intermediate (B2)";
            break;
          case "advanced":
            levelName = "Advanced (C1)";
            break;
          default:
            levelName = level;
            break;
        }
        return `${percentage}% — ${levelName}`;
      }),
      datasets: [
        {
          borderWidth: 1,
          data: Object.values(levelWordsPercentageData),
          backgroundColor: [
            "red",
            "blue",
            "yellow",
            "green",
            "purple",
            "orange",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],
    };

    setChartData(updatedChartData);
  }, [queryParams]);

  /* Fourth Div Tabs Changing */
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  /* Function for Audio upon Prounciation Mistakes */
  const handleAudioClick = (text) => {
    if (currentlyPlaying) {
      window.speechSynthesis.cancel();
    }
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    setCurrentlyPlaying(msg);
  };

  /* Bottom Content */
  const cardContent = [
    /* For Vocabulary */
    <div>
      {/* Vocabulary content Statistics & Level Table*/}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div
            className="card"
            style={{ borderRadius: "25px", padding: "20px" }}
          >
            <div className="card-body">
              <div className="row">
                {/* Doughnut Chart */}
                <div className="col-md-6">
                  <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                    <h8 className="card-title mx-3">Vocabulary statistics</h8>
                  </div>
                  <div
                    className="chart-container"
                    style={{ position: "relative", height: "300px" }}
                  >
                    {chartData && <Doughnut data={chartData} />}
                  </div>
                </div>

                {/* Level Table */}
                <div className="col-md-6">
                  <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                    <h8 className="card-title">Word sample by level</h8>
                  </div>
                  <div className="table-responsive">
                    <table className="table" style={{ color: "#606070" }}>
                      <thead>
                        <tr>
                          <th scope="col">Level</th>
                          <th scope="col">Words</th>
                        </tr>
                      </thead>
                      <tbody style={{ padding: "15px" }}>
                        <tr>
                          <th scope="row">A1</th>
                          <td>great, noise, phone, hear</td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">A2</th>
                          <td>find out, part of, order, add</td>
                        </tr>
                        <tr>
                          <th scope="row">B1</th>
                          <td>
                            public transport, concentrate, employment,
                            individual, technology
                          </td>
                        </tr>
                        <tr className="table-light">
                          <th scope="row">B2</th>
                          <td>
                            avoid doing, contribute, preference, in public,
                            number of
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">C1</th>
                          <td>
                            distraction, interaction, discomfort, campaign,
                            unwanted
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">C2</th>
                          <td>revive</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vocabulary content 4 small div's */}
      <div
        className="row my-5"
        style={{ textAlign: "center", padding: "0 25px 0 25px" }}
      >
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div
            className="card"
            style={{ borderRadius: "25px", padding: "15px" }}
          >
            <div className="card-body">
              <p style={{ color: "#606070" }}>Active Vocabulary</p>
              <h5 className="card-title">
                <b>
                  {total_words}&nbsp;<sub>words</sub>
                </b>
              </h5>
              <p className="card-text">
                correspond to level C1, the next level C2 starts with 10000
                words
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div
            className="card"
            style={{ borderRadius: "25px", padding: "15px" }}
          >
            <div className="card-body">
              <p style={{ color: "#606070" }}>Unique words</p>
              <h5 className="card-title">
                <b>
                  {totalUniqueWords}&nbsp;<sub>words</sub>
                </b>
              </h5>
              <p className="card-text">that used only once in your speech</p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div
            className="card"
            style={{ borderRadius: "25px", padding: "15px" }}
          >
            <div className="card-body">
              <p style={{ color: "#606070" }}>Rare words</p>
              <h5 className="card-title">
                <b>
                  7482&nbsp;<sub>%</sub>
                </b>
              </h5>
              <p className="card-text">
                words that are not among the 5,000 most common English
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div
            className="card"
            style={{ borderRadius: "25px", padding: "15px" }}
          >
            <div className="card-body">
              <p style={{ color: "#606070" }}>Frequently used words</p>
              <h5 className="card-title">
                <b>
                  7482&nbsp;<sub>%</sub>
                </b>
              </h5>
              <p className="card-text">
                words that are among the 2,000 most frequently used English
                words
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    /*For Prouncation */
    <div>
      {/* Prouncation Scale */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <h8 className="card-title">Speaking rate (words per minute)</h8>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col">
                      <img
                        src={meterBlue}
                        alt="blue meter"
                        width={50}
                        height={50}
                        style={{ float: "left" }}
                      />

                      <p
                        className="card-text"
                        style={{ color: "#9E9E9E", padding: "0 0 0 60px" }}
                      >
                        <b>My speaking rate</b>
                        <br />
                        <h3 style={{ color: "black" }}>
                          <b>127</b>
                        </h3>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col">
                      <img
                        src={meterBlack}
                        alt="blue meter"
                        width={50}
                        height={50}
                        style={{ float: "left" }}
                        className="mx-3"
                      />
                      <p className="card-text" style={{ color: "#9E9E9E" }}>
                        <b>
                          Common speaking rate for native speakers in the US
                        </b>
                        <br />
                        <h3 style={{ color: "black" }}>
                          <b>90-150</b>
                        </h3>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {/* <div className="row my-5">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Example 20px high"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: "20px" }}
                >
                  <div class="progress-bar" style={{ width: "25%" }}></div>
                </div>
              </div> */}

              {/* <div
                style={{
                  backgroundImage: "radial-gradient(circle, white 0%, lightblue 100%)",
                  color: "darkred",              
                }}
              >
                Inline style in react background: linear-gradient
              </div> */}

              <pre>
                <div className="row my-5" style={{ padding: "40px 0 0 0" }}>
                  <div className="progress-container">
                    <div
                      className="progress"
                      role="progressbar"
                      style={{
                        height: "25px",
                        width: "183%",
                        backgroundImage:
                          "radial-gradient(circle, white 0%, lightblue 100%)",
                        color: "darkred",
                      }}
                    >
                      <div
                        className="progress-bar"
                        // style={{ width: "35%" }}
                      ></div>
                    </div>
                    <div className="ruler">
                      {[
                        0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
                        130, 140, 150, 160, 170,
                      ].map((value) => (
                        <div
                          className="ruler-mark"
                          style={{
                            left: `${value}%`,
                            width: `${100 / (value + 10)}%`,
                          }}
                        >
                          <div className="ruler-line"></div>
                          <div className="ruler-value">{value}</div>
                          {value === 70 && (
                            <div className="boring-text">may be boring</div>
                          )}
                          {value === 120 && (
                            <div className="normal-text">normal</div>
                          )}
                          {value === 160 && (
                            <div className="fast-text">
                              too fast to understand
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Prouncation Content */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <h8 className="card-title">Pronunciation</h8>
                <br />
                <br />
                <h9 className="my-5" style={{ backgroundColor: "pink" }}>
                  <u>Pronunciation mistakes</u>
                </h9>
                &nbsp; &nbsp;
                <h9 style={{ backgroundColor: "#f5e06c" }}>
                  <u>Phonetic inaccuracies that change the meaning</u>
                </h9>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="card-text">
                    {highlightProunMistakes(context, grammar_mistakes)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prouncation Mistakes Table*/}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <i className="fa fa-volume-up fa-xl" aria-hidden="true"></i>
                <h8 className="card-title mx-3">
                  Most difficult words to pronounce
                </h8>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table" style={{ textAlign: "center" }}>
                    <thead style={{ color: "#606070" }}>
                      <tr>
                        <th scope="col">Word</th>
                        <th scope="col">Suggestions</th>
                        <th scope="col">Audio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mistake_index_text.map((indexes, i) => {
                        const [start, end] = indexes;
                        const mistakeText = context.substring(start, end);

                        const suggestionsForMistake = suggestions[i];
                        const suggestionsList =
                          suggestionsForMistake.join(", ");

                        return (
                          <tr key={i}>
                            <td>{mistakeText}</td>
                            <td>{suggestionsList}</td>
                            <td>
                              <i
                                className="fa fa-volume-up"
                                aria-hidden="true"
                                style={{ cursor: "pointer", color: "gray" }}
                                onClick={() => handleAudioClick(mistakeText)}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    /* Grmmer mistakes */
    <div>
      {/* Articles in Grammer */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <img src={cross} alt="cross icon" width={50} height={50} />
                <h8 className="card-title mx-3">Common grammar problems</h8>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table" style={{ textAlign: "center" }}>
                    <thead style={{ color: "#606070" }}>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Rule</th>
                        <th scope="col">Mistakes</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Articles</td>
                        <td>3</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mistakes in Detail */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div
                style={{
                  fontWeight: "bold",
                  padding: "25px 0",
                }}
              >
                <h8 className="card-title mx-2">Mistakes in detail</h8>
              </div>
              <div
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "10px",
                  padding: "20px 30px 10px 10px",
                }}
              >
                <p>
                  <i
                    className="fa fa-exclamation-circle mx-2"
                    aria-hidden="true"
                  ></i>
                  <b> Experimental block</b>
                </p>
                <p className="mx-2">
                  This block serves for experimental purposes, and some of our
                  English learners consider it useful. If you spot any words you
                  haven’t pronounced, please check your environment for
                  unexpected noise and try to speak clearly. These issues won’t
                  impact your overall score.
                </p>
              </div>
              <div className="my-5" style={{ color: "green" }}>
                <strike className="mx-2" style={{ color: "red" }}>
                  mistake
                </strike>
                {"  "}
                <strike className="mx-3" style={{ color: "#EDBA5C" }}>
                  speech error
                </strike>{" "}
                suggestion
              </div>
              <div className="row">
                <div className="col-md-12 mx-3 my-2">
                  <p>{highlightGrammerMistakes(context, grammar_mistakes)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <div style={{ padding: "45px" }}>
      <div className="row mx-1">
        <div className="col-md-12">
          <h4>
            <p style={{ fontWeight: "bold" }}>
              CDS English Speaking Level Test
            </p>
          </h4>
          <p className="mx-1">
            Duration: {duration} &nbsp; Words: {words_per_minute}
          </p>
        </div>
      </div>

      {/* First div */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <h8 className="card-title">Scores</h8>
                <h3 className="card-title my-3"> {highestLevel}</h3>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <p className="card-text">
                    A person at this level can understand a wide range of
                    demanding, longer texts, and recognize implicit meaning.
                    They can express themselves fluently and spontaneously
                    without much obvious searching for expressions.
                  </p>
                </div>
                <div className="col-md-4">
                  <div
                    className="row img-container"
                    style={{ marginTop: "-155px" }}
                  >
                    <div
                      style={{
                        width: "330px",
                        height: "330px",
                      }}
                    >
                      {/* <Radar data={data} options={options} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second div's */}
      <div className="row mb-3" style={{ padding: "15px" }}>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body" style={{ padding: "35px" }}>
              <h7 className="card-title">
                <b>Nicely done</b>
              </h7>
              <p className="card-text my-4">
                <ul className="checklist">
                  <li className="my-1">
                    You used 7 advanced <b>grammar constructions:</b> reported
                    speech, relative clauses, passive voice, tenses,
                    conditional, modals, phrasal verbs.
                  </li>
                  <li className="my-3">
                    You’re an expert at using <b>phrasal verbs:</b> “find out”,
                    “go on”.
                  </li>
                  <li className="my-1">
                    You have a large <b>active vocabulary</b> and use more{" "}
                    <b>high-level words</b> than most speakers of English do.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body" style={{ padding: "35px" }}>
              <h7 className="card-title">
                <b>Things to improve</b>
              </h7>
              <p className="card-text my-4">
                <ul className="checklist-2">
                  <li className="my-1">
                    Only 22% of your sentences had a <b>complex structure.</b>
                  </li>
                  <li className="my-2">
                    Use some <b>synonyms:</b> “photo”, “trip”, “group”, “free”,
                    “time”, were used too often when talking about the same
                    thing.
                  </li>
                  <li className="my-1">
                    Add various linking words, such as ‘besides’, ‘to start
                    with’, ‘in spite of’, ‘to my mind’, ‘in case of’,
                    ‘therefore’.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third div */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          <Box sx={{ width: "100%" }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={handleTabChange}
              style={{
                backgroundColor: "#f9f9fa",
                borderRadius: "50px",
                height: "85px",
                padding: "10px",
              }}
            >
              <BottomNavigationAction
                label={
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3vw",
                      transition: "font-size 0.3s ease-in-out",
                    }}
                  >
                    Vocabulary
                  </span>
                }
                sx={{
                  minWidth: "31%",
                  color: value === 0 ? "black !important" : "#606070",
                  backgroundColor: value === 0 ? "white" : "",
                  borderRadius: value === 0 ? "50px" : "0",
                }}
                className="customWidth mx-1"
              />

              <BottomNavigationAction
                label={
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3vw",
                      transition: "font-size 0.3s ease-in-out",
                    }}
                  >
                    Pronunciation &amp; Fluency
                  </span>
                }
                sx={{
                  minWidth: "33%",
                  color: value === 1 ? "black !important" : "#606070",
                  backgroundColor: value === 1 ? "white" : "",
                  borderRadius: value === 1 ? "50px" : "0",
                }}
                className="customWidth mx-1"
              />

              <BottomNavigationAction
                label={
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3vw",
                      transition: "font-size 0.3s ease-in-out",
                    }}
                  >
                    Grammar
                  </span>
                }
                className="customWidth mx-1"
                sx={{
                  minWidth: "31%",
                  color: value === 2 ? "black !important" : "#606070",
                  backgroundColor: value === 2 ? "white" : "",
                  borderRadius: value === 2 ? "50px" : "0",
                }}
              />
            </BottomNavigation>
          </Box>
        </div>
      </div>

      <br />
      {cardContent[value]}
    </div>
  );
}

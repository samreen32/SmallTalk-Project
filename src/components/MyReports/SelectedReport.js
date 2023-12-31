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
import Navbar from "../Home/HomeSections/Section1/Navbar";
import { UserLogin } from "../../context/AuthContext";
import polygon from "../../assets/img/Group 1.svg";
import ReactApexChart from "react-apexcharts";

ChartJS.register(
  Tooltip,
  LineElement,
  PointElement,
  Legend,
  RadialLinearScale,
  ArcElement
);

export default function SelectedReport() {
  const { levelDescriptions, levelCodes } = UserLogin();

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
  const similarityScore = parseFloat(queryParams.get("similarity_score")) || 0;
  const roundedScore = Math.round(similarityScore);
  const normalizedScore = Math.min(Math.max(roundedScore, 0), 100);
  const levelWords = JSON.parse(queryParams.get("level_words"));

  // if (
  //   duration &&
  //   words_per_minute &&
  //   total_words &&
  //   totalUniqueWords &&
  //   context &&
  //   grammar_mistakes &&
  //   similarityScore &&
  //   levelWords
  // ) {
  //   const newUrl = window.location.pathname;
  //   window.history.pushState({}, "", newUrl);
  // }

  /* Print Suggestions and Grammer Mistakes for table*/
  mistake_index_text.forEach((indexes, i) => {
    const [start, end] = indexes;
    const mistakeText = context.substring(start, end);

    const suggestionsForMistake = suggestions[i];
    if (suggestionsForMistake && suggestionsForMistake.length > 0) {
      suggestionsForMistake.forEach((suggestion, j) => {});
    }
  });

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
  // const getProficiencyLabel = (level) => {
  //   const labels = {
  //     beginner: "A1",
  //     elementary: "A2",
  //     intermediate: "B1",
  //     "upper-intermediate": "B2",
  //     advanced: "C1",
  //     proficiency: "C2",
  //   };
  //   return labels[level];
  // };

  // useEffect(() => {
  //   const level_words_percentage = queryParams.get("level_words_percentage");
  //   const levelWordsPercentageData = JSON.parse(
  //     decodeURIComponent(level_words_percentage)
  //   );

  //   const levelOrder = [
  //     "beginner",
  //     "elementary",
  //     "intermediate",
  //     "upper-intermediate",
  //     "advanced",
  //     "proficiency",
  //   ];

  //   let highestLevel = "Beginner";
  //   let highestPercentage = -1;

  //   for (const level of levelOrder) {
  //     const percentage = parseInt(levelWordsPercentageData[level] || 0);
  //     if (percentage > highestPercentage) {
  //       highestLevel = level;
  //       highestPercentage = percentage;
  //     }
  //   }

  //   highestLevel = highestLevel.charAt(0).toUpperCase() + highestLevel.slice(1);
  //   setHighestLevel(highestPercentage > 0 ? highestLevel : "Beginner");

  //   // const MINIMUM_PERCENTAGE = 1;

  //   // const updatedChartData = levelOrder.map((level) => {
  //   //   const percentage = parseInt(levelWordsPercentageData[level] || 0);
  //   //   const adjustedPercentage = Math.max(percentage, MINIMUM_PERCENTAGE);
  //   //   return [
  //   //     `${adjustedPercentage}% — ${getProficiencyLabel(level)} (${
  //   //       level.charAt(0).toUpperCase() + level.slice(1)
  //   //     })`,
  //   //     adjustedPercentage,
  //   //   ];
  //   // });

  //   const updatedChartData = levelOrder.map((level) => [
  //     `${parseInt(levelWordsPercentageData[level])}% — ${
  //       level.charAt(0).toUpperCase() + level.slice(1)
  //     } (${getProficiencyLabel(level)})`,
  //     parseInt(levelWordsPercentageData[level]),
  //   ]);

  //   // console.log("chart data", updatedChartData);
  //   setChartData(updatedChartData);
  // }, [queryParams]);

  const defaultLevel = "Beginner";
  const [highestLevel, setHighestLevel] = useState(defaultLevel);

  const [value, setValue] = useState(0);
  const [chartData, setChartData] = useState(null);

  const level_words_percentage = queryParams.get("level_words_percentage");
  const levelWordsPercentageData = JSON.parse(
    decodeURIComponent(level_words_percentage)
  );

  const levelOrder = [
    "beginner",
    "elementary",
    "intermediate",
    "upper-intermediate",
    "advanced",
    "proficiency",
  ];

  useEffect(() => {
    let highestLevel = "Beginner";
    let highestPercentage = -1;

    for (const level of levelOrder) {
      const percentage = levelWordsPercentageData[level];
      if (percentage > highestPercentage) {
        highestLevel = level;
        highestPercentage = percentage;
      }
    }

    // highestLevel = highestLevel.charAt(0).toUpperCase() + highestLevel.slice(1);
    // setHighestLevel(highestPercentage > 0 ? highestLevel : "Beginner");
    setHighestLevel(() => {
      if (highestPercentage > 0) {
        return highestLevel.charAt(0).toUpperCase() + highestLevel.slice(1);
      } else {
        return defaultLevel;
      }
    });

    const updatedChartData = {
      labels: levelOrder.map((level) => {
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
          case "proficiency":
            levelName = "Proficiency (C2)";
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
          data: levelOrder.map((level) => levelWordsPercentageData[level]),
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

  /* Display Current Level and Next Level in Active Vocabulary 4 div */
  const currentLevelCode = levelCodes[highestLevel.toLowerCase()];
  let nextLevelCode = "";
  const levels = Object.keys(levelCodes);
  const currentLevelIndex = levels.indexOf(highestLevel.toLowerCase());
  if (currentLevelIndex !== -1 && currentLevelIndex < levels.length - 1) {
    nextLevelCode = levelCodes[levels[currentLevelIndex + 1]];
  }

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

  /* Function for showing audio on rammer mistakes */
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  /* Scores for Scale Meter */
  const totalScore = {
    beginner: 120,
    elementary: 180,
    intermediate: 126,
    upperIntermediate: 138,
    advanced: 150,
  };

  function generateGradientStops() {
    const rulerValues = [
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
      170,
    ];
    const stops = rulerValues.map((value) => `lightblue ${value}%`).join(", ");
    return `linear-gradient(to right, ${stops})`;
  }

  // const chartData_ = {
  //   labels: ["Category A", "Category B", "Category C", "Category D"],
  //   series: [30, 20, 25, 15],
  // };

  // Options for the pie chart
  // const chartOptions = {
  //   labels: chartData_.labels,
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           width: 200,
  //         },
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //   ],
  // };

  // const options = {
  //   data: [
  //     {
  //       type: "pie",
  //       showInLegend: true,
  //       legendText: "{label}",
  //       dataPoints: [
  //         { label: "Apple", y: 10 },
  //         { label: "Banana", y: 15 },
  //         { label: "Cherry", y: 7 },
  //         { label: "Date", y: 5 },
  //         { label: "Elderberry", y: 20 },
  //       ],
  //     },
  //   ],
  // };

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
                  <div style={{ fontWeight: "bold", padding: "15px 0" }}>
                    <h6 className="card-title mx-3">
                      <b>Vocabulary statistics</b>
                    </h6>
                  </div>
                  <div
                    className="chart-container"
                    style={{
                      position: "relative",
                      height: "300px",
                      maxWidth: "80%",
                      marginBottom: "60px",
                    }}
                  >
                    {chartData && <Doughnut data={chartData} />}
                    {/* {chartData && (
                      <ReactApexChart
                        options={{
                          labels: chartData.labels,
                        }}
                        series={chartData.datasets[0].data}
                        type="pie"
                        width="400"
                      />
                    )} */}
                    {/* <ReactApexChart
                      options={chartOptions}
                      series={chartData_.series}
                      type="pie"
                      width="100%"
                    /> */}
                    {/* {chartData && (
                      <ReactApexChart
                        options={{
                          labels: chartData.labels,
                          legend: {
                            show: true,
                            position: "bottom",
                          },
                        }}
                        series={chartData.series}
                        type="pie"
                        width="100%"
                      />
                    )} */}
                    {/* {chartData && <CanvasJSChart options={chartData} />} */}
                    {/* {chartData && (
                      <Chart
                        chartType="PieChart"
                        width={"100%"}
                        height={"300px"}
                        loader={<div>Loading Chart</div>}
                        data={[["Level", "Percentage"], ...chartData]}
                        options={{
                          pieHole: 0.4,
                          colors: [
                            "red",
                            "blue",
                            "yellow",
                            "green",
                            "purple",
                            "orange",
                          ],
                        }}
                      />
                    )} */}
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
                        {[
                          "beginner",
                          "elementary",
                          "intermediate",
                          "upper-intermediate",
                          "advanced",
                          "proficiency",
                        ].map(
                          (level, index) =>
                            levelWords[level] && (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "table-light"}
                              >
                                <th scope="row">{levelCodes[level]}</th>
                                <td>{levelWords[level].join(", ")}</td>
                              </tr>
                            )
                        )}
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
                Corresponds to level {currentLevelCode}, the next level{" "}
                {nextLevelCode ? `${nextLevelCode}` : "is not defined"} starts
                with {total_words}&nbsp; words
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
                  54&nbsp;<sub>%</sub>
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
                  28&nbsp;<sub>%</sub>
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
                          <b>{normalizedScore}</b>
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
                      />
                      <p
                        className="card-text"
                        style={{ color: "#9E9E9E", padding: "0 0 0 60px" }}
                      >
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
              <pre>
                <div className="row my-5" style={{ padding: "40px 0 0 0" }}>
                  <div className="progress-container">
                    <div
                      className="progress"
                      role="progressbar"
                      style={{
                        height: "25px",
                        // width: "100%",
                        // backgroundImage:
                        //   "linear-gradient(to right, white 0%, lightgray 100%)",
                        color: "darkred",
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${(normalizedScore / 100) * 100}%`,
                          backgroundColor: "#3790B7",
                        }}
                      ></div>
                    </div>
                    <div className="ruler">
                      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                        (value) => (
                          <div
                            key={value}
                            className="ruler-mark"
                            style={{
                              left: `${value}%`,
                            }}
                          >
                            <div className="ruler-line"></div>
                            <div className="ruler-value">{value}</div>
                            {value === 10 && (
                              <div className="boring-text">may be boring</div>
                            )}
                            {value === 50 && (
                              <div className="normal-text">normal</div>
                            )}
                            {value === 80 && (
                              <div className="fast-text">
                                too fast to understand
                              </div>
                            )}
                          </div>
                        )
                      )}
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
            <div className="card-body mx-2">
              <div style={{ fontWeight: "bold", padding: "15px 0" }}>
                <i className="fa fa-volume-up fa-lg" aria-hidden="true"></i>
                <h8 className="card-title mx-3">
                  {" "}
                  Most difficult words to pronounce
                </h8>
              </div>
              <div className="table-responsive">
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
                      const suggestionsList = suggestionsForMistake.join(", ");

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
    </div>,

    /* Grmmer mistakes */
    <div>
      {/* Common Mistakes in Grammer e.g. article */}
      <div className="row mb-3">
        <div className="col-md-12" style={{ padding: "0 30px" }}>
          <div className="card" style={{ borderRadius: "25px" }}>
            <div className="card-body mx-4 ">
              <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                <img src={cross} alt="cross icon" width={50} height={50} />
                <h8 className="card-title mx-3">Common grammar problems</h8>
              </div>
              <>
                <div className="table-responsive">
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
              </>
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
    <>
      <Navbar />

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
        {highestLevel && (
          <div className="row mb-3">
            <div className="col-md-12" style={{ padding: "0 30px" }}>
              <div className="card" style={{ borderRadius: "25px" }}>
                <div className="card-body mx-4 ">
                  <div className="row">
                    <div className="col-md-8">
                      <div style={{ fontWeight: "bold", padding: "25px 0" }}>
                        <h8 className="card-title">Scores</h8>
                        <h3 className="card-title my-3"> {highestLevel}</h3>
                      </div>
                      <p className="card-text">
                        {levelDescriptions[highestLevel.toLowerCase()]}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="row img-container">
                        <div
                          className="mt-neg d-flex justify-content-center align-items-center"
                          style={{
                            width: "100%",
                            height: "360px",
                            position: "relative",
                            padding: "0 0 0 25%",
                          }}
                        >
                          <img
                            src={polygon}
                            className="report_polygon img-fluid"
                            alt="polygon level"
                          />
                          <p
                            className="level-text position-absolute text-center m-0 "
                            style={{
                              color: "#2e68ff",
                              fontWeight: "bold",
                              width: "100%",
                            }}
                          >
                            {levelCodes[highestLevel.toLowerCase()]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <Radar data={data} options={options} /> */}

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
                      You’re an expert at using <b>phrasal verbs:</b> “find
                      out”, “go on”.
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
                      Use some <b>synonyms:</b> “photo”, “trip”, “group”,
                      “free”, “time”, were used too often when talking about the
                      same thing.
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

        {cardContent[value]}
      </div>
    </>
  );
}

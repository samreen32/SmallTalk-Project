import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { TextField, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import Navbar from "../Home/HomeSections/Section1/Navbar";
import EmptySearch from "../Loader/EmptySearch";
import { REPORT_API_URL } from "../../Auth_API";

function Reports() {
  const {
    userData,
    reportData,
    setReportData,
    stickyNav,
    setstickyNav,
    toTop,
    settoTop,
    active,
    setActive,
  } = UserLogin();
  const { id } = userData;

  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const searchWords = searchQuery.split(" "); // Split search query into words
  const reportDataFiltered = reportData.filter((report) =>
    searchWords.every(
      (word) =>
        report.name.toLowerCase().includes(word.toLowerCase()) ||
        report.details.duration.toLowerCase().includes(word.toLowerCase())
    )
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isScreenSmall = windowWidth <= 530;

  /* Report card responsiveness */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Functions for Search */
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      boxSizing: "border-box",
      padding: theme.spacing(1, 10),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "30ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }));

  /* Function to get the Reports for user */
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${REPORT_API_URL}/get-report/${id}`);

        if (response.ok) {
          const data = await response.json();
          setReportData(data);
        } else {
          console.error("Failed to fetch report data");
        }
      } catch (error) {
        console.error("Error while fetching report:", error);
      }
    };

    fetchReport();
  }, [id]);

  // const storedData = localStorage.getItem("responseData");
  // if (storedData) {
  //   const parsedData = JSON.parse(storedData);
  //   setResponseData(parsedData);
  // }

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
      <div className="my-5" style={{ padding: "10px 70px 0 70px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <>
            <Toolbar>
              <form
                className="d-flex"
                role="search"
                style={{
                  borderRadius: "18px",
                  backgroundColor: "#F9F9FA",
                  height: "60px",
                  alignItems: "center",
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Search>

                {/* <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <input
                  className="form-control me-2 mx-5"
                  style={{ width: "75%", backgroundColor: "#f7f7f5" }}
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  autocomplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
              </form>
            </Toolbar>
            <br />
          </>
          {/* <TextField
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ margin: "10px" }}
          /> */}

          <>
            {reportDataFiltered.map((report, index) => (
              <div
                key={report.id}
                className="card my-3"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  fontWeight: "bold",
                }}
              >
                <div
                  className={`card-body ${
                    isScreenSmall ? "card-small-screen" : "card-larger-screen"
                  }`}
                >
                  <div style={{ flex: "1", fontWeight: "bold" }}>
                    {index + 1}. {report.name}
                  </div>
                  <div style={{ flex: "1", color: "gray" }}>
                    {report.details.duration}
                  </div>
                  <div style={{ flex: "1", color: "gray" }}>
                    <i className="fa fa-pencil mx-2" aria-hidden="true"></i>
                    <i className="fa fa-trash mx-2" aria-hidden="true"></i>
                  </div>
                  <Link
                    to={{
                      pathname: "/SelectedReport",
                      search: `?duration=${
                        report.details.duration
                      }&words_per_minute=${
                        report.details.word_per_minute
                      }&similarity_score=${
                        report.details.similarity_score[0]
                      }&total_words=${
                        report.details.vocabulary_proficiency["Total Words:"]
                      }&total_unique_words=${
                        report.details.vocabulary_proficiency[
                          "Total Unique Words:"
                        ]
                      }&context=${
                        report.details.context
                      }&grammar_mistakes=${encodeURIComponent(
                        JSON.stringify(report.details.grammar_mistakes)
                      )}&suggestions=${encodeURIComponent(
                        JSON.stringify(report.details.suggestions)
                      )}&level_words_percentage=${encodeURIComponent(
                        JSON.stringify(
                          report.details.vocabulary_proficiency[
                            "level_words_percentage"
                          ]
                        )
                      )}&level_words=${encodeURIComponent(
                        JSON.stringify(
                          report.details.vocabulary_proficiency["level_words"]
                        )
                      )}`,
                    }}
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    <i className="fa fa-chevron-right fa-xl"></i>
                  </Link>
                </div>
              </div>
            ))}
            {/* <EmptySearch /> */}
            {reportDataFiltered.length == 0 && <EmptySearch />}
          </>
        </Box>
      </div>
    </>
  );
}

export default Reports;

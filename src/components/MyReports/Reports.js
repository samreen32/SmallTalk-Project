import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import Navbar from "../Home/Navbar";

function Reports() {
  let number_id = 0;
  const { responseData, setResponseData } = UserLogin();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  /* Get Reports */
  useEffect(() => {
    const storedData = localStorage.getItem("responseData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setResponseData(parsedData);
    }
  }, []);

  /* Filter responseData based on the search value */
  useEffect(() => {
    setFilteredData(
      responseData !== null
        ? responseData.filter((item) =>
            search.toLowerCase() === ""
              ? item
              : item.duration.toLowerCase().includes(search)
          )
        : []
    );
  }, [responseData, search]);

  return (
    <>
      <Navbar />
      <div className="container my-5">
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              /> */}
              </form>
            </Toolbar>
            <br />
          </>

          {filteredData.length > 0 ? (
            filteredData.map((response, index) => {
              number_id += 1;
              return (
                <div
                  className="card my-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    borderRadius: "18px",
                  }}
                  key={index}
                >
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      flexWrap: "wrap",
                      padding: "33px",
                      backgroundColor: "#F9F9FA",
                      borderRadius: "18px",
                    }}
                  >
                    <div
                      style={{
                        flex: "1",
                      }}
                    >
                      {number_id}. English Speaking Level Test
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          flex: "1",
                          marginRight: "90px",
                          color: "gray",
                        }}
                      >
                        {response.duration}
                      </div>
                      <div style={{ marginRight: "160px", color: "gray" }}>
                        <i className="fa fa-pencil mx-5" aria-hidden="true"></i>
                        <i className="fa fa-trash mx-5" aria-hidden="true"></i>
                      </div>
                      <Link
                        to={{
                          pathname: "/SelectedReport",
                          search: `?duration=${
                            response.duration
                          }&words_per_minute=${
                            response.word_per_minute
                          }&similarity_score=${
                            response.similarity_score
                          }&total_words=${
                            response.vocabulary_proficiency["Total Words:"]
                          }&total_unique_words=${
                            response.vocabulary_proficiency[
                              "Total Unique Words:"
                            ]
                          }&context=${
                            response.context
                          }&grammar_mistakes=${encodeURIComponent(
                            JSON.stringify(response.grammar_mistakes)
                          )}&suggestions=${encodeURIComponent(
                            JSON.stringify(response.suggestions)
                          )}&level_words_percentage=${encodeURIComponent(
                            JSON.stringify(
                              response.vocabulary_proficiency[
                                "level_words_percentage"
                              ]
                            )
                          )}`,
                        }}
                        style={{ color: "black", fontWeight: "bolder" }}
                      >
                        <i className="fa fa-chevron-right fa-xl"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="my-5" style={{ textAlign: "center" }}>
              <h1>Empty Report Section</h1>
            </div>
          )}
        </Box>
      </div>
    </>
  );
}

export default Reports;

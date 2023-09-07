import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AUTH_API_URL, REPORT_API_URL } from "../../../Auth_API";

const DashFoot = () => {
  const [userDetails, setUserDetails] = useState([]);
  const levelToCEFR = {
    beginner: "A1",
    elementary: "A2",
    intermediate: "B1",
    "upper-intermediate": "B2",
    advanced: "C1",
    proficiency: "C2",
  };

  const initialTableData = [
    {
      name: userDetails.name,
      email: userDetails.email,
      reports: 2,
      oral: 2,
      index: 0,
    },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [searchedData, setSearchedData] = useState(initialTableData);

  const onChangeData = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setSearchedData(tableData);
    } else {
      const filterData = tableData.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value)
      );
      setSearchedData(filterData);
      if (filterData.length === 0) {
        setSearchedData(tableData);
      }
    }
  };

  /* Function to capitalize first letter of name */
  const capitalizeFirst = (str) => {
    if (typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  const findHighestLevelName = (reportData) => {
    let highestPercentage = 0;
    let highestLevelName = "Beginner"; // Default to "Beginner"

    for (const report of reportData) {
      const { details } = report;
      if (
        details &&
        details.vocabulary_proficiency &&
        details.vocabulary_proficiency.level_words_percentage
      ) {
        const { level_words_percentage } = details.vocabulary_proficiency;

        for (const levelName in level_words_percentage) {
          if (level_words_percentage.hasOwnProperty(levelName)) {
            const percentage = level_words_percentage[levelName];
            if (percentage > highestPercentage) {
              highestPercentage = percentage;
              highestLevelName = levelName;
            }
          }
        }
      }
    }

    return highestLevelName;
  };

  /* Function to get user details */
  const getAllUsersDetails = async () => {
    try {
      const userDetailsResponse = await fetch(`${AUTH_API_URL}/user-details/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!userDetailsResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const userDetailsData = await userDetailsResponse.json();
      setUserDetails(userDetailsData);

      console.log("User Details:", userDetailsData);

      const updatedUserTableData = userDetailsData.map(async (user) => {
        const userId = user.id;
        console.log(userId, "user id");
        const reportDataResponse = await fetch(
          `http://192.168.18.29:8000/report/get-report/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!reportDataResponse.ok) {
          throw new Error("Network response for report data was not ok");
        }

        const reportData = await reportDataResponse.json();
        console.log("Report Data:", reportData);

        const highestLevelName = findHighestLevelName(reportData);
        console.log("highest level name", highestLevelName);

        const cefrLevel = levelToCEFR[highestLevelName] || "A1";
        console.log("csrf lecvel", cefrLevel);

        // Update the user's table data with the highest percentage
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          reports: highestLevelName,
          oral: cefrLevel,
          index: 4,
        };
      });

      // Wait for all promises to resolve
      const userTableData = await Promise.all(updatedUserTableData);

      setTableData(userTableData);
      setSearchedData(userTableData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return 0;
    }
  };

  useEffect(() => {
    getAllUsersDetails();
  }, []);

  const mapLevelToCEFR = (levelName) => {
    return levelToCEFR[levelName] || ""; // Default to empty string if levelName is not found
  };

  return (
    <div style={{ paddingBottom: "23px" }}>
      <div
        className="dashboard-footer mt-lg-0 mt-3"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="search-area py-2 my-5">
          <AiOutlineSearch className="mx-2" style={{ fontSize: "1.3rem" }} />
          <input
            type="text"
            className="search-field"
            placeholder="Search here..."
            onChange={(e) => {
              onChangeData(e);
            }}
            style={{ backgroundColor: "#F5F5F5" }}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr className="thead-content">
                <td className="py-3"># </td>
                <td className="py-3">User Name </td>
                <td className="py-3">Email </td>
                <td className="py-3">Reports Score </td>
                <td className="py-3">Oral Assessment</td>
                <td className="py-3">Predictive Index </td>
                <td className="py-3">Action</td>
              </tr>
              {searchedData.map((item, index) => {
                return (
                  <tr className="fw-bold" key={index}>
                    <td className="py-3">{item.id} </td>
                    <td className="py-3">{capitalizeFirst(item.name)} </td>
                    <td className="py-3">{item.email}</td>
                    <td className="py-3">{capitalizeFirst(item.reports)}</td>
                    <td className="py-3">{item.oral}</td>
                    <td className="py-3">{item.index}</td>
                    <td className="py-3">
                      <NavLink to="/UserDetails" className="nav-btn">
                        <IoIosShareAlt />
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashFoot;

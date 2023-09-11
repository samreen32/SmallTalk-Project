import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AUTH_API_URL, REPORT_API_URL } from "../../../Auth_API";
import { UserLogin } from "../../../context/AuthContext";

const DashFoot = () => {
  const { showToast, capitalizeFirst, levelCodes } = UserLogin();
  const [tableData, setTableData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

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

  const findHighestLevelName = (reportData) => {
    let highestPercentage = 0;
    let highestLevelName = "Beginner";

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

  /* Function to get user details for table */
  const getAllUsersDetails = async () => {
    try {
      const userDetailsResponse = await fetch(`${AUTH_API_URL}/user-details/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!userDetailsResponse.ok) {
        throw new Error("Network Error");
      }

      const userDetailsData = await userDetailsResponse.json();
      const updatedUserTableData = userDetailsData.map(async (user) => {
        const userId = user.id;
        const reportDataResponse = await fetch(
          `${REPORT_API_URL}/get-report/${userId}`,
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

        const highestLevelName = findHighestLevelName(reportData);
        const cefrLevel = levelCodes[highestLevelName] || "A1";

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          reports: highestLevelName,
          oral: cefrLevel,
          index: 4,
        };
      });

      const userTableData = await Promise.all(updatedUserTableData);
      setTableData(userTableData);
      setSearchedData(userTableData);
    } catch (error) {
      showToast("There was a problem with the fetch operation.");
      console.error("There was a problem with the fetch operation:", error);
      return 0;
    }
  };

  useEffect(() => {
    getAllUsersDetails();
  }, []);

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
                    <td className="py-3">{item.id}</td>
                    <td className="py-3">{capitalizeFirst(item.name)}</td>
                    <td className="py-3">{item.email}</td>
                    <td className="py-3">{capitalizeFirst(item.reports)}</td>
                    <td className="py-3">{item.oral}</td>
                    <td className="py-3">{item.index}</td>
                    <td className="py-3">
                      {console.log("highestlevel name", item.oral)}
                      <NavLink
                        to={{
                          pathname: "/UserDetails",
                          search: `?reportScore=${item.reports}&oral=${item.oral}`,
                        }}
                        className="nav-btn"
                      >
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

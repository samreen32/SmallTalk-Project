import React from "react";
import Dashboard from "./Layout/dashboard";
import Graph from "./graph";
import DashFoot from "../../AdminView/Dashboard/dashFoot";
import { AUTH_API_URL, REPORT_API_URL } from "../../../Auth_API";

/* Function to count total users */
const countTotalUsers = async () => {
  try {
    const response = await fetch(`${AUTH_API_URL}/user_count/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.total_users;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return 0;
  }
};

const totalUsers = await countTotalUsers();

/* Function to count total reports */
const countTotalReports = async () => {
  try {
    const response = await fetch(`${REPORT_API_URL}/get_total_report/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.total_reports;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return 0;
  }
};

const totalReports = await countTotalReports();

const data = [
  {
    title: "Total Valid User",
    value: totalUsers,

    icon: true,
  },
  {
    title: "Total Reports",
    value: totalReports,
  },
  {
    title: "Total CV's",
    value: 3115,
  },
  {
    title: "Total Oral Assessments",
    value: totalReports,
  },
];

const Balance = () => {
  return (
    /* Dashboard 4 div at top */
    <Dashboard title="Dashboard">
      <div className="background">
        <div className="dashboard-top">
          {data.map((item, index) => {
            return (
              <div className="total" key={index}>
                <p className="caption mb-3">
                  {item.title}{" "}
                  {item.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1C6.61553 1 5.26215 1.41054 4.11101 2.17971C2.95987 2.94888 2.06266 4.04213 1.53285 5.32121C1.00303 6.6003 0.86441 8.00776 1.13451 9.36563C1.4046 10.7235 2.07129 11.9708 3.05026 12.9497C4.02922 13.9287 5.2765 14.5954 6.63437 14.8655C7.99224 15.1356 9.3997 14.997 10.6788 14.4672C11.9579 13.9373 13.0511 13.0401 13.8203 11.889C14.5895 10.7378 15 9.38447 15 8C14.9978 6.14417 14.2596 4.36498 12.9473 3.05271C11.635 1.74043 9.85583 1.00222 8 1V1ZM8.875 11.5C8.875 11.7321 8.78281 11.9546 8.61872 12.1187C8.45463 12.2828 8.23207 12.375 8 12.375C7.76794 12.375 7.54538 12.2828 7.38128 12.1187C7.21719 11.9546 7.125 11.7321 7.125 11.5V8.7C7.125 8.46793 7.21719 8.24537 7.38128 8.08128C7.54538 7.91719 7.76794 7.825 8 7.825C8.23207 7.825 8.45463 7.91719 8.61872 8.08128C8.78281 8.24537 8.875 8.46793 8.875 8.7V11.5ZM8 6.6C7.72311 6.6 7.45243 6.51789 7.2222 6.36406C6.99198 6.21022 6.81253 5.99157 6.70657 5.73576C6.60061 5.47994 6.57288 5.19845 6.6269 4.92687C6.68092 4.6553 6.81426 4.40584 7.01005 4.21005C7.20585 4.01426 7.4553 3.88092 7.72688 3.8269C7.99845 3.77288 8.27994 3.80061 8.53576 3.90657C8.79157 4.01253 9.01023 4.19197 9.16406 4.4222C9.31789 4.65243 9.4 4.92311 9.4 5.2C9.4 5.5713 9.2525 5.9274 8.98995 6.18995C8.7274 6.4525 8.3713 6.6 8 6.6Z"
                        fill="#797E82"
                      />
                    </svg>
                  )}
                </p>
                <h3 className="content valid-user">{item.value}</h3>
              </div>
            );
          })}
        </div>
        <Graph />
        <DashFoot />
      </div>
    </Dashboard>
  );
};

export default Balance;

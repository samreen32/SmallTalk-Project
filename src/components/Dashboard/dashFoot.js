import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidNavigation } from "react-icons/bi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const DashFoot = () => {
  const initialTableData = [
    {
      name: "Nauman Ifthikar",
      email: "Nauman@demo.com",
      reports: 2,
      oral: 2,
      index: 1,
    },
    {
      name: "Abdul Sami",
      email: "abdul@demo.com",
      reports: 1,
      oral: 2,
      index: 2,
    },
    {
      name: "Ammar Mughal",
      email: "ammar@demo.com",
      reports: 2,
      oral: 3,
      index: 2,
    },
    {
      name: "Ahmed Ali",
      email: "ahmed@demo.com",
      reports: 3,
      oral: 1,
      index: 2,
    },
    {
      name: "Samreen Kareem",
      email: "samreen@demo.com",
      reports: 2,
      oral: 1,
      index: 1,
    },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [searchedData, setSearchedData] = useState(initialTableData);
  const [deletedRows, setDeletedRows] = useState([]);

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

  const onDeleteRow = (index) => {
    setDeletedRows([...deletedRows, index]);
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    const updatedSearchedData = searchedData.filter((_, i) => i !== index);
    setSearchedData(updatedSearchedData);
  };

  return (
    <div style={{ paddingBottom: "23px" }}>
      <div
        className="dashboard-footer mt-lg-0 mt-3"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="search-area py-2">
          <AiOutlineSearch style={{ fontSize: "1.3rem" }} />
          <input
            type="text"
            className="search-field"
            placeholder="Search by Name/Email"
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
                <td className="py-3">User Name </td>
                <td className="py-3">Email </td>
                <td className="py-3">Reports Taken </td>
                <td className="py-3">Oral Assessment</td>
                <td className="py-3">Predictive Index </td>
                <td className="py-3">Action</td>
              </tr>
              {searchedData.map((item, index) => {
                return (
                  <tr className="fw-bold" key={index}>
                    <td className="py-3">{item.name} </td>
                    <td className="py-3">{item.email}</td>
                    <td className="py-3">{item.reports}</td>
                    <td className="py-3">{item.oral}</td>
                    <td className="py-3">{item.index}</td>
                    <td className="py-3">
                      <button
                        className="del-btn"
                        onClick={() => onDeleteRow(index)}
                      >
                        <AiFillDelete className="del-btn" />
                      </button>
                      <NavLink to="" className="nav-btn">
                        <BiSolidNavigation />
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

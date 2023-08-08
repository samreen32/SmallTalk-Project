// import React, { useState } from "react";
// import arrow from "../assets/img/arrow.png";
// import circle from "../assets/img/circle.png";
// import register from "../assets/img/register.png";
// import line from "../assets/img/line.png";
// import "../App.css";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
//   //   let redirect = useNavigate();

//   // Function to get the CSRF token
//   async function getCSRFToken() {
//     try {
//       const response = await axios.get(
//         "http://192.168.18.74:8000/user/get-csrf-token/"
//       );
//       return response.data.csrftoken;

//     } catch (error) {
//       console.error("Failed to get CSRF token:", error);
//     }
//   }

//   // Function to create a user
//   const handleRegister = async () => {
//     try {
//       const csrfToken = await getCSRFToken();

//       const headers = {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrfToken,
//       };

//       const response = await axios.post(
//         "http://192.168.18.74:8000/user/add-user/",
//         credentials,
//         { headers }
//       );
//       alert("User Created")
//       console.log("User created successfully:", response.data);
//     } catch (error) {
//       console.error("Failed to create user:", error);
//       alert("User not created")
//     }
//   };

//   return (
//     <div className="container my-5">
//       <div
//         className="card mb-3"
//         style={{ width: "100%", maxWidth: "1100px", height: "600px" }}
//       >
//         <div className="row g-0 h-100">
//           {/* Left Side */}
//           <div
//             className="col-md-4 d-flex flex-column align-items-center justify-content-center"
//             style={{
//               backgroundColor: "#00B58B",
//               padding: "40px",
//               position: "relative",
//             }}
//           >
//             <img
//               src={arrow}
//               className="img-fluid rounded-start my-3 mx-3"
//               alt="arrow"
//               style={{ position: "absolute", top: 0, right: 0 }}
//             />
//             <img
//               src={register}
//               className="img-fluid rounded-start my-3 mx-3"
//               alt="logo smalltalk"
//               style={{ position: "absolute", top: 0, left: 0 }}
//             />
//             <div
//               className="d-flex flex-column align-items-center justify-content-center"
//               style={{ height: "100%" }}
//             >
//               <div>
//                 <p className="welcomeBack" style={{ textAlign: "center" }}>
//                   Welcome Back!
//                 </p>
//                 <p className="toStay" style={{ textAlign: "center" }}>
//                   To stay connected with us <br />
//                   please login with your personal info
//                 </p>
//                 <button type="submit" className="signInBtn">
//                   Sign in
//                 </button>
//               </div>
//             </div>
//             <img
//               src={circle}
//               className="img-fluid rounded-start mt-auto"
//               alt="circle"
//               style={{ position: "absolute", bottom: 0, left: 0 }}
//             />
//           </div>

//           {/* Right Side */}
//           <div className="col-md-8 d-flex align-items-center">
//             <div
//               className="card-body d-flex flex-column align-items-center w-100"
//               style={{ textAlign: "center" }}
//             >
//               <h3 className="card-title">Let’s Get Started</h3>
//               <p className="card-text">
//                 Create an account <br /> <img src={line} alt="line" />
//               </p>
//               <div className="container1">
//                 <div className="circle">
//                   <i className="fa fa-facebook" aria-hidden="true"></i>
//                 </div>
//                 <div className="circle">
//                   <i className="fa fa-google-plus" aria-hidden="true"></i>
//                 </div>
//                 <div className="circle">
//                   <i className="fa fa-apple" aria-hidden="true"></i>
//                 </div>
//               </div>
//               <form
//                 className="form-container d-flex flex-column align-items-center w-100"
//                 // onSubmit={handleRegister}
//               >
//                 <div className="mb-2">
//                   <input
//                     type="text"
//                     className="textInput"
//                     placeholder="User Name"
//                     name="name"
//                     value={credentials.name}
//                     onChange={onChange}
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                     type="email"
//                     className="textInput"
//                     placeholder="Email"
//                     name="email"
//                     value={credentials.email}
//                     onChange={onChange}
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                     type="password"
//                     className="textInput"
//                     placeholder="Password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={onChange}
//                     // minLength={5}
//                     // required
//                   />
//                 </div>
//                 <button onClick={handleRegister} className="registerBtn my-4">
//                   Sign up
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

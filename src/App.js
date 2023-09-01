import React from "react";
import AuthProvider from "./context/AuthContext";
import Stack from "./MainStack/Stack";

function App() {
  return (
    <>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </>
  );
}

export default App;

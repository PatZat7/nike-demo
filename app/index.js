import React from "react";

import "app/App.css";
import "../Sass/demo-style.scss";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import CommentList from "components/CommentList";

function App() {
  return (
    <>
      <Header />

      <CommentModal />

      <div className="App-header">
      <CommentList/>
      </div>
    </>
  );
}

export default App;

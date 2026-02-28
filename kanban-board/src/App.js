import React from 'react';
import './App.css';
import Board from "./components/Boards/Board";

function App() {
  return (
<div className="app">
  <div className="layout">
    <div className="sidebar"></div>

    <div className="mainContent">
      <div className="app_navbar">
        <h2>KanbanBoard</h2>
      </div>

      <div className="outerBoard">
        <div className="innerBoard">
          <Board />
          <Board />
          <Board />
          <Board />
        </div>
      </div>
    </div>

  </div>
</div>
  );
}

export default App;

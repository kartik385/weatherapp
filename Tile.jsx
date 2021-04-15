import react, { useState } from "react";

function Tile(props) {
  return (
    <div className="tile">
      <div className="tile-content">{props.content}</div>
      <div className="tile-value">
        {props.value} {props.units}
      </div>
    </div>
  );
}
export default Tile;

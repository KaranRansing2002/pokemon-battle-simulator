import React from "react";

function Stats() {
  return (
    <div>
      <div className="setcol setcol-stats">
        <div className="setrow">
          <label>Stats</label>
          <button className="textbox setstats" name="stats">
            <span className="statrow statrow-head">
              <label></label> <span className="statgraph"></span> <em>EV</em>
            </span>
            <span className="statrow">
              <label>HP</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 39.3111px; background: rgb(86, 125, 54);"
                  ne="0.9427858716895479"
                ></span>
              </span>{" "}
              <em></em>
            </span>
            <span className="statrow">
              <label>Atk</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 26.0417px; background: rgb(125, 106, 54);"
                  ne="0.760455432267136"
                ></span>
              </span>{" "}
              <em></em>
            </span>
            <span className="statrow">
              <label>Def</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 26.1905px; background: rgb(125, 106, 54);"
                  ne="0.1599713350116243"
                ></span>
              </span>{" "}
              <em></em>
            </span>
            <span className="statrow">
              <label>SpA</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 30.6548px; background: rgb(125, 114, 54);"
                  ne="0.435751372277992"
                ></span>
              </span>{" "}
              <em></em>
            </span>
            <span className="statrow">
              <label>SpD</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 29.1667px; background: rgb(125, 111, 54);"
                  ne="0.5836321667250404"
                ></span>
              </span>{" "}
              <em></em>
            </span>
            <span className="statrow">
              <label>Spe</label>{" "}
              <span className="statgraph">
                <span
                  style="width: 14.2857px; background: rgb(125, 82, 54);"
                  ne="0.5328675930004894"
                ></span>
              </span>{" "}
              <em></em>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stats;

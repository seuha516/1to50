import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Ranking.scss";
import Title from "./Title";

const Ranking = ({ history }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const onClick = () => {
    history.push("/");
  };
  const loadList = async () => {
    await axios
      .get("https://one-to-fifty-backend.herokuapp.com/api/ranking/list")
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log("ERROR!", err);
      });
    setLoading(false);
  };
  useEffect(() => {
    loadList();
  }, []);
  return (
    <>
      <div
        className="rankingArea"
        style={{
          justifyContent: loading ? "center" : "space-between",
          height: loading ? "90vh" : String(83 * list.length + 200) + "px",
        }}
      >
        {!loading && (
          <>
            <Title onClick={onClick} pointer={"cursor"} />
            <div className="text">Ranking</div>
          </>
        )}
        {loading ? (
          <div className="rankingLoading">Loading...</div>
        ) : (
          <div className="dataArea">
            {list.map((data, index) => (
              <div key={data._id} className="rankingData">
                <div>{index + 1}</div>
                <div>{data.name}</div>
                <div>{data.score}</div>
                <div>{data.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(Ranking);

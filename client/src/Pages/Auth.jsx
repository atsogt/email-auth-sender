import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../App.css";
import "./Auth.styles.css";

const Authentication = () => {
  let { paramEmail } = useParams();
  const [code, setCode] = useState("");
  const [codeInput, setInput] = useState("");
  const [invalid, setInvalid] = useState(false);
  const email = paramEmail;
  let navigate = useNavigate();
  const [live, setLives] = useState(4);

  const checkCode = () => {
    if (code == codeInput) {
      navigate(`/home`);
    } else {
      alert("Incorrect");
      setInvalid(true);
      setLives(live - 1);
      if (live < 2) {
        navigate(`/`);
      }
    }
  };

  useEffect(() => {
    Axios.post("http://localhost:4004/api/getCode", { paramEmail }).then(
      (res) => {
        setCode(res.data[0].passcode);
      }
    );
  }, [code, codeInput, setInput]);

  return (
    <div className="Container">
      <div className="Form">
        <div className="below-form">
          <h1 id="auth-title">Enter Your 6 digit code</h1>

          <p>We sent the code to your email at: {email}</p>
        </div>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            checkCode();
          }}
        >
          Authenticate
        </button>
        {invalid ? <p>You have {live} attempts</p> : <p></p>}
      </div>
    </div>
  );
};

export default Authentication;

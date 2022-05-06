import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "./Login.styles.css";
import Logo from "./logo.PNG";

const Login = () => {
  const [email, setEmail] = useState("");
  const [validInput, setValidInput] = useState(false);
  let navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    setEmail(input);
  };

  useEffect(() => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }, [email, setEmail]);

  const validateEmail = () => {
    Axios.post("http://localhost:4004/api/insert", { email }).then(
      navigate(`/auth/${email}`)
    );
  };

  return (
    <div className="Container">
      <div className="Form">
        <img src={Logo} id="brand-logo" />
        <div id="brand-title">Email</div>
        <div className="inputs">
          <input onChange={handleOnChange} type="search"></input>
        

        <div>
          {validInput ? (
            <button onClick={validateEmail}>Submit</button>
          ) : (
            <button disabled={!validInput}>Submit</button>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};

export default Login;

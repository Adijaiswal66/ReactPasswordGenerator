import { useCallback, useEffect, useState } from "react";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passworGenerator = useCallback(() => {
    let pass = "";
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) charset += "0123456789";
    if (charAllowed) charset += "!@#$%^&*()_+{}[]|;:,.<>?";

    for (let i = 1; i <= passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      pass += charset.charAt(randomIndex);
    }

    setPassword(pass);
    console.log(pass);
  }, [passwordLength, numberAllowed, charAllowed]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
  };
  useEffect(() => {
    passworGenerator();
  }, [passwordLength, numberAllowed, charAllowed]);

  return (
    <>
      <div className="" style={{backgroundColor:"grey",height:"100vh",marginTop:"-3rem"}} >
        <div
          className="container mt-5 d-flex flex-row flex-wrap"
          style={{
            backgroundColor: "#4c6a83",
            width: "50%",
            borderRadius: "8px",
          }}
        >
          <div className="container d-flex py-4 px-5" id="passwordField">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              readOnly
            />
            <button
              className="btn"
              type="button"
              style={{ backgroundColor: "cyan", borderRadius: "3px" }}
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="container d-flex flex-row justify-content-start text-center input-group form-check py-3">
            {/* <div className="d-fex flex-row"> */}

            <input
              type="range"
              min={6}
              max={20}
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
              className="form-range ms-4 me-2"
              style={{ width: "40%" }}
              id="passwordinput"
            />
            <label
              className="me-4"
              style={{ color: "#decccc" }}
              htmlFor="passwordinput"
            >
              Length: {passwordLength}
            </label>

            <input
              className="form-check-input me-2"
              type="checkbox"
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label
              className="form-check-label me-2"
              style={{ color: "#decccc" }}
              htmlFor="numberInput"
            >
              Numbers
            </label>
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="charInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label
              className="form-check-label"
              style={{ color: "#decccc" }}
              htmlFor="charInput"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

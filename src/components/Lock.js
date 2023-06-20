import { useState } from "react";

export const Lock = (props) => {
  const [password, setpassword] = useState("");
  const [wrong, setWrong] = useState(false);

  const handleChange = (event) => {
    setpassword(event.target.value);
  };

  const handleLock = () => {
    if (password.length > 0) {
      props.id.password = password;
      props.id.Locked = true;
      props.show(false);
      props.selected(null);
    }
  };

  const handleOpen = () => {
    if (props.id.password === password) {
      props.selected(props.id);
      props.show(false);
      setWrong(false);
    } else {
      setWrong(true);
    }
  };

  const handleUnlock = () => {
    if (props.id.password === password) {
      props.id.Locked = undefined;
      props.id.password = "";
      props.show(false);
      props.selected(null);
      setWrong(false);
    } else {
      setWrong(true);
    }
  };

  if (props.id.Locked === undefined) {
    return (
      <div className="container" style={styles.container}>
        <div className="content" style={styles.content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x "
            viewBox="0 0 16 16"
            style={styles.close}
            onClick={() => {
              props.show(false);
              props.isLocked(null);
            }}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <h2 style={styles.header}>Set Password</h2>
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="input">
              Password:{" "}
            </label>
            <input
              style={styles.input}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleLock}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container" style={styles.container}>
        <div className="content" style={styles.content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x "
            viewBox="0 0 16 16"
            style={styles.close}
            onClick={() => {
              props.show(false);
            }}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <h2 style={styles.header}>Enter Password</h2>
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="input">
              Password:{" "}
            </label>
            <input
              style={styles.input}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div style={styles.wrong}>
            {wrong && <p>Enter Right Credentails!!</p>}
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.Button} onClick={handleOpen}>
              Open
            </button>
            <button style={styles.Button} onClick={handleUnlock}>
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  content: {
    width: "450px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "4.2px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "Bold",
    fontFamily: "'Montserrat', sans-serif",
  },
  footer: {
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "20px",
  },
  input: {
    height: "30px",
    width: "60%",
    borderRadius: "2px",
    outline: "none",
    fontFamily: "'Montserrat', sans-serif",
  },
  label: {
    marginRight: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "'Montserrat', sans-serif",
  },
  buttonContainer: {
    gap: "10px",
    marginTop: "4px",
    display: "flex",
    justifyContent: "center",
  },

  button: {
    width: "75px",
    height: "30px",
    border: "3px solid #315cfd",
    borderRadius: "45px",
    transition: "all 0.3s",
    cursor: "pointer",
    background: "white",
    fontSize: "1.2em",
    fontWeight: "550",
    fontFamily: "'Montserrat', sans-serif",
  },
  close: {
    backgroundColor: "#ee5253",
    borderRadius: "5px",
    position: "relative",
    float: "right",
    bottom: "12px",
    left: "12px",
    cursor: "pointer",
  },
  wrong: {
    color: "red",
    display: "flex",
    justifyContent: "center",
    fontWeight: "600",
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: "10px",
  },
  Button: {
    width: "75px",
    height: "30px",
    border: "3px solid #2ecc71",
    borderRadius: "45px",
    transition: "all 0.3s",
    cursor: "pointer",
    background: "white",
    fontSize: "1.1em",
    fontWeight: "550",
    fontFamily: "'Montserrat', sans-serif",
  },
};

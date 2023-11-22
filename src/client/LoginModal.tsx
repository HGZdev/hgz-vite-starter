import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "../_server/queries";
import "./LoginModal.css";

interface Props {
  onClose: (isLoggedIn: boolean) => void;
}

const LoginModal: React.FC<Props> = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      // Handle the error
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error messages
    try {
      const response = await login({variables: {email, password}});
      if (response.data.login.token) {
        localStorage.setItem("token", response.data.login.token);
        onClose(true);
      }
    } catch (err) {
      // Errors are handled in the onError callback, so you may not need this catch block
    }
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close-button" onClick={() => onClose(false)}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

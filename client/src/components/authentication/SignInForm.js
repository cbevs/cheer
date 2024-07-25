import React, { useState } from "react";

import config from "../../config";

import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("");

  const validateInput = (payload) => {
    setErrors({});
    setCredentialsErrors("");
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "The email you entered is invalid!",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "Password is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json();
            return setCredentialsErrors(body.message);
          }
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="sign-in-page">
      <div className="grid-container sign-in-form" onSubmit={onSubmit}>
        <h1 className="font-1 center color-2">Sign In</h1>

        {credentialsErrors ? <p className="callout form-error-2">{credentialsErrors}</p> : null}

        <form>
          <div>
            <label>
              <p>Email</p>
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} required />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                required
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div className="bp-2">
            <input type="submit" className="sign-in-link" value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

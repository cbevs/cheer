import React, { useState } from "react";

import config from "../../config";

import ErrorList from "../layout/ErrorList";
import FormError from "../layout/FormError";
import translateServerErrors from "../../services/translateServerErrors";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    setServerErrors({});
    const { email, password, username, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (validateInput(userPayload)) {
        const response = await fetch("/api/v1/users", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json();
            const newServerErrors = translateServerErrors(body.errors);
            return setServerErrors(newServerErrors);
          }
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        return setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
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
    <div className="reg-page">
      <div className="grid-container reg-form">
        <h1 className="font-1 center color-2">Register</h1>
        <ErrorList errors={serverErrors} />
        <form onSubmit={onSubmit}>
          <div>
            <label>
              <p>Email</p>
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} required />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              <p>Username</p>
              <input type="text" name="username" value={userPayload.username} onChange={onInputChange} required/>
              <FormError error={errors.username} />
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
          <div>
            <label>
              <p>Password Confirmation</p>
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
                required
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div className="bp-2">
            <input type="submit" className="register-link" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import "../styles/LoginRegister.css";
import FormTextInput from "../components/FormTextInput";
import { fieldsTypes } from "../utills/constants";
import FormButton from "../components/FormButton";
import LoginImg from "../assets/login.svg";
import RegisterImg from "../assets/register.svg";

const LoginRegister = () => {
  const [addedClass, setAddedClass] = useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === "signUp") {
      setAddedClass("sign-up-mode");
    } else if (name === "signIn") {
      setAddedClass("sign-in-mode");
    }
  };

  return (
    <div className={`main-container ${addedClass}`}>
      <div className="form-container">
        <div className="signin-signup">
          <Grid className="signin" container direction="column" spacing={2}>
            <Grid item>
              <p className="text-gray-600 font-extrabold text-4xl text-center pb-5">
                Sign in
              </p>
            </Grid>
            <Grid item>
              <FormTextInput
                name={"username"}
                placeholder={"Username"}
                borderRadius={55}
                icon={<PersonRoundedIcon />}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"Password"}
                placeholder={"Password"}
                borderRadius={55}
                icon={<LockRoundedIcon />}
                type={fieldsTypes.password}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <Typography className="text-center pt-3">
                Forgot Password?
              </Typography>
            </Grid>
            <Grid item>
              <FormButton
                name="login"
                label="LOGIN"
                borderRadius={55}
                fullWidth
                onClick={() => {}}
              />
            </Grid>
          </Grid>
          <Grid className="signup" container direction="column" spacing={2}>
            <Grid item>
              <p className="text-gray-600 font-extrabold text-4xl text-center pb-5">
                Sign up
              </p>
            </Grid>
            <Grid item>
              <FormTextInput
                name={"username"}
                placeholder={"Username"}
                borderRadius={55}
                icon={<PersonRoundedIcon />}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"email"}
                placeholder={"Email"}
                borderRadius={55}
                icon={<EmailRoundedIcon />}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"Password"}
                placeholder={"Password"}
                borderRadius={55}
                icon={<LockRoundedIcon />}
                type={fieldsTypes.password}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <Typography className="text-center pt-3">
                Forgot Password?
              </Typography>
            </Grid>
            <Grid item>
              <FormButton
                name="register"
                label="REGISTER"
                borderRadius={55}
                fullWidth
                onClick={handleClick}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="panel-container">
        <div className="panel left-panel">
          <div className="content">
            <p className="text-white font-bold text-xl pb-1">New here ?</p>
            <p className="text-white text-lg pb-5">
              Sign up and discover a great amount of new opportunities!
            </p>
            <FormButton
              name="signUp"
              label="Sign up"
              variant="outlined"
              borderColor="#fff"
              textColor="#fff"
              borderRadius={55}
              onClick={handleClick}
            />
          </div>
          <img src={LoginImg} className="image" alt="log" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <p className="text-white font-bold text-xl pb-1">One of us ?</p>
            <p className="text-white text-lg pb-5">
              Sign up and discover a great amount of new opportunities!
            </p>
            <FormButton
              name="signIn"
              label="Sign in"
              variant="outlined"
              borderColor="#fff"
              textColor="#fff"
              borderRadius={55}
              onClick={handleClick}
            />
          </div>
          <img src={RegisterImg} className="image" alt="log" />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

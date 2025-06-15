import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import BrandingWatermarkRoundedIcon from "@mui/icons-material/BrandingWatermarkRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import "../styles/LoginRegister.css";
import FormTextInput from "../components/FormTextInput";
import { fieldsTypes } from "../utills/constants";
import FormButton from "../components/FormButton";
import LoginImg from "../assets/login.svg";
import RegisterImg from "../assets/register.svg";

const emptyLoginDetails = {
  userName: "",
  password: "",
};

const emptyRegistrationDetails = {
  userName: "",
  firstName: "",
  lastName: "",
  contactNo: "",
  email: "",
  nicNumber: "",
  password: "",
  confirmPassword: "",
};

const userValidationIcons = {
  passed: { icon: <CheckCircleRoundedIcon />, color: "rgba(0, 150, 0, 0.5)" },
  failed: { icon: <CancelRoundedIcon />, color: "rgba(200, 0, 0, 0.5)" },
  default: undefined,
};

const LoginRegister = () => {
  const [addedClass, setAddedClass] = useState<string>("");
  const [loginDetails, setLoginDetails] = useState(emptyLoginDetails);
  const [registrationDetails, setRegistrationDetails] = useState(
    emptyRegistrationDetails
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === "signUp") {
      setAddedClass("sign-up-mode");
      setLoginDetails(emptyLoginDetails);
      setRegistrationDetails(emptyRegistrationDetails);
    } else if (name === "signIn") {
      setAddedClass("sign-in-mode");
      setLoginDetails(emptyLoginDetails);
      setRegistrationDetails(emptyRegistrationDetails);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    state: string
  ) => {
    const { name, value } = event.target;

    if (state === "login") {
      setLoginDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }

    if (state === "register") {
      setRegistrationDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    console.log("Test... loginDetails", loginDetails);
  }, [loginDetails]);

  useEffect(() => {
    console.log("Test... registrationDetails", registrationDetails);
  }, [registrationDetails]);

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
                name={"userName"}
                placeholder={"Username"}
                borderRadius={55}
                icon={<PersonRoundedIcon />}
                isLoading={false}
                endIcon={userValidationIcons.default}
                onChange={(e) => handleChange(e, "login")}
                value={loginDetails.userName || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"password"}
                placeholder={"Password"}
                borderRadius={55}
                icon={<LockRoundedIcon />}
                type={fieldsTypes.password}
                onChange={(e) => handleChange(e, "login")}
                value={loginDetails.password || ""}
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
                name={"userName"}
                placeholder={"Username"}
                borderRadius={55}
                icon={<PersonRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.userName || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"firstName"}
                placeholder={"Firstname"}
                borderRadius={55}
                icon={<AssignmentIndRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.firstName || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"lastName"}
                placeholder={"Lastname"}
                borderRadius={55}
                icon={<AssignmentIndRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.lastName || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"contactNo"}
                placeholder={"070 123 4567"}
                borderRadius={55}
                icon={<PhoneAndroidRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.contactNo || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"email"}
                placeholder={"Email"}
                borderRadius={55}
                icon={<EmailRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.email || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"nicNumber"}
                placeholder={"Nic Number"}
                borderRadius={55}
                icon={<BrandingWatermarkRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.nicNumber || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"password"}
                placeholder={"Password"}
                borderRadius={55}
                icon={<LockRoundedIcon />}
                type={fieldsTypes.password}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.password || ""}
              />
            </Grid>
            <Grid item>
              <FormTextInput
                name={"confirmPassword"}
                placeholder={"Confirm Password"}
                borderRadius={55}
                icon={<LockRoundedIcon />}
                type={fieldsTypes.password}
                onChange={(e) => handleChange(e, "register")}
                value={registrationDetails.confirmPassword || ""}
              />
            </Grid>
            <Grid item>
              <FormButton
                className="mt-6"
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
              excepturi odit quasi dicta maxime doloribus exercitationem. Quas
              aut ratione, est quidem amet natus.
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

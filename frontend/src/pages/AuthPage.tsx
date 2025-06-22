import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Alert from "@mui/material/Alert";

import "../styles/AuthStyles.css";
import FormTextInput from "../components/FormTextInput";
import { fieldsTypes } from "../utils/constants";
import FormButton from "../components/FormButton";
import LoginImg from "../assets/login.svg";
import RegisterImg from "../assets/register.svg";
import {
  emptyLoginDetails,
  emptyLoginErrors,
  emptyRegistrationDetails,
  emptyRegistrationErrors,
} from "../utils/utils";
import {
  validateLoginDetails,
  validateRegistrationDetails,
} from "../validations/AuthValidations";
import axios from "axios";
import { userContext } from "../context/ContextProvider";
import { loginUser, registerUser } from "../services/authService";

type ValidationStatus = "passed" | "failed" | "default";

const userValidationIcons: Record<
  ValidationStatus,
  { icon: JSX.Element; color: string } | undefined
> = {
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
  const [loginError, setLoginError] = useState(emptyLoginErrors);
  const [registrationError, setRegistrationError] = useState(
    emptyRegistrationErrors
  );
  const [isUsernameLoading, setIsUsernameLoading] = useState<boolean>(false);
  const [userNameValidationMsg, setUserNameValidationMsg] =
    useState<ValidationStatus>("default");

  const { setRole, setAuthenticated } = useContext(userContext);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === "signUp") {
      setAddedClass("sign-up-mode");
      setLoginDetails(emptyLoginDetails);
      setRegistrationDetails(emptyRegistrationDetails);
      setLoginError(emptyLoginErrors);
      setRegistrationError(emptyRegistrationErrors);
      setUserNameValidationMsg("default");
    } else if (name === "signIn") {
      setAddedClass("sign-in-mode");
      setLoginDetails(emptyLoginDetails);
      setRegistrationDetails(emptyRegistrationDetails);
      setLoginError(emptyLoginErrors);
      setRegistrationError(emptyRegistrationErrors);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { name } = event.target as HTMLButtonElement;
    if (name === "login") {
      const errors = validateLoginDetails(loginDetails);

      if (Object.keys(errors).length === 0) {
        try {
          const response = await loginUser(loginDetails);

          if (response.status === 200) {
            const { role } = response.data;

            setRole(role);
            setAuthenticated(true);
            if (role === "mainAdmin") {
              navigate("/main-admin");
            } else if (role === "regAdmin") {
              navigate("/regional-admin");
            } else if (role === "user") {
              navigate("/user");
            } else if (role === "donor") {
              navigate("/donator");
            }
          } else {
            const { message } = response.data;
            setLoginError((prev) => ({
              ...prev,
              main: message,
            }));
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const { errors } = error.response.data;
            setLoginError((prev) => ({
              ...prev,
              ...errors,
            }));
          } else {
            setLoginError((prev) => ({
              ...prev,
              main: "Unexpected error occured!",
            }));
          }
        }
      } else {
        setLoginError({
          ...emptyLoginErrors,
          ...errors,
        });
      }
    } else if (name === "register") {
      const errors = validateRegistrationDetails(registrationDetails);

      if (Object.keys(errors).length === 0) {
        try {
          const response = await registerUser(registrationDetails);

          if (response.status === 200) {
            setAddedClass("sign-in-mode");
            setRegistrationError(emptyRegistrationErrors);
            setRegistrationDetails(emptyRegistrationDetails);
          } else {
            const { message } = response.data;
            setRegistrationError((prev) => ({
              ...prev,
              main: message,
            }));
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const { errors } = error.response.data;
            setRegistrationError((prev) => ({
              ...prev,
              ...errors,
            }));
          } else {
            setRegistrationError((prev) => ({
              ...prev,
              main: "Unexpected error occured!",
            }));
          }
        }
      } else {
        setRegistrationError({
          ...emptyRegistrationErrors,
          ...errors,
        });
      }
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

      setLoginError((prev) => ({
        ...prev,
        [name]: "",
        main: "",
      }));
    }

    if (state === "register") {
      setRegistrationDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));

      setRegistrationError((prev) => ({
        ...prev,
        [name]: "",
        main: "",
      }));
    }
  };

  const handleOnBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const userName = event.target.value.trim();

    if (!userName) {
      setUserNameValidationMsg("default");
      return;
    }

    setIsUsernameLoading(true);

    try {
      const url = "http://localhost:3000/api/auth/username-check";
      const response = await axios.post(url, { userName });

      setUserNameValidationMsg(response.data?.message || "default");
    } catch (error) {
      const fallbackMsg = "default";

      if (axios.isAxiosError(error) && error.response) {
        const serverMsg = error.response.data?.message;
        setUserNameValidationMsg(serverMsg || fallbackMsg);
      } else {
        setUserNameValidationMsg(fallbackMsg);
      }
    } finally {
      setIsUsernameLoading(false);
    }
  };

  return (
    <div className={`main-container ${addedClass}`}>
      <div className="form-container">
        <div className="signin-signup">
          <Grid className="signin" container direction="column" spacing={2}>
            {loginError.main && (
              <Grid item>
                <Alert severity="error" className="mb-4">
                  {loginError.main}
                </Alert>
              </Grid>
            )}
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
                onChange={(e) => handleChange(e, "login")}
                value={loginDetails.userName || ""}
                error={loginError.userName || ""}
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
                error={loginError.password || ""}
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
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>
          <Grid className="signup" container direction="column" spacing={2}>
            {registrationError.main && (
              <Grid item>
                <Alert severity="error" className="mb-4">
                  {registrationError.main}
                </Alert>
              </Grid>
            )}
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
                isLoading={isUsernameLoading}
                endIcon={userValidationIcons[userNameValidationMsg]}
                icon={<PersonRoundedIcon />}
                onChange={(e) => handleChange(e, "register")}
                onBlur={handleOnBlur}
                value={registrationDetails.userName || ""}
                error={registrationError.userName || ""}
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
                error={registrationError.firstName || ""}
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
                error={registrationError.lastName || ""}
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
                error={registrationError.contactNo || ""}
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
                error={registrationError.email || ""}
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
                error={registrationError.nicNumber || ""}
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
                error={registrationError.password || ""}
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
                error={registrationError.confirmPassword || ""}
              />
            </Grid>
            <Grid item>
              <FormButton
                className="mt-6"
                name="register"
                label="REGISTER"
                borderRadius={55}
                fullWidth
                onClick={handleSubmit}
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

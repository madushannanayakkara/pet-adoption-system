import type { ReactNode, ChangeEvent } from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const FormTextInput = (props: {
  classAddOns?: string;
  name?: string;
  label?: string;
  size?: "small" | "medium";
  placeholder?: string;
  value?: string | number;
  error?: string;
  variant?: "filled" | "outlined";
  borderRadius?: number;
  type?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  endIcon?: { icon: ReactNode; color?: string };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const borderRadiusValue = props.borderRadius
    ? `${props.borderRadius}px`
    : undefined;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="baseline"
      spacing={0.5}
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TextField
          fullWidth
          className={"textBox width-100 " + props.classAddOns}
          name={props.name}
          label={props.label}
          value={props.value}
          type={props.type}
          onChange={props.onChange}
          size={props.size || "small"}
          placeholder={props.placeholder ? props.placeholder : ""}
          variant={props.variant || "filled"}
          error={!!props.error}
          helperText={props.error}
          InputProps={{
            startAdornment: props.icon && (
              <InputAdornment
                className="here"
                position="start"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgba(0, 0, 0, 0.25)",
                  marginTop: "0px !important",
                  marginX: "8px !important",
                  "& svg": {
                    fontSize: props.size === "medium" ? 21 : 19,
                  },
                }}
              >
                {props.icon}
              </InputAdornment>
            ),
            endAdornment: props.endIcon && (
              <InputAdornment
                position="end"
                sx={{
                  color: props.endIcon.color || "rgba(0, 0, 0, 0.25)",
                  fontSize: props.size === "medium" ? "1.5rem" : "1.2rem",
                  paddingRight: "2px",
                }}
              >
                {props.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  props.endIcon.icon
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            "& input:-webkit-autofill": {
              borderRadius: borderRadiusValue,
            },
            "& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInputBase-root":
              {
                borderRadius: borderRadiusValue,
              },
            ...(props.borderRadius && {
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root.Mui-focused:after": {
                borderBottom: "none",
              },
              "& input": {
                padding:
                  props.size === "medium"
                    ? props.icon
                      ? "17px 12px 17px 4px"
                      : "17px 12px"
                    : props.icon
                    ? "13px 12px 13px 4px"
                    : "13px 12px",
                alignItems: "center",
              },
            }),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FormTextInput;

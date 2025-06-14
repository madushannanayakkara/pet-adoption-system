import { Button } from "@mui/material";

export interface FormButtonProps {
  name?: string;
  label?: string;
  borderRadius?: number;
  fullWidth?: boolean;
  variant?: "contained" | "outlined";
  borderColor?: string;
  textColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Adjust brightness: positive = lighter, negative = darker
const adjustColor = (color: string, amount: number): string => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
};

const FormButton = (props: FormButtonProps) => {
  const borderRadiusValue = props.borderRadius
    ? `${props.borderRadius}px`
    : undefined;

  const hoverColor = props.textColor
    ? adjustColor(props.textColor, -18)
    : undefined;
  const hoverBorderColor = props.borderColor
    ? adjustColor(props.borderColor, -18)
    : undefined;

  return (
    <div>
      <Button
        fullWidth={props.fullWidth || false}
        name={props.name}
        className="btn-info"
        variant={props.variant || "contained"}
        onClick={props.onClick}
        sx={{
          borderRadius: borderRadiusValue,
          padding: "10px 24px",
          textTransform: "none",
          color: props.textColor,
          ...(props.variant === "outlined" && props.borderColor
            ? { borderColor: props.borderColor }
            : {}),
          "&:hover": {
            ...(props.textColor ? { color: hoverColor } : {}),
            ...(props.variant === "outlined" && props.borderColor
              ? { borderColor: hoverBorderColor }
              : {}),
          },
        }}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default FormButton;

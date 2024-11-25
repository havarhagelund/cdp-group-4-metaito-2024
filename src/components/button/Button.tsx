import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary";
  invisible?: boolean;
}

const Button = ({
  text,
  onClick,
  disabled,
  icon,
  iconPosition = "right",
  variant = "primary",
  invisible = false,
}: ButtonProps) => {
  return (
    <>
      {variant === "primary" && (
        <button
          className={`flex items-center justify-center gap-2 p-3 rounded-md ${
            disabled
              ? "cursor-default bg-gray-400"
              : "cursor-pointer bg-gray-800"
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          {icon && iconPosition === "left" && icon}
          <p className="text-xl font-medium text-gray-100">{text}</p>
          {icon && iconPosition === "right" && icon}
        </button>
      )}
      {variant === "secondary" && (
        <button
          className={`flex items-center justify-center gap-2 p-3 rounded-md ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } ${invisible ? "invisible" : "visible"}`}
          onClick={onClick}
          disabled={disabled}
        >
          {icon && iconPosition === "left" && icon}
          <p className="text-xl font-medium text-gray-800">{text}</p>
          {icon && iconPosition === "right" && icon}
        </button>
      )}
    </>
  );
};

export default Button;

import clsx from "clsx";

export type IconSize = "14" | "16" | "20" | "24" | "32" | "40" | "48";
export type IconProps = {
  children?: React.ReactNode;
  className?: string;
  size?: IconSize;
  color?: string;
};
export function Icon({ size = "16", children, className }: IconProps) {
  return (
    <svg
      className={clsx(className, "icon", `icon-size-${size}`)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
export const IconArrowRight = ({
  color = "currentColor",
  ...props
}: IconProps) => (
  <Icon {...props}>
    <path
      d="M3.83334 8.00004H13.1667M13.1667 8.00004L8.50001 3.33337M13.1667 8.00004L8.50001 12.6667"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const IconArrowLeft = ({
  color = "currentColor",
  ...props
}: IconProps) => (
  <Icon {...props}>
    <path
      d="M12.1667 8H2.83334M2.83334 8L7.5 12.6667M2.83334 8L7.5 3.33337"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

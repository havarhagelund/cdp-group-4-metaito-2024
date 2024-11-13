import { ReactNode } from "react";

interface ButtonProps {
    text: string,
    onClick: () => void,
    disabled: boolean,
    icon?: ReactNode,
    iconPosition?: "left" | "right",
    variant?: "primary" | "secondary",
}

const Button = ({ text, onClick, disabled, icon, iconPosition = "right", variant = "primary" }: ButtonProps) => {
    return (
        <>
            {variant === "primary" && (


                <button
                    className={`${disabled ? "cursor-not-allowed bg-[#A0A0A0]" : "cursor-pointer bg-[#2c2c2c]"} `}
                    onClick={onClick}
                    disabled={disabled}
                    style={{
                        display: 'flex',
                        padding: '.75rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '.5rem',
                        borderRadius: '.5rem',
                        //border: '.06rem solid #2c2c2c',
                        //backgroundColor: disabled ? '#909090': '#2c2c2c',
                    }}
                >
                    {icon && iconPosition === "left" && icon}
                    <p
                        className="text-xl font-medium"
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: '500',
                            color: '#f5f5f5',
                        }}
                    >
                        {text}
                    </p>
                    {icon && iconPosition === "right" && icon}
                </button>
            )}
            {variant === "secondary" && (
                <button
                    className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={onClick}
                    disabled={disabled}
                    style={{
                        display: 'flex',
                        padding: '.75rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '.5rem',
                        borderRadius: '.5rem',
                    }}
                >
                    {icon && iconPosition === "left" && icon}
                    <p
                        className="text-xl font-medium"
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: '500',
                            color: '#303030',
                        }}
                    >
                        {text}
                    </p>
                    {icon && iconPosition === "right" && icon}
                </button>
            )}
        </>
    )
}

export default Button;
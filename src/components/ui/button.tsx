import React from "react";

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode; // Text to display on the button
  loading?: boolean; // Loading state for the button
  variant?: "primary" | "secondary" | "danger"; // Button variants
};

export function Button({
  children,
  loading = false,
  variant = "primary",
  disabled,
  ...props
}: TButtonProps) {
  // Define button styles based on the variant
  const baseStyle = "px-4 py-2 rounded font-medium transition-all duration-200";
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${(loading || disabled) ? "opacity-50 cursor-not-allowed" : ""
        }`}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
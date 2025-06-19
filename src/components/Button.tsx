type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  variant: "blue" | "red" | "green";
};

export default function Button({
  variant = "green",
  type = "button",
  children,
  className,
  ...props
}: ButtonProps) {
  const buttonVariants = {
    green: "bg-green-700",
    red: "bg-red-700",
    blue: "bg-blue-700",
  };
  return (
    <button
      type={type}
      className={`px-6 py-4  rounded-xl text-md cursor-pointer hover:opacity-90 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

export default function Input({ type = "text", label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        {...props}
        className="px-4 py-2 border border-zinc-500 bg-zinc-900 rounded-lg"
      />
    </div>
  );
}

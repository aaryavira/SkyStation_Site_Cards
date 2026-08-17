import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({
  theme,
  onToggle,
}) {
  const isLight = theme === "light";

  return (
    <button
      className={`theme-toggle ${
        isLight ? "is-light" : ""
      }`}
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${
        isLight ? "dark" : "light"
      } mode`}
      onClick={onToggle}
    >
      <span className="theme-toggle-knob">
        {isLight ? (
          <Sun size={15} />
        ) : (
          <Moon size={15} />
        )}
      </span>
    </button>
  );
}
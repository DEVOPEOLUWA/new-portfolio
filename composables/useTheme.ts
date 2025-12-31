// composables/useTheme.ts
export const useTheme = () => {
  const isDark = useState("theme", () => true);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
      updateDOM();
    }
  };

  const initTheme = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) {
        isDark.value = saved === "dark";
      } else {
        isDark.value = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }
      updateDOM();
    }
  };

  const updateDOM = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  return { isDark, toggleTheme, initTheme };
};

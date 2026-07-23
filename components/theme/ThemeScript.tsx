const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem("amanah-theme");
    var theme = stored === "light" || stored === "dark" || stored === "obsidian"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}

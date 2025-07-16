export type Route = "home" | "terms" | "privacy";

export const getCurrentRoute = (): Route => {
  const hash = window.location.hash.replace("#", "");
  switch (hash) {
    case "terms":
      return "terms";
    case "privacy":
      return "privacy";
    default:
      return "home";
  }
};

export const navigateTo = (route: Route) => {
  window.location.hash = `#${route}`;
};

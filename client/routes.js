import attendPage from "./pages/attendPage";
import homePage from "./pages/homePage";

const routes = {
  "/": homePage,
  "/attend": attendPage,
};

window.addEventListener("popstate", () => {
  handleRouteChange();
});

function handleRouteChange() {
  const currentPath = window.location.pathname;
  const routeHandler = routes[currentPath];

  if (routeHandler) {
    routeHandler();
  } else {
    console.error("Route not found:", currentPath);
  }
}

handleRouteChange();

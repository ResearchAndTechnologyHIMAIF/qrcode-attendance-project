import attendPage from "./pages/attendPage";
import homePage from "./pages/homePage";

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/attend",
    component: attendPage,
  },
];

window.addEventListener("popstate", () => {
  route();
});

function route() {
  const currentPath = window.location.pathname;
  const matchedRoute = routes.find((route) => route.path === currentPath);

  if (matchedRoute) {
    document.getElementById("content").innerHTML = matchedRoute.component();
  }
}

route();

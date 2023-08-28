import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Companies from "views/examples/Companies.js";
import Forms from "views/examples/Forms.js";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/companies",
    name: "Icidentes",
    icon: "ni ni-briefcase-24 text-blue",
    component: <Companies />,
    layout: "/admin",
  },
  {
    path: "/forms",
    name: "Formulário",
    icon: "ni ni-bullet-list-67 text-primary",
    component: <Forms />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Configurações",
    icon: "ni ni-single-02 text-blue",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Sair",
    icon: "ni ni-user-run text-blue",
    component: <Profile />,
    layout: "/admin",
  }
];
export default routes;

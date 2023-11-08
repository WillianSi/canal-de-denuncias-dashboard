import Index from "views/Index.js";
import Profile from "views/profile/Profile.js";
import Companies from "views/complaints/Companies.js";
import Forms from "views/questions/Forms.js";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-default",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/companies",
    name: "Icidentes",
    icon: "ni ni-briefcase-24 text-default",
    component: <Companies />,
    layout: "/admin",
  },
  {
    path: "/forms",
    name: "Formulário",
    icon: "ni ni-bullet-list-67 text-default",
    component: <Forms />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Configurações",
    icon: "ni ni-single-02 text-default",
    component: <Profile />,
    layout: "/admin",
  }
];
export default routes;

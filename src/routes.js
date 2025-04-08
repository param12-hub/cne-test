import Index from "views/Index.js";
import Requests from "components/Requests/Request";
import Quotes from "components/Quotes/Quotes";
import Messages from "components/Messages/Messages";
import Invoices from "components/Invoices/Invoices";
import Users from "components/Users/Users";
import Profile from "components/Profile/Profile";
import HelpSupport from "components/HelpSupport/HelpSupport";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt text-primary mr-3", // Font Awesome dashboard icon with color
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/requests",
    name: "Requests",
    icon: "fas fa-inbox text-primary mr-3", // Updated to inbox icon for requests
    component: <Requests />,
    layout: "/admin",
  },
  {
    path: "/quotes",
    name: "Quotes",
    icon: "fas fa-comment-dollar text-primary mr-3", // Font Awesome comment-dollar icon for quotes
    component: <Quotes />,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Messages",
    icon: "fas fa-envelope text-primary mr-3", // Font Awesome envelope icon for messages
    component: <Messages />,
    layout: "/admin",
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "fas fa-file-invoice-dollar text-primary mr-3", // Font Awesome file-invoice-dollar icon for invoices
    component: <Invoices />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "fas fa-users-cog text-primary mr-3", // Updated to users-cog icon for users
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "fas fa-user-circle text-primary mr-3", // Font Awesome user-circle icon for profile
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/help&support",
    name: "Help & Support",
    icon: "fas fa-question-circle text-primary mr-3", // Font Awesome question-circle icon for help & support
    component: <HelpSupport />,
    layout: "/admin",
  },
];

export default routes;

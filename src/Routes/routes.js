import React from "react";
import { Navigate } from "react-router-dom";

// DashBoard
import Dashboard from "../Pages/Dashboard/Index";

// Calendar
import Calendar from "../Pages/Calendar/index";

// Chat
import Chat from "../Pages/Chat/Chat";

// Email
import Inbox from "../Pages/Email/Inbox";
import ReadEmail from "../Pages/Email/ReadEmail";

// Ecommerce
import AddProduct from "../Pages/Ecommerce/AddProduct";
import Cart from "../Pages/Ecommerce/Cart";
import Checkout from "../Pages/Ecommerce/Checkout";
import Customers from "../Pages/Ecommerce/EcommerceCustomer/Customers";
import Orders from "../Pages/Ecommerce/EcommerceOrder/Orders";
import ProductDetail from "../Pages/Ecommerce/ProductDetail";
import Product from "../Pages/Ecommerce/Products";
import Shops from "../Pages/Ecommerce/Shops";

// Invoices
import InvoicesDetail from "../Pages/Invoices/InvoiceDetails";
import InvoicesList from "../Pages/Invoices/InvoicesList";

// Contact
import UserGrid from "../Pages/Contacts/UserGrid";
import UserList from "../Pages/Contacts/UserList";
import ContactUserProfile from "../Pages/Contacts/UserProfile";

// UiElememnt
import UiAlerts from "../Pages/UIElements/UiAlerts";
import UiButtons from "../Pages/UIElements/UiButtons";
import UiCards from "../Pages/UIElements/UiCards";
import UiCarousel from "../Pages/UIElements/UiCarousel";
import UiDropdowns from "../Pages/UIElements/UiDropdowns";
import UiGrid from "../Pages/UIElements/UiGrid";
import UiImages from "../Pages/UIElements/UiImages";
import UiModals from "../Pages/UIElements/UiModals";
import UiOffcanvas from "../Pages/UIElements/UiOffcanvas";
import UiPlaceholders from "../Pages/UIElements/UiPlaceholders";
import UiProgressBars from "../Pages/UIElements/UiProgressBars";
import UiTabs from "../Pages/UIElements/UiTabs&Accordions";
import UiTypography from "../Pages/UIElements/UiTypography";
import UiVideo from "../Pages/UIElements/UiVideo";
import UiGeneral from "../Pages/UIElements/UiGeneral";
import UiColors from "../Pages/UIElements/UiColors";

// Extended Element
import ExLightbox from "../Pages/ExtendedElement/ExLightbox";
import ExRangSlider from "../Pages/ExtendedElement/ExRangeSlider";
import ExRating from "../Pages/ExtendedElement/ExRating";
import ExNotification from "../Pages/ExtendedElement/ExNotification";

// Forms
import BasicElements from "../Pages/Forms/BasicElements";
import Validation from "../Pages/Forms/Validation";
import AdvancedPlugins from "../Pages/Forms/AdvancedPlugins";
import Editors from "../Pages/Forms/Editors";
import FileUpload from "../Pages/Forms/FileUpload";
import Wizard from "../Pages/Forms/Wizard";
import Mask from "../Pages/Forms/Mask";

// Tables
import BootstrapBasic from "../Pages/Tables/BootstrapBasic";
import AdvanceTable from "../Pages/Tables/AdvanceTable";

// Charts
import ApexCharts from "../Pages/Charts/ApexCharts";
import ChartjsCharts from "../Pages/Charts/Chartjs";

// Icons
import FeatherIcons from "../Pages/Icons/Feathericon";
import BoxIcons from "../Pages/Icons/Boxicons";
import MaterialDesignIcons from "../Pages/Icons/MaterialDesign";
import DripIcons from "../Pages/Icons/Dripicons";
import FontAwesomeIcons from "../Pages/Icons/FontAwesome";

// Maps
import GoogleMaps from "../Pages/Maps/GoogleMaps";
import VectorMaps from "../Pages/Maps/VectorMaps";
import LeafletMaps from "../Pages/Maps/LeafletMaps";

// Inner Authentication Pages
import InnerLogin from "../Pages/InnerAuthPages/login";
import InnerRegister from "../Pages/InnerAuthPages/Register";
import RecoverPassword from "../Pages/InnerAuthPages/RecoverPassword";
import LockScreen from "../Pages/InnerAuthPages/LockScreen";
import InnerLogout from "../Pages/InnerAuthPages/Logout";
import ConfirmMail from "../Pages/InnerAuthPages/ConfirmMail";
import EmailVerification from "../Pages/InnerAuthPages/EmailVerification";
import TwoStepVerification from "../Pages/InnerAuthPages/TwoStepVerification";

// Utility Pages
import StarterPage from "../Pages/Utility/pages-starter";
import MaintenancePage from "../Pages/Utility/pages-maintenance";
import ComingSoonPage from "../Pages/Utility/pages-comingsoon";
import TimelinePage from "../Pages/Utility/pages-timeline";
import FaqsPage from "../Pages/Utility/pages-faqs";
import PricingPage from "../Pages/Utility/pages-pricing";
import Error404 from "../Pages/Utility/pages-404";
import Error500 from "../Pages/Utility/pages-500";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";
import Users from "../Pages/Users";
import Transaction from "../Pages/Transaction";

const authProtectedRoutes = [
  // dashboard
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/users", component: <Users /> },
  { path: "/transaction", component: <Transaction /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // Calendar
  { path: "/apps-calendar", component: <Calendar /> },

  // Chat
  { path: "/apps-chat", component: <Chat /> },

  // Email
  { path: "/email-inbox", component: <Inbox /> },
  { path: "/email-read", component: <ReadEmail /> },

  // Ecommerce
  { path: "/ecommerce-product-detail", component: <ProductDetail /> },
  { path: "/ecommerce-products", component: <Product /> },
  { path: "/ecommerce-orders", component: <Orders /> },
  { path: "/ecommerce-customers", component: <Customers /> },
  { path: "/ecommerce-cart", component: <Cart /> },
  { path: "/ecommerce-checkout", component: <Checkout /> },
  { path: "/ecommerce-shops", component: <Shops /> },
  { path: "/ecommerce-add-product", component: <AddProduct /> },

  // Invoices
  { path: "/invoices-detail", component: <InvoicesDetail /> },
  { path: "/invoices-list", component: <InvoicesList /> },

  // Contact
  { path: "/contacts-grid", component: <UserGrid /> },
  { path: "/contacts-list", component: <UserList /> },
  { path: "/contacts-profile", component: <ContactUserProfile /> },

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  { path: "/pages-timeline", component: <TimelinePage /> },
  { path: "/pages-faqs", component: <FaqsPage /> },
  { path: "/pages-pricing", component: <PricingPage /> },

  // UiElement
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdowns /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-progressbars", component: <UiProgressBars /> },
  { path: "/ui-tabs-accordions", component: <UiTabs /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-colors", component: <UiColors /> },

  // Extended Element
  { path: "/extended-lightbox", component: <ExLightbox /> },
  { path: "/extended-rangeslider", component: <ExRangSlider /> },
  { path: "/extended-rating", component: <ExRating /> },
  { path: "/extended-notifications", component: <ExNotification /> },

  // Forms
  { path: "/form-elements", component: <BasicElements /> },
  { path: "/form-validation", component: <Validation /> },
  { path: "/form-advanced", component: <AdvancedPlugins /> },
  { path: "/form-editors", component: <Editors /> },
  { path: "/form-uploads", component: <FileUpload /> },
  { path: "/form-wizard", component: <Wizard /> },
  { path: "/form-mask", component: <Mask /> },

  // Tables
  { path: "/tables-basic", component: <BootstrapBasic /> },
  { path: "/tables-advanced", component: <AdvanceTable /> },

  // Charts
  { path: "/charts-apex", component: <ApexCharts /> },
  { path: "/charts-chartjs", component: <ChartjsCharts /> },

  // Icons
  { path: "/icons-feather", component: <FeatherIcons /> },
  { path: "/icons-boxicons", component: <BoxIcons /> },
  { path: "/icons-materialdesign", component: <MaterialDesignIcons /> },
  { path: "/icons-dripicons", component: <DripIcons /> },
  { path: "/icons-fontawesome", component: <FontAwesomeIcons /> },

  // Maps
  { path: "/maps-google", component: <GoogleMaps /> },
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-leaflet", component: <LeafletMaps /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Inner Auth Pages
  { path: "/auth-login", component: <InnerLogin /> },
  { path: "/auth-register", component: <InnerRegister /> },
  { path: "/auth-recoverpw", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-logout", component: <InnerLogout /> },
  { path: "/auth-confirm-mail", component: <ConfirmMail /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-two-step-verification", component: <TwoStepVerification /> },

  // Utility Pages
  { path: "/pages-maintenance", component: <MaintenancePage /> },
  { path: "/pages-comingsoon", component: <ComingSoonPage /> },
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };

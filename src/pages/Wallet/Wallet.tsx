// import MagicProvider from "@/components/magic/MagicProvider";
// import { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "@/components/magic/Login";
// // import Dashboard from "@/components/magic/Dashboard";
// import Google from "@/components/magic/auth/Google";
// // import MagicDashboardRedirect from "@/components/magic/MagicDashboardRedirect";

// export default function Wallet() {
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     setToken(localStorage.getItem("token") ?? "");
//   }, [setToken]);

//   return (
//     <MagicProvider>
//       <ToastContainer />
//       {token.length > 0 ? (
//         // <Dashboard token={token} setToken={setToken} />
//       ) : (
//         // <Login token={token} setToken={setToken} />
//       )}
//       <Google />
//       {/* <MagicDashboardRedirect /> */}
//     </MagicProvider>
//   );
// }

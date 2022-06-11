import { 
  Routes as Navigate,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import Market from "./pages/Market";
import Comment from "./pages/Comment";
import Account from "./pages/Account";
import Help from "./pages/help";

export default function Routes(
  {
    default_link,
    account,
    logged_in
  }) 
{
  return (
    <Navigate>
        <Route path="/" element={
        <Home logged_in={logged_in}/> 
        }/> 
        <Route path="/account" element=
        {
          <Account logged_in_lk={logged_in} default_link_lk={default_link} account={account}/>
        }/>
        <Route path="/market" element=
        {
          <Market logged_in_market={logged_in} default_link_market={default_link} account={account}/>
        }/>
        <Route path="/help" element=
        {
          <Help logged_in_help={logged_in} default_link_help={default_link} account={account}/>
        }/>
        <Route path="/comment" element=
        {
          <Comment logged_in_comment={logged_in} default_link_comment={default_link} account={account}/>
        }/>
    </Navigate>
  );
}
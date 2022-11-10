import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuNavbar from "../components/MenuNavbar";
import { getAccountsAsync } from "../store/accountsSlice";

const Dashboard = () => {
  const { accounts, status } = useSelector((state: any) => state.userAccounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    dispatch(getAccountsAsync());
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      if (accounts.length === 0) {
        navigate("/create-cash-account");
      }
    }
  }, [status]);

  return (
    <>
      <MenuNavbar />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;

import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import MenuNavbar from "../components/MenuNavbar";

import { IAccount } from "../interfaces/account.interface";

const AccountTransaction = () => {
  const location = useLocation();
  const account: IAccount = location.state.account;

  const navigate = useNavigate();

  const cancel = () => {
    navigate("/account-detail", { state: { account: account } });
  };

  return (
    <>
      <MenuNavbar />

      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Account Transaction</h3>
            <div className="form-group mt-3">
              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={cancel}>
                  Cancel
                </Button>
                <Button variant="outline-primary">Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTransaction;

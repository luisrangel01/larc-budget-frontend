import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector } from "react-redux";

import { IAccount } from "../interfaces/account.interface";
import { getAmount, getCurrency, getType } from "../helpers/utils";
import MenuNavbar from "../components/MenuNavbar";
import Icon from "../components/Icon";

const AccountDetail = () => {
  const location = useLocation();

  const { currencies } = useSelector((state: any) => state.currencies);
  const { types } = useSelector((state: any) => state.accountTypes);

  const account: IAccount = location.state.account;

  const currency = getCurrency(account.currency, currencies);
  const type = getType(account.type, types);

  const navigate = useNavigate();

  const back = () => {
    navigate("/dashboard");
  };

  const edit = () => {
    navigate("/account-edit", { state: { account: account } });
  };

  const addTransaction = () => {
    navigate("/account-transaction", { state: { account: account } });
  };

  return (
    <>
      <MenuNavbar />

      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Account Detail</h3>
            <div className="form-group mt-3">
              <div className="d-flex justify-content-between mb-3">
                <Button variant="outline-secondary" onClick={back}>
                  Back
                </Button>
                <Button variant="outline-primary" onClick={edit}>
                  Edit
                </Button>
              </div>
            </div>

            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Icon
                  style={{ backgroundColor: account.color }}
                  icon={type ? type.icon || "" : ""}
                />
                <Card.Text>{account.name}</Card.Text>
                <Card.Title>
                  {getAmount(account.currency, account.currentBalance)}
                </Card.Title>

                <div className="d-flex justify-content-around">
                  <div>{account.currency}</div>
                  <img
                    src={currency ? currency.flagUrl || "" : ""}
                    className="img-fluid shadow-4 img-flag"
                  />
                </div>

                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={addTransaction}
                >
                  <AddCircleIcon /> Record
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;

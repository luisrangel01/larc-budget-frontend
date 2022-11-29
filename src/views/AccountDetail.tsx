import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import {
  getTransactionsAsync,
  resetTransactions,
} from "../store/accountTransactions/transactionsSlice";
import {
  updateAccountTransactionAsync,
  resetUpdateAccountTransaction,
} from "../store/accountTransactions/updateAccountTransactionSlice";
import { IAccount } from "../interfaces/account.interface";
import { getAmount, getCurrency, getType } from "../helpers/utils";
import MenuNavbar from "../components/MenuNavbar";
import Icon from "../components/Icon";
import Detail from "../components/Detail";

const AccountDetail = () => {
  const location = useLocation();

  const { currencies } = useSelector((state: any) => state.currencies);
  const { types } = useSelector((state: any) => state.accountTypes);
  const { transactions, status: statusTransactions } = useSelector(
    (state: any) => state.transactions
  );
  const { updateResult, status, revertAccountTransaction } = useSelector(
    (state: any) => state.updateAccountTransaction
  );

  const account: IAccount = location.state.account;

  const [loading, setLoading] = useState<boolean>(false);
  const [currentBalance, setCurrentBalance] = useState<number>(
    account.currentBalance || 0
  );

  const currency = getCurrency(account.currency, currencies);
  const type = getType(account.type, types);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    setLoading(status === "loading" || statusTransactions === "loading");
  }, [status, statusTransactions]);

  const deleteTransaction = (transaction: any) => {
    // @ts-ignore
    dispatch(updateAccountTransactionAsync({ transactionId: transaction.id }));
  };

  useEffect(() => {
    if (updateResult) {
      if (updateResult.affected > 0) {
        getTransactions();
        setCurrentBalance(revertAccountTransaction.currentBalance);
        // @ts-ignore
        dispatch(resetUpdateAccountTransaction());
      }
    }
  }, [updateResult]);

  const getTransactions = () => {
    // @ts-ignore
    dispatch(getTransactionsAsync({ accountId: account.id }));
  };

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
            {loading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
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

            <Card>
              <Card.Body>
                <Icon
                  style={{ backgroundColor: account.color }}
                  icon={type ? type.icon || "" : ""}
                />
                <Card.Text>{account.name}</Card.Text>
                <Card.Title>
                  {getAmount(account.currency, currentBalance)}
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

            <div className="form-group mt-3">
              <Detail
                transactions={transactions}
                handleDeleteTransaccion={deleteTransaction}
                disabled={loading}
                account={account}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;

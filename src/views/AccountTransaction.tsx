import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Spinner from "react-bootstrap/Spinner";

import { IAccount } from "../interfaces/account.interface";
import MenuNavbar from "../components/MenuNavbar";
import { IAccountTransaction } from "../interfaces/accountTransaction.interface";
import Currency from "../components/Currency";

const AccountTransaction = () => {
  const location = useLocation();
  const account: IAccount = location.state.account;

  const [loading, setLoading] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>("DEBIT");
  const [dataTransaction, setDataTransaction] = useState<IAccountTransaction>({
    accountId: account.id,
    currency: account.currency,
    type: "",
    amount: 0,
    note: "",
  });

  const navigate = useNavigate();

  const radios = [
    { name: "Expense", value: "DEBIT", variant: "outline-danger" },
    { name: "Income", value: "CREDIT", variant: "outline-success" },
    { name: "Transfer", value: "TRANSFER", variant: "outline-dark" },
  ];

  const handleChange = (e: any) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setDataTransaction({
      ...dataTransaction,
      [e.target.name]: value,
    });
  };

  const cancel = () => {
    navigate("/account-detail", { state: { account: account } });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(dataTransaction);
    // @ts-ignore
    // dispatch(createAccountAsync(dataTransaction));
  };

  return (
    <>
      <MenuNavbar />

      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Account Transaction</h3>
            {loading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}

            <div className="form-group mt-3">
              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={cancel}>
                  Cancel
                </Button>
              </div>
            </div>

            <div className="form-group mt-3">
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={radio.variant}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>

            <div className="form-group mt-3">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                value={dataTransaction.amount}
                className="form-control mt-1 text-number"
                placeholder="Enter an Amount"
              />
            </div>

            <Currency currency={account.currency} />

            <div className="form-group mt-3">
              <label>Note</label>
              <textarea
                rows={4}
                cols={50}
                name="note"
                onChange={handleChange}
                value={dataTransaction.note}
                className="form-control mt-1"
                placeholder="Enter a Note"
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountTransaction;

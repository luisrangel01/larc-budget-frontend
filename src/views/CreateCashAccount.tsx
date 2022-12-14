import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import {
  createAccountAsync,
  resetCreateAccount,
} from "../store/accounts/createAccountSlice";
import { getAccountsAsync } from "../store/accounts/accountsSlice";
import { ICurrency } from "../interfaces/currency.interface";
import MenuNavbar from "../components/MenuNavbar";
import Currencies from "../components/Currencies";

const CreateCashAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState("home");
  const [currency, setCurrency] = React.useState<ICurrency>({
    name: "",
    code: "",
    id: 0,
  });
  const [dataCashAccount, setDataCashAccount] = useState({
    currentBalance: 0,
    type: "CASH",
    name: "CASH",
    color: "#00D084",
    currency: "",
  });
  const { accountId, status } = useSelector(
    (state: any) => state.createAccount
  );
  const { currencies } = useSelector((state: any) => state.currencies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  useEffect(() => {
    setDataCashAccount({ ...dataCashAccount, currency: currency.code });
  }, [currency]);

  useEffect(() => {
    if (accountId.length !== 0) {
      // @ts-ignore
      dispatch(getAccountsAsync());
      // @ts-ignore
      dispatch(resetCreateAccount());
      navigate("/dashboard");
    }
  }, [accountId]);

  const handleSelect = (e: any) => {
    const currencyFind = currencies.find(
      (currency: ICurrency) => currency.code === e
    );
    if (currencyFind) {
      setCurrency(currencyFind);
    }
  };

  const handleChange = (e: any) => {
    setDataCashAccount({ ...dataCashAccount, [e.target.name]: e.target.value });
  };

  const finish = () => {
    // @ts-ignore
    dispatch(createAccountAsync(dataCashAccount));
  };

  return (
    <>
      <MenuNavbar />

      <div className="General-form-container">
        <div className="General-form">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k || "home")}
            className="mb-3"
          >
            <Tab eventKey="home" title="">
              <div>Select base currency</div>

              <p>
                Let's start by selecting your base currency. All transactions in
                other currencies will be calculated regards this one.
              </p>
              <Currencies
                currency={currency}
                currencies={currencies}
                handleOnSelect={handleSelect}
              />
              {currency.id !== 0 && (
                <div className="row justify-content-center mt-3">
                  <Card className="Card-account">
                    <div className="row justify-content-center mt-1">
                      <Card.Img
                        variant="top"
                        src={currency.flagUrl}
                        className="card-img-flag"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{currency.name}</Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setKey("balance");
                        }}
                      >
                        Next
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Tab>
            <Tab eventKey="balance" title="">
              <div>Set up your cash balance</div>
              {loading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}

              <p>How much cash do you have in your physical wallet?</p>
              <div className="row justify-content-center mt-3">
                <Card className="Card-account">
                  <Card.Body>
                    <div className="row justify-content-center mt-1"></div>

                    <label>Amount</label>

                    <Stack gap={2} className="mb-3">
                      <div>
                        {" "}
                        <input
                          type="number"
                          name="currentBalance"
                          onChange={handleChange}
                          value={dataCashAccount.currentBalance}
                          className="form-control mt-1 text-number"
                          placeholder="Enter your cash balance"
                        />
                      </div>
                      <div className="bg-light border">{currency.code}</div>
                    </Stack>

                    <Button
                      variant="primary"
                      onClick={finish}
                      disabled={loading}
                    >
                      Finish
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CreateCashAccount;

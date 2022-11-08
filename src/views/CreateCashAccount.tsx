import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

import MenuNavbar from "../components/MenuNavbar";
import dataCurrencies from "../assets/currencies.json";
import { ICurrency } from "../interfaces/currency.interface";

const CreateCashAccount = () => {
  const [key, setKey] = useState("home");
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [currency, setCurrency] = React.useState<ICurrency>({
    name: "",
    code: "",
    id: 0,
  });
  const [dataCashAccount, setDataCashAccount] = useState({
    cashBalance: 0,
    password: "",
  });

  const getData = () => {
    const array: ICurrency[] = dataCurrencies;

    array.sort((a, b) => a.id - b.id);

    setCurrencies((prevNames) => [...array]);
    return array;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelect = (e: any) => {
    const currencyFind = currencies.find((currency) => currency.code === e);
    if (currencyFind) {
      setCurrency(currencyFind);
    }
  };

  const handelChange = (e: any) => {
    setDataCashAccount({ ...dataCashAccount, [e.target.name]: e.target.value });
  };

  const finish = () => {

  }

  return (
    <>
      <MenuNavbar />

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
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select a Currency
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {currencies.map((currency) => (
                <Dropdown.Item
                  key={currency.code}
                  eventKey={currency.code}
                  value={currency.code}
                >
                  <Stack direction="horizontal" gap={2}>
                    <div>
                      <img
                        src={currency.flagUrl}
                        className="img-fluid shadow-4 ml-3 img-flag"
                      />
                    </div>
                    <div>{currency.name}</div>
                  </Stack>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {currency.id !== 0 && (
            <div className="row justify-content-center mt-3">
              <Card style={{ width: "18rem" }}>
                <div className="row justify-content-center mt-1">
                  <Card.Img
                    variant="top"
                    src={currency.flagUrl}
                    className="card-img-flag"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{currency.name}</Card.Title>
                  {/* <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text> */}
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

          <p>How much cash do you have in your physical wallet?</p>
          <div className="row justify-content-center mt-3">
            <Card style={{ width: "18rem" }}>
              
              <Card.Body>
              <div className="row justify-content-center mt-1">
              </div>

                <label>Amount</label>

                <Stack gap={2} className="mb-3">
                  <div>
                    {" "}
                    <input
                      type="number"
                      name="cashBalance"
                      onChange={handelChange}
                      value={dataCashAccount.cashBalance}
                      className="form-control mt-1 text-number"
                      placeholder="Enter your cash balance"
                    />
                  </div>
                  <div className="bg-light border">{currency.code}</div>
                </Stack>

                {/* <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text> */}
                <Button
                  variant="primary"
                  onClick={finish}
                >
                  Finish
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default CreateCashAccount;

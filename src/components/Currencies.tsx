import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";

import { ICurrency } from "../interfaces/currency.interface";
import { SelectCallback } from "../types/global";

type CurrenciesProps = {
  currency: ICurrency;
  currencies: ICurrency[];
  handleOnSelect: SelectCallback;
};

const Currencies = ({
  currency,
  currencies,
  handleOnSelect,
}: CurrenciesProps) => {
  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {currency.name || "Select a Currency"}
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
  );
};

export default Currencies;

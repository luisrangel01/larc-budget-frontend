import { useSelector } from "react-redux";

import { getCurrency } from "../../helpers/utils";

type CurrencyProps = {
  currency: any;
};

const Currency = ({ currency }: CurrencyProps) => {
  const { currencies } = useSelector((state: any) => state.currencies);
  const auxCurrency = getCurrency(currency, currencies);

  return (
    <div className="d-flex justify-content-around mt-3">
      <div>{auxCurrency ? auxCurrency.code : ""}</div>
      <img
        src={auxCurrency ? auxCurrency.flagUrl || "" : ""}
        className="img-fluid shadow-4 img-flag"
      />
    </div>
  );
};

export default Currency;

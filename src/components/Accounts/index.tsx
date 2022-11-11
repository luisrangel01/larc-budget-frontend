import { ChangeEventHandler, MouseEventHandler } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAmount, getCurrency, getType } from "../../helpers/utils";

import { IAccount } from "../../interfaces/account.interface";
import Icon from "../Icon";
import "./Accounts.css";

type AccountsProps = {
  account: IAccount;
  accounts: IAccount[];
  siteSelectedCallback: any;
};

const Accounts = ({
  account,
  accounts,
  siteSelectedCallback,
}: AccountsProps) => {
  const { currencies } = useSelector((state: any) => state.currencies);
  const { types } = useSelector((state: any) => state.accountTypes);

  const onClickCard = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    account: IAccount
  ) => {
    siteSelectedCallback(event, account);
  };
  const renderCard = (account: IAccount, index: number) => {
    const currency = getCurrency(account.currency, currencies);
    const type = getType(account.type, types);

    return (
      <Card
        style={{ width: "18rem" }}
        // style={{ backgroundColor: account.color, width: "18rem" }}
        key={index}
        className="box"
        onClick={(event) => onClickCard(event, account)}
        id={account.id}
        defaultValue={account.id}
      >
        {/* <Card.Img variant="top" src="holder.js/100px180" src={account.image} /> */}
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
          {/* <Card.Text>{account.type}</Card.Text> */}
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{accounts.map(renderCard)}</div>;
};

export default Accounts;

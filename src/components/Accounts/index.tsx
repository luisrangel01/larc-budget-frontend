import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAmount, getType } from "../../helpers/utils";

import { IAccount } from "../../interfaces/account.interface";
import Currency from "../Currency";
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
  const { types } = useSelector((state: any) => state.accountTypes);

  const onClickCard = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    account: IAccount
  ) => {
    siteSelectedCallback(event, account);
  };
  const renderCard = (account: IAccount, index: number) => {
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
          <Currency currency={account.currency} />
          {/* <Card.Text>{account.type}</Card.Text> */}
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{accounts.map(renderCard)}</div>;
};

export default Accounts;

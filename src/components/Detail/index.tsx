import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { IAccountTransaction } from "../../interfaces/accountTransaction.interface";
import { IAccount } from "../../interfaces/account.interface";
import { getAmount } from "../../helpers/utils";

type DetailProps = {
  transactions: IAccountTransaction[];
  handleDeleteTransaccion: any;
  disabled: boolean;
  account: IAccount;
};

const Detail = ({
  transactions,
  handleDeleteTransaccion,
  disabled,
  account,
}: DetailProps) => {
  const deleteRow = (transaction: any) => {
    handleDeleteTransaccion(transaction);
  };

  return (
    <div className="table-responsive" style={{ height: "300px" }}>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Note</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id?.substring(transaction.id.length - 5)}</td>
                <td>{transaction.note}</td>
                <td>
                  {transaction.type === "CREDIT"
                    ? getAmount(account.currency, transaction.amount || 0)
                    : null}
                </td>
                <td>
                  {transaction.type === "CREDIT"
                    ? null
                    : getAmount(account.currency, transaction.amount || 0)}
                </td>
                <td>
                  {getAmount(account.currency, transaction.currentBalance || 0)}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteRow(transaction)}
                    disabled={disabled}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Detail;

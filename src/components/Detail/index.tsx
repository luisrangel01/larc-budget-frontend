import Table from "react-bootstrap/Table";

import { IAccountTransaction } from "../../interfaces/accountTransaction.interface";

type DetailProps = {
  transactions: IAccountTransaction[];
};

const Detail = ({ transactions }: DetailProps) => {
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
                  {transaction.type === "CREDIT" ? transaction.amount : null}
                </td>
                <td>
                  {transaction.type === "CREDIT" ? null : transaction.amount}
                </td>
                <td>{transaction.currentBalance}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Detail;

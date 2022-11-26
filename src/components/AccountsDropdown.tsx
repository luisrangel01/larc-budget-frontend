import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";

import { IAccount } from "../interfaces/account.interface";
import { SelectCallback } from "../types/global";
import Icon from "./Icon";

type AccountsDropdownProps = {
  account: IAccount;
  accounts: IAccount[];
  handleOnSelect: SelectCallback;
};

const AccountsDropdown = ({
  account,
  accounts,
  handleOnSelect,
}: AccountsDropdownProps) => {
  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {/* {account.name && <Icon icon={account.icon || ""} />}{" "} */}
        {account.name || "Select an Account"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {accounts.map((type: IAccount) => (
          <Dropdown.Item key={type.id} eventKey={type.id} value={type.id}>
            <Stack direction="horizontal" gap={2}>
              {/* <div>
                <Icon icon={type.icon || ""} />
              </div> */}
              <div>{type.name}</div>
            </Stack>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountsDropdown;

import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";

import { IAccountType } from "../interfaces/accountType.interface";
import { SelectCallback } from "../types/global";

type CurrenciesProps = {
  type: IAccountType;
  types: IAccountType[];
  handleOnSelect: SelectCallback;
};

const AccountTypes = ({ type, types, handleOnSelect }: CurrenciesProps) => {
  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {type.name || "Select a Type"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {types.map((type: IAccountType) => (
          <Dropdown.Item key={type.id} eventKey={type.id} value={type.id}>
            <Stack direction="horizontal" gap={2}>
              <div>
                <img
                  src={type.iconUrl}
                  className="img-fluid shadow-4 ml-3 img-flag"
                />
              </div>
              <div>{type.name}</div>
            </Stack>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccountTypes;

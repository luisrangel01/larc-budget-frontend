import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MoneyIcon from "@material-ui/icons/Money";
import WorkSharpIcon from "@material-ui/icons/WorkSharp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ShareIcon from "@material-ui/icons/Share";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import DiscFullIcon from "@material-ui/icons/DiscFull";

type IconProps = {
  icon: string;
};

const Icon = ({ icon }: IconProps) => {
  const project = () => {
    switch (icon) {
      case "cash":
        return <MonetizationOnIcon />;
      case "general":
        return <AccountBalanceWalletIcon />;
      case "currentAccount":
        return <AccountBalanceIcon />;
      case "creditCard":
        return <CreditCardIcon />;
      case "savingAccount":
        return <MoneyIcon />;
      case "bonus":
        return <WorkSharpIcon />;
      case "insurance":
        return <VerifiedUserIcon />;
      case "investment":
        return <ShareIcon />;
      case "loan":
        return <AttachMoneyIcon />;
      case "mortgage":
        return <LocalAtmIcon />;
      case "accountWithOverdraft":
        return <LocalCafeIcon />;
      default:
        return <DiscFullIcon />;
    }
  };

  return project();
};

export default Icon;

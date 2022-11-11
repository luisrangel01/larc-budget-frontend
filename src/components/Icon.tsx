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
  style?: any;
};

const Icon = ({ icon, style }: IconProps) => {
  const project = () => {
    switch (icon) {
      case "cash":
        return <MonetizationOnIcon style={style} />;
      case "general":
        return <AccountBalanceWalletIcon style={style} />;
      case "currentAccount":
        return <AccountBalanceIcon style={style} />;
      case "creditCard":
        return <CreditCardIcon style={style} />;
      case "savingAccount":
        return <MoneyIcon style={style} />;
      case "bonus":
        return <WorkSharpIcon style={style} />;
      case "insurance":
        return <VerifiedUserIcon style={style} />;
      case "investment":
        return <ShareIcon style={style} />;
      case "loan":
        return <AttachMoneyIcon style={style} />;
      case "mortgage":
        return <LocalAtmIcon style={style} />;
      case "accountWithOverdraft":
        return <LocalCafeIcon style={style} />;
      default:
        return <DiscFullIcon style={style} />;
    }
  };

  return project();
};

export default Icon;

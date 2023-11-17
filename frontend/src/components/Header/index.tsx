import { HeaderConteiner } from "./styled";
import bankme from "../../assets/images/bankme.webp";

export default function Header() {
  return (
    <HeaderConteiner>
      <img src={bankme} alt="logo" className="logo" />
    </HeaderConteiner>
  );
}

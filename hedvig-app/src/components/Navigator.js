import { StackNavigator } from "react-navigation"
import Home from "../containers/Home"
import AnotherScreen from "../components/AnotherScreen"
import Intro from "../containers/Intro"
import Login from "./Login"
import Onboarding from "../containers/Onboarding"
import AddEditItem from "./AddEditItem"
import Profile from "./Profile"
import InsuranceOffer from "./InsuranceOffer"
import InsuranceDenial from "./InsuranceDenial"
import InventoryList from "./InventoryList"
import InsuranceList from "./InsuranceList"
import AddEditInsurance from "./AddEditInsurance"
import RegisterPayment from "./RegisterPayment"
import ChangePayment from "./ChangePayment"
import RegisterCashback from "./RegisterCashback"
import ChangeCashback from "./ChangeCashback"
import SignBankid from "./SignBankid"
import FullTerms from "./FullTerms"
import Share from "./Share"
import Dashboard from "../containers/Dashboard"
import Claim from "./Claim"
import Chat from "../containers/Chat"
import Feedback from "./Feedback"

const Navigator = StackNavigator({
  Home: { screen: Home },
  AnotherScreen: { screen: AnotherScreen },
  Intro: { screen: Intro },
  Login: { screen: Login },
  Onboarding: { screen: Onboarding },
  AddEditItem: { screen: AddEditItem },
  Profile: { screen: Profile },
  InsuranceOffer: { screen: InsuranceOffer },
  InsuranceDenial: { screen: InsuranceDenial },
  InventoryList: { screen: InventoryList },
  InsuranceList: { screen: InsuranceList },
  AddEditInsurance: { screen: AddEditInsurance },
  RegisterPayment: { screen: RegisterPayment },
  ChangePayment: { screen: ChangePayment },
  RegisterCashback: { screen: RegisterCashback },
  ChangeCashback: { screen: ChangeCashback },
  SignBankid: { screen: SignBankid },
  FullTerms: { screen: FullTerms },
  Share: { screen: Share },
  Dashboard: { screen: Dashboard },
  Claim: { screen: Claim },
  Chat: { screen: Chat },
  Feedback: { screen: Feedback }
})

export default Navigator

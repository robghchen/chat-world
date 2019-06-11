import Chance from "chance";
import { userSession } from "./blockstack";

const chance = new Chance();
let name = "Guest" + chance.integer({ min: 1, max: 90071992 }).toString();

if (userSession.isUserSignedIn()) {
  const userData = userSession.loadUserData();
  const fullName = userData.profile.name;
  const username = userData.username;

  fullName ? (name = fullName) : (name = username);
}

export default name;

import { Model } from "radiks";

export default class AppUser extends Model {
  static className = "AppUser";

  static schema = {
    username: {
      type: String,
      decrypted: true
    },
    online: {
      type: Boolean,
      decrypted: true
    },
    language: {
      type: String,
      decrypted: true
    }
  };
}
import { Model } from 'radiks';

export default class Message extends Model {
  static className = 'Message'
  
  static schema = {
    content: {
      type: String,
      decrypted: true
    },
    createdBy: {
      type: String,
      decrypted: true
    },
    language: {
      type: String,
      decrypted: true
    }
  }
}
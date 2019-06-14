import { AppConfig, UserSession } from "blockstack";

export const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://localhost:5000');
export const userSession = new UserSession({ appConfig });
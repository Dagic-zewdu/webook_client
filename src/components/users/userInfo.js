import { decryptToken } from "../auth/tokenEncryption";

export const userInfo = () => {
  let { user_type, token: Token } = localStorage;
  let token = decryptToken(Token);
  return { token, user_type };
};

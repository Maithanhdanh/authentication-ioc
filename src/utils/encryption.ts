import environment from '@config/environment';
import CryptoJS from 'crypto-js';

const secret = environment.SECRET;

const encrypt = (token: string): string => CryptoJS.AES.encrypt(token, secret).toString();

const decrypt = (token: string): string => CryptoJS.AES.decrypt(token, secret).toString(CryptoJS.enc.Utf8);

export { encrypt, decrypt };

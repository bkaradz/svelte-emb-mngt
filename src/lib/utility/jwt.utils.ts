import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = Buffer.from(config.get<string>('privateKeyBase64'), 'base64');
const publicKey = Buffer.from(config.get<string>('publicKeyBase64'), 'base64');

// eslint-disable-next-line @typescript-eslint/ban-types
export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
	return jwt.sign(object, privateKey, { ...(options && options), algorithm: 'RS256' });
};

export const verifyJwt = (token: string) => {
	try {
		const decoded = jwt.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded
		};
	} catch (e) {
		return {
			valid: false,
			expired: e.message === 'jwt expired',
			decoded: null
		};
	}
};

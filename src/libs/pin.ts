import crypto from 'node:crypto'

export function hashPin(pin: string) {
	const secret = import.meta.env.PIN_HASH_SECRET

	if (!secret) {
		throw new Error('PIN_HASH_SECRET is not defined in environment variables.')
	}

	return crypto.createHmac('sha256', secret).update(pin.trim()).digest('hex')
}


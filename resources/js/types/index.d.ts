import { ButtonHTMLAttributes } from 'react';
import { Config } from 'ziggy-js';

export type KinkRole = 'top'|'bottom';
export type KinkRating = -1|0|1|2|3|null;
export type PronounsShort = 'I/me'|'you/your'|'he/him'|'she/her'|'they/them'|'it/its';
export type PronounsFull = 'I/me/my/mine/myself'|'you/you/your/yours/yourself'|'he/him/his/his/himself'|'she/her/her/hers/herself'|'they/them/their/theirs/themself'|'it/it/its/its/itself'
export type PronounSet = {
	id: number
	short: PronounsShort
	full: PronounsFull
}

export type Kink = {
	id: number
	name: string
	rating_top: KinkRating
	rating_bottom: KinkRating
}

export type AuthUser = {
	id: number
	avatar?: File|string
	color?: string
	username: string
	pronounSet: PronounSet
	email?: string
	email_verified_at?: string
	characteristics?: Characteristic[]
	kinks?: KinkDB[]
	kinklist?: KinkUI[]
	matches?: KinkMatch[]
	preferences?: Characteristic[]
}

export type User = {
	id: number
	avatar?: string
	username: string
	pronounSet: PronounSet
	characteristics: Characteristic[]
	kinks: Kink[],
	matchInfo?: KinkMatch[]
}

export interface UserDB {
    id: number
	avatar?: File|string
	color?: string
    username: string
	pronouns: Pronouns
    email: string
    email_verified_at?: string
	characteristics?: Characteristic[]
	kinks?: KinkDB[] | KinkUI[]
	matches?: KinkMatch[]
}

export interface UserUI {
    id: number
	avatar?: string
    username: string
    email: string
    email_verified_at?: string
	characteristics?: Characteristic[]
	kinks?: KinkDB[] | KinkUI[]
	// kinklist?: KinkUI[]
	matches?: KinkMatch[]
}

export type Characteristic = {
	id: number
	name: string
	userHasCharacteristic: boolean
	userPrefersCharacteristic: boolean | null
}

export type Preference = {
	id: number
	name: string
	userPrefersCharacteristic: boolean | null
}

export interface KinkDB {
	id: number
	name: string
	aka: string
	top: string
	bottom: string
	description: string
	safety?: string
	text: {
		top: string[],
		bottom: string[]
	}
	pivot?: {
		rating_top: KinkRating
		rating_bottom: KinkRating
	}
}

export interface UserKinkDB extends KinkDB {
	pivot: {
		rating_top: KinkRating
		rating_bottom: KinkRating
	}
}

export type UserKinkUI = {
	id: number
	name: string
	role: KinkRole
	rating: KinkRating
	text: string
}

export type KinkMatch = {
	id: number
	name: string
	score: number
	text: string
	user1: {
		rating: KinkRating
		role: KinkRole
	},
	user2: {
		rating: KinkRating
		role: KinkRole
	}
}

export type UserSeeking = {
	characteristic_id: number
	characteristic_name: string
	seeking: boolean|null
}

// export interface UserKink extends Kink {
// 	id: number|string;
// 	user_id: number|string;
// 	kink_id: number|string;
// 	name: string;
// 	text: string;
// 	role: 'top'|'bottom';
// 	rating: KinkRating;
// }

export type SelectOption = {
	value: number | string | boolean
	label: string
}

export interface CustomButtonAttributes<T> extends ButtonHTMLAttributes<T> {
	label?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: { user: User; };
    ziggy: Config & { location: string };
};

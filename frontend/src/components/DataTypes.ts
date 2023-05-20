export interface IPost {
	id: number;
	title: string;
	text: string;
	language: string;
	idUser: number;
	login?: string;
}

export interface IUser {
	id: number | null;
	login: string;
	email: string;
	isAdmin: boolean;
	password?: string;
}

export interface ITranslation {
	id: number;
	sectionId: number;
	text: string;
	language: string;
	idPost: number;
	idUser: number;
	title?: string;
	postLanguage?: string;
	login?: string;
}

export interface IPostTranslation {
	sectionId: number;
	text: string;
	language: string;
	idPost: number;
	idUser: number;
}

export interface IRating {
	id: number;
	rating: number;
	idUser: number;
	idTranslation: number;
	idPost: number;
}

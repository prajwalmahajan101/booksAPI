export interface IBook {
	title: string;
	author: string;
	summary: string;
}

export interface IBookWithId extends IBook {
	id: string;
}

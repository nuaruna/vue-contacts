export interface Contact {
	id: number;
	name?: string | null;
	phone?: string | null;
	params?: Parameter[] | null;
}
export interface Parameter {
	id: number;
	caption?: string | null;
	value?: string | null;
}

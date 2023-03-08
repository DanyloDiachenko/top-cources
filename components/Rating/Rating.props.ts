import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RatingProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isEditable?: boolean;
	rating: number;
	setRating?: (raiting: number) => void;
}

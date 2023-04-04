import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface RatingProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isEditable?: boolean;
	rating: number;
	setRating?: (raiting: number) => void;
	error?: FieldError;
}

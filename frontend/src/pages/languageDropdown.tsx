import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const languagesArray = [
	{ value: 'Polish', label: '\uD83C\uDDF5\uD83C\uDDF1 Polish' },
	{ value: 'English', label: '\uD83C\uDDEC\uD83C\uDDE7 English' },
	{ value: 'German', label: '\uD83C\uDDE9\uD83C\uDDEA German' },
	{ value: 'Russian', label: '\uD83C\uDDF7\uD83C\uDDFA Russian' },
	{ value: 'Spanish', label: '\uD83C\uDDEA\uD83C\uDDF8 Spanish' },
] as const;

interface ILanguageDropdownProps {
	language: string;
	changeFunction: (value: string) => void;
	filterOut?: string;
}

export const LanguageDropdown = ({ language, changeFunction, filterOut }: ILanguageDropdownProps) => {
	const languageArray = !filterOut ? languagesArray : languagesArray.filter(item => item.value !== filterOut);

	return (
		<FormControl variant='outlined' required sx={{ m: 1, minWidth: 150 }}>
			<InputLabel id='demo-simple-select-required-label'>Language</InputLabel>
			<Select
				labelId='demo-simple-select-required-label'
				id='demo-simple-select-required'
				value={language}
				label='Language *'
				onChange={e => changeFunction(e.target.value)}>
				{languageArray.map(lang => (
					<MenuItem key={lang.value} value={lang.value}>
						{lang.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

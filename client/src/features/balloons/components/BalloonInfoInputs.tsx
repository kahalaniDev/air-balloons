import React from 'react';
import { UseInputValue } from '../../../hooks/useInput';
import { UseSelectValue } from '../../../hooks/useSelectInput';
import { BalloonColor, BalloonType } from '../models/enums';
import SelectInput from '../../../components/form/SelectInput';
import { Grid, SelectChangeEvent, TextField } from '@mui/material';

type Props = {
	disabled: boolean;
	nameUseInput: UseInputValue;
	descriptionUseInput: UseInputValue;
	typeUseSelectInput: UseSelectValue;
	colorUseSelectInput: UseSelectValue;
	isValuesChangedUseState: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	];
};

const BalloonInfoInputs: React.FC<Props> = ({
	disabled,
	nameUseInput,
	descriptionUseInput,
	typeUseSelectInput,
	colorUseSelectInput,
	isValuesChangedUseState,
}) => {
	const [isValuesChanged, setIsValuesChanged] = isValuesChangedUseState;

	const [name, handleNameChange, handleNameBlur, , nameError] = nameUseInput;
	const [
		description,
		handleDescriptionChange,
		handleDescriptionBlur,
		,
		descriptionError,
	] = descriptionUseInput;
	const [type, handleTypeChange, handleTypeBlur, , typeError] =
		typeUseSelectInput;
	const [color, handleColorChange, handleColorBlur, , colorError] =
		colorUseSelectInput;

	const handleInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>,
		handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
	) => {
		if (!isValuesChanged) setIsValuesChanged(true);
		handleChange(evt);
	};

	const handleSelectInputChange = (
		evt: SelectChangeEvent<string>,
		handleChange: (evt: SelectChangeEvent<string>) => void
	) => {
		if (!isValuesChanged) setIsValuesChanged(true);
		handleChange(evt);
	};

	return (
		<>
			<Grid item xs={12}>
				<TextField
					margin='normal'
					disabled={disabled}
					value={name}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange(evt, handleNameChange)
					}
					onBlur={handleNameBlur}
					error={nameError ? true : false}
					helperText={nameError}
					fullWidth
					label='Name'
					autoFocus
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					margin='normal'
					disabled={disabled}
					value={description}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange(evt, handleDescriptionChange)
					}
					onBlur={handleDescriptionBlur}
					error={descriptionError ? true : false}
					helperText={descriptionError}
					fullWidth
					label='Description'
				/>
			</Grid>
			<Grid item xs={6}>
				<SelectInput
					label='type'
					items={Object.keys(BalloonType)}
					error={typeError}
					disabled={disabled}
					selectInputProps={{
						value: type,
						onChange: (evt: SelectChangeEvent<string>) =>
							handleSelectInputChange(evt, handleTypeChange),
						onBlur: handleTypeBlur,
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<SelectInput
					label='color'
					items={Object.keys(BalloonColor)}
					error={colorError}
					disabled={disabled}
					selectInputProps={{
						value: color,
						onChange: (evt: SelectChangeEvent<string>) =>
							handleSelectInputChange(evt, handleColorChange),
						onBlur: handleColorBlur,
					}}
				/>
			</Grid>
		</>
	);
};

export default BalloonInfoInputs;

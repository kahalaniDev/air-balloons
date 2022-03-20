import React from 'react';
import { UseInputValue } from '../../../hooks/useInput';
import { Grid, TextField } from '@mui/material';

type Props = {
	disabled: boolean;
	latitudeUseInput: UseInputValue;
	longitudeUseInput: UseInputValue;
	isValuesChangedUseState: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	];
};

const BalloonPositionInputs: React.FC<Props> = ({
	disabled,
	latitudeUseInput,
	longitudeUseInput,
	isValuesChangedUseState,
}) => {
	const [isValuesChanged, setIsValuesChanged] = isValuesChangedUseState;

	const [
		latitude,
		handleLatitudeChange,
		handleLatitudeBlur,
		,
		latitudeError,
	] = latitudeUseInput;
	const [
		longitude,
		handleLongitudeChange,
		handleLongitudeBlur,
		,
		longitudeError,
	] = longitudeUseInput;

	const handleInputChange = (
		evt: React.ChangeEvent<HTMLInputElement>,
		handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
	) => {
		if (!isValuesChanged) setIsValuesChanged(true);
		handleChange(evt);
	};

	return (
		<>
			<Grid item xs={6}>
				<TextField
					margin='normal'
					disabled={disabled}
					value={latitude}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange(evt, handleLatitudeChange)
					}
					onBlur={handleLatitudeBlur}
					error={latitudeError ? true : false}
					helperText={latitudeError}
					label='Latitude'
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					margin='normal'
					disabled={disabled}
					value={longitude}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange(evt, handleLongitudeChange)
					}
					onBlur={handleLongitudeBlur}
					error={longitudeError ? true : false}
					helperText={longitudeError}
					label='Longitude'
				/>
			</Grid>
		</>
	);
};

export default BalloonPositionInputs;

import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type Props = TextFieldProps & {
	label: string;
	value: string;
	onValueChange: (value: string) => void;
};
const PasswordInput: React.FC<Props> = ({ label, value, onValueChange, ...props }) => {
	const [ showPassword, setShowPassword ] = useState(false);

	return (
		<TextField
			{...props}
			label={label}
			type={showPassword ? 'text' : 'password'}
			value={value}
			onChange={(e) => onValueChange(e.target.value)}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword((prev) => !prev)}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PasswordInput;

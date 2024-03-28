import React, { useContext, useState } from 'react';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Theme } from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';

interface ISysSelectFieldProps extends ISysFormComponent<SelectProps> {
	options?: Array<{ value: any; label: string; description?: string }>;
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;
	multiple?: boolean;
	sxMap?: {
		menuProps: SxProps<Theme> | null;
	};
}

export const SysSelectField: React.FC<ISysSelectFieldProps> = ({
	name,
	label,
	value,
	disabled,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	options,
	description,
	menuNone,
	menuNotSelected,
	multiple,
	renderValue,
	placeholder,
	sxMap,
	...otherProps
}) => {
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);

	label = label || sysFormController?.schema?.label;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;
	disabled = disabled || sysFormController?.disabled;
	error = error || sysFormController?.error;
	readOnly = readOnly || sysFormController?.readOnly;
	options = options || sysFormController?.schema?.options || [];
	multiple = multiple || sysFormController?.schema?.multiple;

	const [valueText, setValueText] = useState(defaultValue);

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = e.target.value;
		setValueText(newValue);
		sysFormController?.onChange({ name, value: newValue });
	};

	const viewValue = options.find((option) => option.value === valueText)?.label;

	if (readOnly) return <SysViewField label={label} placeholder={viewValue || '-'} />;

	// function onFieldChange(e: React.BaseSyntheticEvent) {
	// 	const newValue = e.target.value;
	// 	if (!!max && newValue.length > max) return;
	// 	if (mask) {
	// 		const inputValue = generalMask(newValue, mask);
	// 		const transformedValue = removerFormatacoes(inputValue);
	// 		setValueText(inputValue);
	// 		sysFormController?.onChange({ name, value: transformedValue });
	// 	} else {
	// 		setValueText(newValue);
	// 		sysFormController?.onChange({ name, value: newValue });
	// 	}
	// }

	return (
		<SysLabelView label={label}>
			<Select labelId={`${label}${name}`} id={name} value={valueText} onChange={handleChange}>
				{options.map((option) => (
					<MenuItem value={option.value}>{option.label}</MenuItem>
				))}
			</Select>
		</SysLabelView>
	);
};

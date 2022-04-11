import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value?: boolean) {
		setValue((currentValue) => {
            if (typeof value === "boolean") {
                return value;
            } else {
                return !currentValue;
            }
        });
	}

	return [value, toggleValue];
}
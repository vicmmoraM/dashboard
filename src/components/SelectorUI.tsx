import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import Box from '@mui/material/Box';

// Defina la interfaz del prop
interface SelectorProps {
    onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
    // Inicializar sin valor para que el usuario seleccione
    const [cityInput, setCityInput] = useState('');

    // No llamar onOptionSelect automáticamente al montar

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setCityInput(selectedValue);
        // Comunique los cambios al componente padre
        onOptionSelect(selectedValue);
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="city-select-label">Ciudad</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-simple-select"
                    label="Ciudad"
                    value={cityInput}
                    onChange={handleChange}
                >
                    <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                    <MenuItem value={"quito"}>Quito</MenuItem>
                    <MenuItem value={"manta"}>Manta</MenuItem>
                    <MenuItem value={"cuenca"}>Cuenca</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
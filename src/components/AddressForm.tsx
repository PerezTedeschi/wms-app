import { Box, Button, TextField } from "@mui/material";

import { Room } from "@mui/icons-material";
import { useState } from "react";

export default function AddressForm ({ onSubmit }: addressFormProps) {
  const [address, setAddress] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(address);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={handleAddressChange}
        InputProps={{
          endAdornment: <Room />,
        }}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained">
          Show Map
        </Button>
      </Box>
    </form>
  );
};

interface addressFormProps {
  onSubmit: (address: string) => void;
}

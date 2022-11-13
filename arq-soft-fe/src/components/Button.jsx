import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ProductButton({
  label,
  onClick,
  color,
  variant = "contained",
}) {
  return (
    <div className="container-button-create">
      <Stack spacing={2} direction="row">
        <Button
          variant={variant}
          onClick={onClick}
          {...(color ? { color } : {})}
        >
          {label}
        </Button>
      </Stack>
    </div>
  );
}

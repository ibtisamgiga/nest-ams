import { useTheme, useMediaQuery } from "@mui/material";

function useScreenSize() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return isMatch;
}

export default  useScreenSize;
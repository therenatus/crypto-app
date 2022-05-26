import { styled, Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  const StyledButton  = styled('div')(({theme}) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
        width: "22%",
  }))
 

  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
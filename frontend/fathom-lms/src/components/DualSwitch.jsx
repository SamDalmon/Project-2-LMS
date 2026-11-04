import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material"

export default function DualSwitch({ 
  alignment, setAlignment, 
  textLeft, colorLeft,
  textRight, colorRight,
}){
  const handleAlignment = (event, newAlignment) => {
    if(newAlignment){
      setAlignment(newAlignment)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4}}>
      <ToggleButtonGroup
        value={ alignment }
        exclusive
        onChange={ handleAlignment }
        aria-label='enrolled courses and all courses toggle'
        sx={{
          backgroundColor: 'var(--background-color)',
          border: '3px solid var(--header-background-color)',
          borderRadius: '50px',
          padding: '0px',
          color: 'var(--dark-text)',
          '& .MuiToggleButtonGroup-grouped': {
            border: 0,
            borderRadius: '50px',
          },
          '& .Mui-selected': {
            '&:hover': { backgroundColor: 'white' },
          }
        }}
      >
        <ToggleButton value='left' aria-label={ textLeft }
          sx={{
            '&.Mui-selected': {
              backgroundColor: colorLeft,
            }
          }}
        >
          { textLeft }
        </ToggleButton>
        <ToggleButton value='right' aria-label={ textRight }
          sx={{
            '&.Mui-selected': {
              backgroundColor: colorRight,
            }
          }}
        >
          { textRight }
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
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
          }
        }}
      >
        <ToggleButton value='left' aria-label={ textLeft }
          sx={{
            '&.Mui-selected': {
              backgroundColor: colorLeft,
              '&:hover': { 
                backgroundColor: colorLeft,
                filter: 'brightness(0.80)'
              }
            }
          }}
        >
          { textLeft }
        </ToggleButton>
        <ToggleButton value='right' aria-label={ textRight }
          sx={{
            '&.Mui-selected': {
              backgroundColor: colorRight,
              '&:hover': { 
                backgroundColor: colorRight,
                filter: 'brightness(0.80)'
              }
            }
          }}
        >
          { textRight }
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
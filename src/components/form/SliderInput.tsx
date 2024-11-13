import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { FormField } from '@/types/FormData';


interface SliderInputProps {
  field: FormField;
  setAnswer: (fieldId: number, answer: string) => void;
}

const SliderInput = ({ field, setAnswer }: SliderInputProps) => {
  const { options } = field;
  if (!options) {
    return null;
  }

  const marks = options.map((label, index) => ({
    value: index,
    label,
  }));

  const initialValue = field.value ? marks.findIndex((mark) => mark.label === field.value) : 0;
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setAnswer(field.id, options[newValue as number]);
  };

  return (
    <div className='flex flex-col ' style={{
      padding: '0rem 0.3125rem',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flex: '1 0 0',
      alignSelf: 'stretch',
      flexWrap: 'wrap',
      width: '65ch',
    }}>
      <p className='text-2xl'>{options[value]} personer</p>
      <div style={{ width: 400, margin: '0 auto', padding: '50px 0' }}>
        <Slider
          value={value}
          onChange={handleChange}
          step={null}
          marks={marks}
          min={0}
          max={marks.length - 1}
          valueLabelDisplay="off"
          aria-labelledby="discrete-slider"
          sx={{
            '& .MuiSlider-track': {
              color: 'black',
              height: 4,
            },
            '& .MuiSlider-rail': {
              color: 'white',
              height: 4,
              opacity: 1,
            },
            '& .MuiSlider-mark': {
              backgroundColor: 'white',
              height: '12px',
              width: '12px',
              borderRadius: '50%',
              marginLeft: '-6px',
            },
            '& .MuiSlider-markActive': {
              backgroundColor: 'black',
            },
            '& .MuiSlider-markLabel': {
              fontFamily: 'inherit',
              color: 'grey',
              fontSize: '1rem',
            },
            '& .MuiSlider-markLabelActive': {
              fontFamily: 'inherit',
              //color: 'black',
            },
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
              backgroundColor: 'black',
              boxShadow: 'none',
              '&:hover': {
                width: 22,
                height: 22,
                boxShadow: 'none',
              },
              '&.Mui-active': {
                width: 22,
                height: 22,
                boxShadow: 'none',
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default SliderInput;

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import { Introduce } from './Introduce';
import { TotalFrame } from './Navbar.style';
import { useState } from 'react';

export const Navbar = () => {
  const [value, setValue] = useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TotalFrame>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
            <TabList indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="소개" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Introduce />
          </TabPanel>
        </TabContext>
      </Box>
    </TotalFrame>
  );
};

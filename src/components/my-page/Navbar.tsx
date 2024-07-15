import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import { Introduce } from './Introduce';
import { Matching } from './Matching';
import { Certification } from './Certification';
import { Modify } from './information-modify/Modify';
import { TotalFrame } from './Navbar.style';

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
              <Tab label="반려견" value="1" />
              <Tab label="매칭" value="2" />
              <Tab label="인증" value="3" />
              <Tab label="개인정보 수정" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Introduce />
          </TabPanel>
          <TabPanel value="2">
            <Matching />
          </TabPanel>
          <TabPanel value="3">
            <Certification />
          </TabPanel>
          <TabPanel value="4">
            <Modify />
          </TabPanel>
        </TabContext>
      </Box>
    </TotalFrame>
  );
};

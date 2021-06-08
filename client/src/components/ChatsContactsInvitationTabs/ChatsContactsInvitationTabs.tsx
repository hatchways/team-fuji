import React, { ReactNode, useState, ChangeEvent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ContactsTab from '../ContactsTab/ContactsTab';
import InvitationsTab from '../InvitationsTab/InvitationTab';
import ChatsTab from '../ChatsTab/ChatsTab';
import useStyles from './useStyles';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function ChatsContactsInvitationsTabs(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        TabIndicatorProps={{ className: classes.indicator }}
        value={value}
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab
          classes={{
            root: classes.root,
          }}
          disableRipple
          label="Chats"
          {...a11yProps(0)}
        />
        <Tab
          classes={{
            root: classes.root,
          }}
          disableRipple
          label="Contacts"
          {...a11yProps(1)}
        />
        <Tab
          classes={{
            root: classes.root,
          }}
          disableRipple
          label="Invitations"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChatsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InvitationsTab />
      </TabPanel>
    </div>
  );
}

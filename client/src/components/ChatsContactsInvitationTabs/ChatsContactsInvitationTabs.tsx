import { ReactNode, useState, ChangeEvent, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ContactsTab from '../ContactsTab/ContactsTab';
import InvitationsTab from '../InvitationsTab/InvitationTab';
import ChatsTab from '../ChatsTab/ChatsTab';
import useStyles from './useStyles';
import { Invitation } from '../../interface/Invitation';
import { User } from '../../interface/User';
import { Conversation } from '../../interface/Conversation';
import { getInvitations, patchInvitation, getContacts } from '../../helpers/APICalls/Invitation';
import { getConversations } from '../../helpers/APICalls/Conversation';
import { useAuth } from '../../context/useAuthContext';

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
        <Box>
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
  const { loggedInUser } = useAuth();
  const [invitations, setInvitaions] = useState<Invitation[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 2;

  useEffect(() => {
    async function loadInvitations() {
      const response = await getInvitations({ userId: loggedInUser?._id });
      setInvitaions(response.invitations);
    }
    async function loadContacts() {
      const response = await getContacts({ offset, limit });
      setOffset(offset + limit);
      setContacts(response.contacts);
    }

    async function loadConversations() {
      const response = await getConversations();
      setConversations(response.conversations);
    }

    loadContacts();
    loadInvitations();
    loadConversations();
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleReject = async (index: number, invitationId: string) => {
    await patchInvitation({ invitationId, action: 'reject' });
    setInvitaions(invitations.filter((inv, idx) => idx !== index));
  };
  const handleApprove = async (index: number, invitationId: string) => {
    await patchInvitation({ invitationId, action: 'approve' });
    setInvitaions(invitations.filter((inv, idx) => idx !== index));
  };

  const fetchMoreData = async () => {
    const response = await getContacts({ offset, limit });
    setOffset(offset + limit);
    if (response.contacts?.length) {
      setContacts([...contacts, ...response.contacts]);
    } else {
      setHasMore(false);
      return;
    }
  };

  return (
    <div>
      <Tabs
        variant="fullWidth"
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
        <ChatsTab conversations={conversations} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactsTab contacts={contacts} fetchMoreData={fetchMoreData} hasMore={hasMore} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InvitationsTab invitations={invitations} handleReject={handleReject} handleApprove={handleApprove} />
      </TabPanel>
    </div>
  );
}

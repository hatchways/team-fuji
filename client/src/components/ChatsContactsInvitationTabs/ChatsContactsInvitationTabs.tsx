import { useState, ChangeEvent, useEffect } from 'react';
import Tabs from '../Tabs';
import Tab from '../Tab';
import Box from '@material-ui/core/Box';
import ContactsTab from '../ContactsTab/ContactsTab';
import InvitationsTab from '../InvitationsTab/InvitationTab';
import ChatsTab from '../ChatsTab/ChatsTab';
import useStyles from './useStyles';
import { Invitation } from '../../interface/Invitation';
import { User } from '../../interface/User';
import { Conversation } from '../../interface/Conversation';
import { getInvitations, patchInvitation, getContacts } from '../../helpers/APICalls/Invitation';
import { getConversations, createConversation } from '../../helpers/APICalls/Conversation';
import { useAuth } from '../../context/useAuthContext';
import { Grid } from '@material-ui/core';
import Search from '../Search/Search';

interface Props {
  handleConversationId: (conversationId: string) => void;
}

export default function ChatsContactsInvitationsTabs({ handleConversationId }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const [invitations, setInvitaions] = useState<Invitation[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [contactsOffset, setContactsOffset] = useState<number>(0);
  const [conversationOffset, setConversationOffset] = useState<number>(0);
  const [hasMoreContacts, setHasMoreContacts] = useState<boolean>(true);
  const [hasMoreConversations, setHasMoreConversations] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const limit = 10;

  useEffect(() => {
    async function loadInvitations() {
      const response = await getInvitations({ userId: loggedInUser?._id });
      setInvitaions(response.invitations);
    }
    async function loadContacts() {
      const response = await getContacts({ offset: contactsOffset, limit });
      setContacts(response.contacts);
      setContactsOffset(contactsOffset + limit);
    }

    async function loadConversations() {
      const response = await getConversations({ offset: conversationOffset, limit });
      setConversations(response.conversations);
      setConversationOffset(conversationOffset + limit);
    }

    loadContacts();
    loadInvitations();
    loadConversations();
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState(0);

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

  const handleCreateConversation = async (userIds: string[]) => {
    const response = await createConversation({ userIds });
    console.log(response);
    setConversations([response.conversation, ...conversations]);
  };

  const fetchMoreContacts = async () => {
    const response = await getContacts({ offset: contactsOffset, limit });
    setContactsOffset(contactsOffset + limit);
    if (response.contacts?.length) {
      if (response.contacts?.length < limit) {
        setHasMoreContacts(false);
      }
      setContacts([...contacts, ...response.contacts]);
    } else {
      setHasMoreContacts(false);
      return;
    }
  };

  const fetchMoreConversations = async () => {
    const response = await getConversations({ offset: conversationOffset, limit });
    setConversationOffset(conversationOffset + limit);
    if (response.conversations?.length) {
      if (response.conversations?.length < limit) {
        setHasMoreConversations(false);
      }
      setConversations([...conversations, ...response.conversations]);
    } else {
      setHasMoreConversations(false);
      return;
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  return (
    <Tabs>
      <Tab title="Chats">
        <Grid item container direction="column">
          <Box className={classes.boxDivider} />
          <Search search={search} handleChange={handleSearchChange} />
          <Box className={classes.boxDivider} />
          <ChatsTab
            contacts={contacts}
            createConversation={handleCreateConversation}
            conversations={conversations}
            handleConversationId={handleConversationId}
            fetchMoreData={fetchMoreConversations}
            hasMore={hasMoreConversations}
          />
        </Grid>
      </Tab>
      <Tab title="Contacts">
        <Box className={classes.boxDivider} />
        <Search search={search} handleChange={handleSearchChange} />
        <Box className={classes.boxDivider} />
        <ContactsTab contacts={contacts} fetchMoreData={fetchMoreContacts} hasMore={hasMoreContacts} />
      </Tab>
      <Tab title="Invitations">
        <Box className={classes.boxDivider} />
        <Search search={search} handleChange={handleSearchChange} />
        <Box className={classes.boxDivider} />
        <InvitationsTab invitations={invitations} handleReject={handleReject} handleApprove={handleApprove} />
      </Tab>
    </Tabs>
  );
}

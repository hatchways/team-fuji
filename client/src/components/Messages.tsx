import Box from '@material-ui/core/Box';

interface Props {
  messages: string[];
}
const Messages = ({ messages }: Props): JSX.Element => {
  return (
    <Box>
      {messages.map((message: string, index: number) => (
        <p key={index}>{message}</p>
      ))}
    </Box>
  );
};

export default Messages;

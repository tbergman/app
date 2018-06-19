import { connect } from 'react-redux';
import VideoInput from '../components/VideoInput';

const mapStateToProps = (state, ownProps) => {
  let message = state.chat.messages[ownProps.messageIndex];
  return {
    message,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const VideoInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoInput);

export default VideoInputContainer;

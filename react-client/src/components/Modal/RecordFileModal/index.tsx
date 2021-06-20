import React, { useRef, useState } from 'react';
import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import { Paragraph } from '~/components/Text';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import ModalWrapper from '../ModalWrapper';
import Icon from '~/components/Icon';
import { AudioPlayer } from './parts';
import DotLoader from '~/components/DotLoader';

import AudioRecorder from 'audio-recorder-polyfill';
import TextInput from '~/components/TextInput';
import { ModalErrorMessage } from '../parts';

interface Props {
  onClose: () => void;
  projectId: number;
}

const RECORDING_FILETYPE = '.wav';

const blobToFile = (blobs: Blob[], fileName: string): File =>
  new File(blobs, fileName, {
    type: 'audio/wave'
  });

const RecordFileModal: React.FC<Props> = ({ onClose, projectId }) => {
  const [isRecording, setIsRecording] = useState<boolean>();
  const [audioRecorded, setAudioRecorded] = useState<boolean>();
  const [fileName, setFileName] = useState('');

  const [error, setError] = useState<string>();

  const { uploadProjectFile } = useStoreActions((state) => state.project);
  const { isLoadingProject } = useStoreState((state) => state.project);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const onStartRecord = async () => {
    setIsRecording(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    const mediaRecorder = new AudioRecorder(stream);
    console.log(mediaRecorder);

    mediaRecorder.setAudioEncodingBitRate &&
      mediaRecorder.setAudioEncodingBitRate(16);

    mediaRecorder.setAudioSamplingRate &&
      mediaRecorder.setAudioSamplingRate(44100);

    audioChunksRef.current = [];

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    console.log(mediaRecorder.state);

    mediaRecorder.addEventListener('dataavailable', (e) => {
      console.log(e.data.type);
      audioChunksRef.current.push(e.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wave' });
      const audioURL = window.URL.createObjectURL(blob);
      if (audioElementRef.current) audioElementRef.current.src = audioURL;
    });
  };

  const onStopRecord = () => {
    setIsRecording(false);
    setAudioRecorded(true);
    console.log(audioChunksRef.current);
    mediaRecorderRef.current?.stop();
  };

  const onSave = async () => {
    if (audioChunksRef.current[0]) {
      const file: File = blobToFile(
        audioChunksRef.current,
        'New Recording: ' + new Date().toISOString() + RECORDING_FILETYPE
      );
      try {
        await uploadProjectFile({
          id: projectId,
          file,
          name: fileName ? fileName + RECORDING_FILETYPE : undefined
        });
        onClose();
      } catch (err) {
        setError('There was a problem uploading the file. Try again later.');
      }
    }
  };
  return (
    <ModalWrapper title='Record Audio Sample' onClose={onClose}>
      <Box marginBottom='3rem'>
        <Paragraph fontSize='0.8rem' textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum aasl.
        </Paragraph>
      </Box>
      <FlexBox flexDirection='column' alignItems='center' marginBottom='3rem'>
        <Box height='5rem'>
          {isRecording ? <DotLoader /> : <Icon icon='record' size={64} />}
        </Box>
        <Box
          marginTop='1rem'
          onClick={isRecording ? onStopRecord : onStartRecord}
        >
          <ActionButton
            fontSize='0.9rem'
            padding='0.5rem 1.5rem'
            height='2.5rem'
          >
            {!isRecording
              ? !audioRecorded
                ? 'Start Recording'
                : 'Record again (this will override current recorded file!)'
              : 'Finish Recording'}
          </ActionButton>
        </Box>
      </FlexBox>
      <FlexBox
        margin='2rem auto'
        height='9rem'
        opacity={isRecording || !audioRecorded ? 0.2 : 1}
        flexDirection='column'
        justifyContent='center'
        cursor={isRecording || !audioRecorded ? 'not-allowed' : 'auto'}
      >
        <Box
          flexShrink={0}
          pointerEvents={isRecording || !audioRecorded ? 'none' : undefined}
        >
          <AudioPlayer controls ref={audioElementRef} />
        </Box>
        <Box
          margin='1rem 0'
          flexShrink={0}
          pointerEvents={isRecording || !audioRecorded ? 'none' : undefined}
        >
          <TextInput
            label='Custom file name'
            placeholder='Ex. New Recording'
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Box>
      </FlexBox>

      <ModalErrorMessage error={error} />

      <ActionButton
        isLoading={isLoadingProject === projectId}
        onClick={onSave}
        disabled={!audioRecorded || isRecording}
        borderRadius='5px'
      >
        {audioRecorded ? 'Save' : 'Record audio to proceed'}
      </ActionButton>
    </ModalWrapper>
  );
};

export default RecordFileModal;

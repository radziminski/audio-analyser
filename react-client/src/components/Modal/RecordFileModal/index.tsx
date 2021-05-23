import React, { useRef, useState } from 'react';
import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import { Heading5, Paragraph } from '~/components/Text';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import ModalWrapper from '../ModalWrapper';
import Icon from '~/components/Icon';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';
import { AudioPlayer } from './parts';
import DotLoader from '~/components/DotLoader';

import AudioRecorder from 'audio-recorder-polyfill';

interface Props {
  onClose: () => void;
  projectId: number;
}

const blobToFile = (blob: Blob, fileName: string): File => {
  const currBlob: any = blob as File;
  currBlob.lastModified = new Date();
  currBlob.name = fileName;

  return currBlob as File;
};

const RecordFileModal: React.FC<Props> = ({ onClose, projectId }) => {
  const [isRecording, setIsRecording] = useState<boolean>();
  const [audioRecorded, setAudioRecorded] = useState<boolean>();

  const [error, setError] = useState<boolean>();

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
    audioChunksRef.current = [];

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    console.log(mediaRecorder.state);

    mediaRecorder.addEventListener('dataavailable', (e) => {
      console.log(e.data.type);
      audioChunksRef.current.push(e.data);
    });

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioURL = window.URL.createObjectURL(blob);
      if (audioElementRef.current) audioElementRef.current.src = audioURL;
    };
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
        audioChunksRef.current[0],
        'New_Recording_' + new Date().toISOString()
      );
      console.log(file);
      try {
        await uploadProjectFile({ id: projectId, file });
        onClose();
      } catch (err) {
        //
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
            {!isRecording ? 'Start' : 'Finish'} Recording
          </ActionButton>
        </Box>
      </FlexBox>
      <Box
        margin='2rem auto'
        height='2.5rem'
        opacity={isRecording ? 0.2 : 1}
        pointerEvents={isRecording ? 'none' : undefined}
      >
        {!audioRecorded ? (
          <Paragraph fontSize='0.8rem' textAlign='center'>
            None audio recorded
          </Paragraph>
        ) : (
          <AudioPlayer controls ref={audioElementRef} />
        )}
      </Box>

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

import { Box, Button, Text } from '@react-native-material/core';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
  Code,
  CameraDevice,
} from 'react-native-vision-camera';
import React, { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  EAssignmentActionType,
  TAssignment,
  TAssignmentAction,
  TQRCaptureProps,
} from '../../../types';
import { useAssignmentDispatch } from '../../contexts/AssignmentContext';
import { useFileManager } from '../../hooks/useFileManager';
import { Buffer } from 'buffer';
import { LoadingWrapper } from '../loadingScreens/LoadingWrapper';

const testAssignment: TAssignment = {
  alliance: 'RED',
  alliancePos: '2',
  event: 'test1',
  matches: [
    { matchNum: 1, teamNum: 2357, scouter: 'John' },
    { matchNum: 2, teamNum: 2357, scouter: 'Kevin' },
    { matchNum: 3, teamNum: 2357, scouter: 'John' },
    { matchNum: 4, teamNum: 2357, scouter: 'John' },
    { matchNum: 5, teamNum: 2357, scouter: 'John' },
    { matchNum: 6, teamNum: 2357, scouter: 'John' },
    { matchNum: 7, teamNum: 2357, scouter: 'John' },
    { matchNum: 8, teamNum: 2357, scouter: 'John' },
    { matchNum: 9, teamNum: 2357, scouter: 'John' },
    { matchNum: 10, teamNum: 2357, scouter: 'John' },
  ],
};

export const QRCapture: React.FC<TQRCaptureProps> = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const dispatch: Dispatch<TAssignmentAction> = useAssignmentDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const fileManager = useFileManager();

  const device: CameraDevice = useCameraDevice('back');

  const advance: (codes: Code[]) => Promise<void> = async (codes: Code[]): Promise<void> => {
    console.log(`Scanned ${codes.length} codes!`);

    if (!codes[0].value) return;

    setLoading(true);

    const assignmentTxt: string = await fileManager.unzipAssignment(codes[0].value);

    const action: TAssignmentAction = {
      type: EAssignmentActionType.load,
      loadData: assignmentTxt,
    };

    dispatch(action);

    setLoading(false);
    navigation.navigate<'Prematch'>('Prematch');
  };

  const testAdvance = () => {
    dispatch({
      type: EAssignmentActionType.load,
      loadData: JSON.stringify(testAssignment),
    });

    navigation.navigate<'Prematch'>('Prematch');
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: advance,
  });

  useEffect(() => {
    if (!hasPermission) {
      console.log('No permission');
      requestPermission();
    } else {
      console.log('Permission granted');
    }
  }, [hasPermission]);

  const cam =
    device === null ? (
      <Text>No camera</Text>
    ) : (
      <Camera
        style={{ height: '100%', width: '100%' }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    );

  return (
    <LoadingWrapper message="QR Code Generating" isLoading={isLoading}>
      <Box>
        {cam}
        <Button
          title="Next"
          variant="contained"
          onPress={() => {
            testAdvance();
          }}
          style={{ position: 'absolute', left: '0%', top: '90%' }}
        />
      </Box>
    </LoadingWrapper>
  );
};

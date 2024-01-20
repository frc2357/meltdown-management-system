import { Box, Button, Text } from '@react-native-material/core';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
  Code,
} from 'react-native-vision-camera';
import React, { useEffect } from 'react';
import { EAssignmentActionType, TQRCaptureProps } from '../../../types';
import { useAssignmentDispatch } from '../../contexts/AssignmentContext';
import { useFileManager} from '../../hooks/useFileManager';

const testAssignment = {
  alliance: 'RED',
  alliancePos: '2',
  currentMatch: 1,
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
  const dispatch = useAssignmentDispatch();
  const fileManager = useFileManager();

  const device = useCameraDevice('back');

  const advance = async (codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes!`);

    console.log(codes[0].value);

    if (!codes[0].value) return;

    // const assignmentTxt: string = await fileManager.unzipAssignment(codes[0].value);

    // const action: TAssignmentAction = {
    //   type: EAssignmentActionType.load,
    //   loadData: assignmentTxt,
    // };

    // dispatch(action);
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
    <Box>
      {cam}
      <Button
        title="Next"
        variant="contained"
        onPress={() => {
          advance([{ value: 'hello', type: 'unknown' }]);
        }}
        style={{ position: 'absolute', left: '0%', top: '90%' }}
      />
    </Box>
  );
};

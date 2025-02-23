import { Box, Text } from '@react-native-material/core';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
  Code,
  CameraDevice,
} from 'react-native-vision-camera';
import React, { Dispatch, useRef, useState } from 'react';
import { EAssignmentActionType, TAssignmentAction, TRootStackParamList } from '../../../types';
import { useAssignmentDispatch } from '../../contexts/AssignmentContext';
import { useFileManager } from '../../hooks/useFileManager';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PQRCapture = NativeStackScreenProps<TRootStackParamList, 'QRCapture'>;

export function QRCapture({ navigation }: PQRCapture): React.JSX.Element {
  const { hasPermission, requestPermission } = useCameraPermission();
  const assignmentDispatch: Dispatch<TAssignmentAction> = useAssignmentDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const fileManager = useFileManager();
  const isCaptured = useRef<boolean>(false);
  const device: CameraDevice = useCameraDevice('back');

  const advance: (codes: Code[]) => Promise<void> = async (codes: Code[]): Promise<void> => {
    if (!codes[0].value || isCaptured.current) return;

    isCaptured.current = true;
    setLoading(true);

    const assignmentTxt: string = await fileManager.unzipAssignment(codes[0].value);
    const nextMatchNum: number =
      (await fileManager.getLastMatchNumber(JSON.parse(assignmentTxt ?? '')?.e ?? '')) + 1;

    const action: TAssignmentAction = {
      type: EAssignmentActionType.load,
      loadData: assignmentTxt,
      matchNum: nextMatchNum,
    };

    assignmentDispatch(action);

    await new Promise((res) => setTimeout(res, 500));
    navigation.navigate<'Prematch'>('Prematch');
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: advance,
  });

  if (!hasPermission) {
    console.log('No permission');
    requestPermission();
  }

  const cam =
    device === null || !hasPermission ? (
      <Text>No camera</Text>
    ) : (
      <Camera
        style={{ height: '100%', width: '100%' }}
        device={device}
        isActive={!isLoading}
        codeScanner={codeScanner}
      />
    );

  return <Box>{cam}</Box>;
}

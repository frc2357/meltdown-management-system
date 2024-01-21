import React, { useState } from 'react';
import { Button, Divider, HStack, IconButton, Text } from '@react-native-material/core';
import { TLogStructure, TMatchLogsProps } from '../../../types';
import { useFileManager } from '../../hooks/useFileManager';
import { List } from 'react-native-paper';
import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import { LoadingWrapper } from '../loadingScreens/LoadingWrapper';

export const MatchLogs: React.FC<TMatchLogsProps> = ({ navigation }) => {
  const [logStructure, setLogStructure] = useState<TLogStructure>({});
  const [isLoading, setIsLoading] = useState(true);
  const fileManager = useFileManager();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      fileManager
        .getLogStructure()
        .then((value: TLogStructure) => {
          setLogStructure(value);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('ERROR');
          console.log(JSON.stringify(err, null, 1));
          setIsLoading(false);
        });
    }, [])
  );

  const createLogButton = (path: string, deleteFile: () => void) => {
    return (
      <>
        <IconButton
          icon={(props) => <List.Icon icon="delete" />}
          onPress={deleteFile}
        />
        <IconButton
          icon={(props) => <List.Icon icon="export" />}
          onPress={() => {
            navigation.navigate('QRShow', { routeName: 'MatchLogs', path: path });
          }}
        />
      </>
    );
  };

  const createEventList = () => {
    const events = [];
    for (const eventName in logStructure) {
      events.push(
        <List.Accordion title={eventName} id={eventName} key={eventName}>
          {logStructure[eventName].map((matchLog, index) => {
            return (
              <List.Item
                key={matchLog.name}
                title={matchLog.name}
                right={() => createLogButton(matchLog.path, () => {
                  fileManager.deleteFile(matchLog.path);
                  logStructure[eventName].splice(index, 1);
                  setLogStructure({...logStructure});
                })}
              />
            );
          })}
        </List.Accordion>
      );
    }

    return <List.AccordionGroup>{events}</List.AccordionGroup>;
  };

  return (
    <LoadingWrapper isLoading={isLoading} message="Loading Logs">
      <HStack spacing={50}>
        <Button
          title="Back"
          variant="contained"
          onPress={() => {
            navigation.navigate('Startup');
          }}
        />
        <Text variant="h4">Match Logs</Text>
      </HStack>
      <Divider />
      {createEventList()}
    </LoadingWrapper>
  );
};

using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace ScoutingCenter.src
{
    public class MatchController
    {
        const string SEND_CSV_FILE_DIRECTORY_PATH = "C:\\Users\\crazy\\Documents\\GitHub\\scouting-software\\ScoutingCenter\\CSVFiles\\send";
        const string RECIEVE_CSV_FILE_DIRECTORY_PATH = "C:\\Users\\crazy\\Documents\\GitHub\\scouting-software\\ScoutingCenter\\CSVFiles\\receive";

        public Dictionary<string, string> sendCSVFileNamePathPairs;
        public Dictionary<string, int> valuesToSendViaCSV;

        public MatchController()
        {
            sendCSVFileNamePathPairs = getSendCSVFileNamePathPairs();
            valuesToSendViaCSV = new Dictionary<string, int> { };
            // below line adds the value for the match number, and says that the current match is 24, currently the variables MUST be hard coded.
            valuesToSendViaCSV.Add("matchNumber", 24);
        }

        /**
         * <summary>
         * Parses the values in a CSV file with one row and returns the values in it in a string array.
         * </summary>
         */
        public string[] parseSingleRowCSVFile(string fileAddress)
        {
            try
            {
                using (TextFieldParser parser = new TextFieldParser(fileAddress))
                {
                    parser.TextFieldType = FieldType.Delimited;
                    parser.SetDelimiters(",");
                    while (!parser.EndOfData)
                    {
                        //Process row
                        return parser.ReadFields();
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
            return new string[0];
        }


        /**
         * <summary>
         * Gets the file names and paths of the CSV files in the CSV file directory for the events to send<para>
         * Returns them in the format of, file name, file path </para>
         * </summary>
         */
        public Dictionary<string, string> getSendCSVFileNamePathPairs()
        {
            try
            {
                Dictionary<string, string> fileNamePathPairs = new Dictionary<string, string>();
                foreach (string filePath in Directory.GetFiles(SEND_CSV_FILE_DIRECTORY_PATH))
                {
                    string eventName = Path.GetFileName(filePath).Split('.')[0];
                    fileNamePathPairs.Add(eventName, filePath);
                    Debug.WriteLine("Event name parsed from CSV directory: " + eventName + $"\nFile path of that event: {filePath}");
                }
                return fileNamePathPairs;
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
            return null;
        }

        /**
         * <summary>
         * Gets the file names and paths of the CSV files in the CSV file directory for the events that will be received<para>
         * Returns them in the format of, file name, file path </para>
         * </summary>
         */
        public Dictionary<string, string> getReceiveCSVFileNamePathPairs()
        {
            try
            {
                Dictionary<string, string> fileNamePathPairs = new Dictionary<string, string>();
                foreach (string filePath in Directory.GetFiles(RECIEVE_CSV_FILE_DIRECTORY_PATH))
                {
                    string eventName = Path.GetFileName(filePath).Split('.')[0];
                    fileNamePathPairs.Add(eventName, filePath);
                    Debug.WriteLine("Event name parsed from CSV directory: " + eventName + $"\nFile path of that event: {filePath}");
                }
                return fileNamePathPairs;
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
            return null;
        }
    }
}

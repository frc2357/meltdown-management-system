using InTheHand.Net;
using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using Microsoft.VisualBasic.ApplicationServices;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows;
using System.Xml.Linq;

namespace ScoutingCenter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        const string SEND_CSV_FILE_DIRECTORY_PATH = "C:\\Users\\crazy\\Documents\\GitHub\\scouting-software\\ScoutingCenter\\CSVFiles\\send";
        const string RECIEVE_CSV_FILE_DIRECTORY_PATH = "C:\\Users\\crazy\\Documents\\GitHub\\scouting-software\\ScoutingCenter\\CSVFiles\\receive";

        public Dictionary<string, string> sendCSVFileNamePathPairs;
        public Dictionary<string, int> valuesToSendViaCSV;
        public BluetoothClient workingClient;
        public MainWindow()
        {
            InitializeComponent();
            setUpScoutingCenter();
        }
        public readonly Guid FtpProtocol;
        public BluetoothClient client;
        public BluetoothListener listener;

        // for now, put all mac addresses here, so they get used by the program.
        public List<BluetoothAddress> bluetoothAddresses;
        public List<BluetoothClient> connectedBluetoothClients = new List<BluetoothClient>();
        public StreamReader sr;
        public StreamWriter sw;

        /**
         * <summary>
         * The method that sets everything up
         * </summary>
         */
        public void setUpScoutingCenter()
        {
            sendCSVFileNamePathPairs = getSendCSVFileNamePathPairs();
            valuesToSendViaCSV = new Dictionary<string, int> { };
            // below line adds the value for the match number, and says that the current match is 24, currently the variables MUST be hard coded.
            valuesToSendViaCSV.Add("matchNumber",24);
            client = new BluetoothClient();
            listener = new BluetoothListener(BluetoothService.SerialPort);
            listener.Start();
            Console.WriteLine("STarted listener");
            client = listenForConnection(listener);
            Console.Write("Not blocked");
        }

        public void readFromBufferForButton(object sender, RoutedEventArgs eventArgs)
        {
            Debug.WriteLine("Reading...");
            Debug.Write("Stream Buffer that was read: ");
            String line = sr.ReadLine(); 
            Debug.WriteLine(line);
        }

        public void writeToStreamForButton(object sender, RoutedEventArgs eventArgs)
        {
            try
            {
                writeToStream(workingClient, "hello");
                Debug.WriteLine("Write successful");
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.ToString());
            }
        }

        /** <summary>
         * <para>
         * Writes a provided message that does NOT have a delimiter present already
         * </para> <para>
         * User needs to provide a bluetooth client with an active connection, as well as the message
         * </para> <para>
         * In case of an exception, the method returns null</para></summary>
         * */
        public void writeToStream(BluetoothClient blueClient, String message)
        {
            try
            {
                blueClient.GetStream().Write(System.Text.Encoding.ASCII.GetBytes((message + '\n')), 0, message.Length + 1);
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.ToString());
            }
        }

        /**
         * <summary>
         * Reads from the buffer of a provided BluetoothClient and returns the string that was read
         * </summary>
         */
        public String readFromBuffer(BluetoothClient blueClient)
        {
            try
            {
                using (StreamReader sr = new StreamReader(blueClient.GetStream()))
                {
                    return sr.ReadLine();
                }
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.ToString());
                return null;
            }
        }

        /**
         * <summary>
         *  Processes a string mac address into a Bluetooth address that can be used for an endpoint
         * </summary>
         */
        public BluetoothAddress macAddressToBluetoothAddress(String macAddress)
        {
            return new BluetoothAddress(Convert.ToUInt64(macAddress.Replace(":", ""), 16));
        }
        /**
         * 
         * <summary>
         *  Makes a list of Bluetooth addresses from a list of mac addresses, processed or not.
         * </summary>
         */
        public List<BluetoothAddress> makeBluetoothAddressList(String[] macAddressList)
        {
            List<BluetoothAddress> addressList = new List<BluetoothAddress>();
            for (int i = 0; i < macAddressList.Length; i++)
            {
                addressList.Add(macAddressToBluetoothAddress(macAddressList[i]));
            }
            return addressList;
        }

        public BluetoothClient listenForConnection(BluetoothListener listener)
        {
            while (true)
            {
                listener.AcceptBluetoothClient();
            }
            return listener.AcceptBluetoothClient();
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

        /**
         * <summary>
         * Writes an event to the buffer of the provided bluetooth client
         * </summary>
         */
        public void writeEventToBuffer(BluetoothClient bluetoothClient, string eventType)
        {
            try
            {
                string eventFilePath;
                if (!sendCSVFileNamePathPairs.TryGetValue(eventType, out eventFilePath))
                {
                    Debug.WriteLine("Invalid event type!");
                    return;
                }
                string[] eventFormat = parseSingleRowCSVFile(eventFilePath);
                ArrayList goodString = new ArrayList();
                foreach(string str in eventFormat) 
                {
                    foreach (string key in valuesToSendViaCSV.Keys) 
                    {
                        try
                        {
                            int value;
                            valuesToSendViaCSV.TryGetValue(key, out value);
                            str.Replace(key, value.ToString());
                        }
                        catch (Exception e)
                        {
                            Debug.WriteLine("Do not have the value for the key in the values to send!*************");
                            Debug.WriteLine("Error Message: " + e.Message + "\nStack trace...\n" + e.StackTrace);
                            return;
                        }
                    }
                    goodString.Add(str);
                }
                foreach(string str in goodString)
                {
                    try 
                    {
                        writeToStream(bluetoothClient, str);
                    } catch(Exception err)
                    {
                        Debug.WriteLine("Exception Message: " + err.Message + "\nException Stack Trace...\n" + err.StackTrace);
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
        }


        /**
         * <summary>
         * Satisfies the con requirement
         * </summary>
         */
        public void con(object sender, RoutedEventArgs eventArgs)
        {

        }
    }
}
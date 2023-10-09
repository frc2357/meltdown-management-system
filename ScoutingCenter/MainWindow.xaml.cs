using InTheHand.Net;
using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows;
namespace ScoutingCenter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
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
        public void setUpScoutingCenter()
        {
            client = new BluetoothClient();
            listener = new BluetoothListener(BluetoothService.SerialPort);
            listener.Start();
            client = listenForConnection(listener);
        }

        public void connectToDevicesForButton(object sender, RoutedEventArgs eventArgs)
        {
            for (int i = 0; i < bluetoothAddresses.Count; i++)
            {
                connectToDevice(bluetoothAddresses[i]);
            }
        }

        public void connectToDevice(BluetoothAddress deviceAddress)
        {
            connectedBluetoothClients.Add(new BluetoothClient());
            Debug.WriteLine("Connecting to device...");
            connectedBluetoothClients.Last().Connect(deviceAddress, BluetoothService.SerialPort);
            Debug.WriteLine("Connection status: " + connectedBluetoothClients.Last().Connected);
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
         * Writes a provided message that DOES NOT HAVE A DELIMITER IN IT ALREADY
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
            return listener.AcceptBluetoothClient();
        }

        /**
         * <summary>
         * Processes the values in a CSV file and returns them in a string array.
         * </summary>
         */
        public string[] processCSVFile(string fileAddress)
        {
            using (TextFieldParser parser = new TextFieldParser(fileAddress))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                while (!parser.EndOfData)
                {
                    //Process row
                    string[] fields = parser.ReadFields();
                    foreach (string field in fields)
                    {
                        //TODO: Process field
                    }
                }
            }
            return new string[] { };
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
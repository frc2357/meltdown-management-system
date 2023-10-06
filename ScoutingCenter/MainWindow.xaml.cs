using System;
using InTheHand.Net;
using System.IO;
using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using System.Windows;
using System.Diagnostics;
using System.Linq;
using System.Collections;
using System.Net;
using System.Collections.Generic;

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

        public void connectToDevicesForButton(object sender, RoutedEventArgs aakjshfkjh)
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
            Debug.WriteLine("Conection status: " + connectedBluetoothClients.Last().Connected);
        }

        public void readFromBufferForButton(object sender, RoutedEventArgs aakjshfkjh)
        {
            Debug.WriteLine("Reading...");
            Debug.Write("Stream Buffer that was read: ");
            string line; line = sr.ReadLine(); Debug.WriteLine(line);
        }

        public void writeToStreamForButton(object sender, RoutedEventArgs asdjkaFJKEF)
        {
            try
            {
                writeToStream(workingClient, "hello");
                Debug.WriteLine("Write succedded");
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
         *  Processes a string mac adress into a bluetooth adress that can be used for an endpoint
         * </summary>
         */
        public BluetoothAddress macAdressToBluetoothAddress(String macAddress)
        {
            return new BluetoothAddress(Convert.ToUInt64(macAddress.Replace(":", ""), 16));
        }
        /**
         * <summary>
         *  Makes a list of bluetooth addresses from a list of mac addresses, proccessed or not.
         * </summary>
         */
        public List<BluetoothAddress> makeBluetoothAdressList(String[] macAddressList)
        {
            List<BluetoothAddress> adressList = new List<BluetoothAddress>();
            for (int i = 0; i < macAddressList.Length; i++)
            {
                adressList.Add(macAdressToBluetoothAddress(macAddressList[i]));
            }
            return adressList;
        }

        public BluetoothClient listenForConnection(BluetoothListener listener)
        {
            return listener.AcceptBluetoothClient();
        }

        /**
         * <summary>
         * Satisfies the con requirment
         * </summary>
         */
        public void con(object sender, RoutedEventArgs aakjshfkjh)
        {

        }
    }
}
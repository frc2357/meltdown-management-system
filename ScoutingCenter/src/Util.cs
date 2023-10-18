using InTheHand.Net;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{
    public class Util
    {
        /**
        * <summary>
        *  Processes a string mac address into a Bluetooth address that can be used for an endpoint
        * </summary>
        */
        public static BluetoothAddress macAddressToBluetoothAddress(String macAddress)
        {
            return new BluetoothAddress(Convert.ToUInt64(macAddress.Replace(":", ""), 16));
        }

        /**
         * 
         * <summary>
         *  Makes a list of Bluetooth addresses from a list of mac addresses, processed or not.
         * </summary>
         */
        public static List<BluetoothAddress> makeBluetoothAddressList(String[] macAddressList)
        {
            List<BluetoothAddress> addressList = new List<BluetoothAddress>();
            for (int i = 0; i < macAddressList.Length; i++)
            {
                addressList.Add(macAddressToBluetoothAddress(macAddressList[i]));
            }
            return addressList;
        }

        public static Stream getMatchCSVFileStream()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "CSV files|*.csv";
            openFileDialog.ShowDialog();
            openFileDialog.Multiselect = false;
            return openFileDialog.OpenFile();
        }
    }
}

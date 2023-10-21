using InTheHand.Net;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection.Emit;

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

        public static Stream getCSVFileStream()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "CSV files|*.csv";
            openFileDialog.Multiselect = false;

            if (openFileDialog.ShowDialog() ?? false)
            {
                return openFileDialog.OpenFile();
            }
            return null;
        }

        public static string getExportCSVFileName()
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "CSV files|*.csv";
            if (saveFileDialog.ShowDialog() ?? false)
            {
                return saveFileDialog.FileName;
            }
            return string.Empty;
        }

        public static string executePython(string pythonScript, string fileName)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "src\\python\\" + pythonScript;
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = "py";
            start.Arguments = string.Format("{0} {1}",path, fileName);
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            start.RedirectStandardError = true;

            using (Process process = Process.Start(start))
            {
                string result = "stdout: ";
                using (StreamReader reader = process.StandardOutput)
                {
                    result += reader.ReadToEnd();
                }

                result += "\n\nstderr: ";
                using (StreamReader reader = process.StandardError)
                {
                    result += reader.ReadToEnd();
                }

                return result;
            }
        }
    }
}

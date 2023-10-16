using InTheHand.Net.Sockets;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace ScoutingCenter.src
{

    public class ScoutingTablet
    {
        private BluetoothClient client;
        public string id { get; }

        public WindowFields fields { get; set; }

        public ScoutingTablet(BluetoothClient client)
        {
            this.client = client;
            this.id = parseName(client.RemoteMachineName);
        }

        /**
         * <summary>
         * Reads from the buffer of a provided BluetoothClient and returns the string that was read
         * </summary>
         */
        public String readFromBuffer()
        {
            try
            {
                using (StreamReader sr = new StreamReader(client.GetStream()))
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

        /** <summary>
        * <para>
        * Writes a provided message that does NOT have a delimiter present already
        * </para> <para>
        * User needs to provide a bluetooth client with an active connection, as well as the message
        * </para> <para>
        * In case of an exception, the method returns null</para></summary>
        * */
        public void writeToStream(String message)
        {
            try
            {
                Byte[] encodedMessage = System.Text.Encoding.ASCII.GetBytes((message + '\n'));
                client.GetStream().Write(encodedMessage, 0, encodedMessage.Length);
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.ToString());
            }
        }

        public void sendAssignment()
        {
            string assignment = "{\"type\": \"assignment\", \"info\": {\"scouter\": \"" 
                + fields.scouter.Text + "\", \"id\": \"" + id + "\"}}";
            writeToStream(assignment);
        }

        public static string parseName(string name)
        {
            return name.Substring(name.IndexOf('-') + 1);
        }

        public static Predicate<ScoutingTablet> byId(string id)
        {
            return delegate(ScoutingTablet tablet)
            {
                return tablet.id == id;
            };
        }

        public class WindowFields
        {
            public CheckBox isConnected { get; set; }
            public TextBox lastInfo { get; set; }
            public TextBox scouter { get; set; }
        }
    }
}

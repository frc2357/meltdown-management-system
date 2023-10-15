using InTheHand.Net.Sockets;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{

    public class ScoutingTablet
    {
        public BluetoothClient client;

        public ScoutingTablet(BluetoothClient client)
        {
            this.client = client;
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
    }
}

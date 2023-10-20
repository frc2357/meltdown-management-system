﻿using InTheHand.Net.Sockets;
using System;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Windows;
using System.Windows.Controls;

namespace ScoutingCenter.src
{

    public class ScoutingTablet
    {
        private static string[] matchHeaders =
            { "teamNum", "matchNum", "alliance", "startPos",
            "preload", "notes", "type", "piece", "row", "col",
            "isAuto", "location", "hasMobility", "loc" };

        private BluetoothClient client;
        private Thread readMatches;
        public string id { get; }

        public WindowFields fields { get; set; }

        public ScoutingTablet(BluetoothClient client)
        {
            this.client = client;
            this.id = parseName(client.RemoteMachineName);

            readMatches = new Thread(new ThreadStart(runReadMatches));
            readMatches.IsBackground = true;
            readMatches.Start();
        }

        ~ScoutingTablet()
        {
            readMatches.Abort();
        }

        public void runReadMatches()
        {
            string documents = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            string matchPath = Directory.CreateDirectory(documents + "\\matchLog").FullName;

            Debug.WriteLine(documents);

            while (true)
            {
                if (!client.Connected)
                {
                    Application.Current.Dispatcher.Invoke(() => 
                    { setConnected(false); setLastInfo("Lost Connection"); });

                    continue;
                }

                try
                {
                    using (StreamReader sr = new StreamReader(client.GetStream()))
                    {
                        if (sr.EndOfStream)
                        {
                            continue;
                        }

                        string[] matches = sr.ReadToEnd().Split('\n');


                        foreach (string match in matches)
                        {
                            string filename = "temp.json";

                            using (StreamWriter outputFile =
                                new StreamWriter(System.IO.Path.Combine(matchPath, filename)))
                            {
                                outputFile.WriteLine(match);
                            }
                            Application.Current.Dispatcher.Invoke(() => setLastInfo("Received Match"));
                        }
                    }
                }
                catch (Exception err)
                {
                    Debug.WriteLine(err.ToString());
                }
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

        public void setConnected(bool isConnected)
        {
            fields.isConnected.IsChecked = isConnected;
        }


        public void setLastInfo(string message)
        {
            fields.lastInfo.Text = message;
        }

        public MatchLog getMatchlog()
        {
            string matchStr;
            try
            {
                using (StreamReader sr = new StreamReader(client.GetStream()))
                {
                    matchStr = sr.ReadLine();
                }
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.ToString());
                return null;
            }
            return JsonSerializer.Deserialize<MatchLog>(matchStr);
        }

        public static string parseName(string name)
        {
            return name.Substring(name.IndexOf('-') + 1);
        }

        public static Predicate<ScoutingTablet> byId(string id)
        {
            return delegate (ScoutingTablet tablet)
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

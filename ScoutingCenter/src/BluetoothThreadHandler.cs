using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Windows;

namespace ScoutingCenter.src
{
    public class BluetoothThreadHandler
    {
        private readonly BluetoothListener listener;
        private readonly Thread thread;
        private readonly List<ScoutingTablet> tablets;
        private readonly Func<string, ScoutingTablet.WindowFields> getTabletFields;
        private readonly Func<string, ScoutingTablet.MatchAssignment> getMatchAssignment;

        public BluetoothThreadHandler(List<ScoutingTablet> tablets, 
            Func<string, ScoutingTablet.WindowFields> getTabletFields, 
            Func<string, ScoutingTablet.MatchAssignment> getMatchAssignment)
        {
            this.tablets = tablets;
            this.getTabletFields = getTabletFields;
            this.getMatchAssignment = getMatchAssignment;

            listener = new BluetoothListener(BluetoothService.SerialPort);
            thread = new Thread(new ThreadStart(run))
            {
                IsBackground = true
            };
        }

        ~BluetoothThreadHandler()
        {
            stopThread();
        }

        public void startThread()
        {
            listener.Start();
            thread.Start();
        }

        public void run()
        {
            while (true)
            {
                BluetoothClient client = listener.AcceptBluetoothClient();

                ScoutingTablet tablet = new ScoutingTablet(client);
                tablet.fields = getTabletFields(tablet.id);
                tablet.currentMatchAssignment = getMatchAssignment(tablet.id);
                tablet.startThread();

                int idx = tablets.FindIndex(ScoutingTablet.byId(tablet.id));
                if (idx > -1)
                {
                    tablets.RemoveAt(idx);
                }


                tablets.Add(tablet);

                Application.Current.Dispatcher.Invoke(() =>
                {
                    tablet.setConnected(true);
                    tablet.setLastInfo("Connected");
                });
            }
        }

        public void stopThread()
        {
            listener.Dispose();
            thread.Abort();
        }
    }
}

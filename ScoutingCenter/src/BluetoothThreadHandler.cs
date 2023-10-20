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
        private BluetoothListener listener;
        private Thread thread;
        private List<ScoutingTablet> tablets;
        private Func<string, ScoutingTablet.WindowFields> getTabletFields;

        public BluetoothThreadHandler(List<ScoutingTablet> tablets, Func<string, ScoutingTablet.WindowFields> getTabletFields)
        {
            this.tablets = tablets;
            this.getTabletFields = getTabletFields;

            listener = new BluetoothListener(BluetoothService.SerialPort);
            thread = new Thread(new ThreadStart(run));
            thread.IsBackground = true;
        }

        public void startThread()
        {
            listener.Start();
            thread.Start();
            Debug.WriteLine("Thread started");
        }

        public void run()
        {
            while(true)
            {
                BluetoothClient client = listener.AcceptBluetoothClient();

                ScoutingTablet tablet = new ScoutingTablet(client);
                tablet.fields = getTabletFields(tablet.id);

                int idx = tablets.FindIndex(ScoutingTablet.byId(tablet.id));
                if (idx > -1)
                {
                    tablets.RemoveAt(idx);
                } 

                tablets.Add(tablet);

                Application.Current.Dispatcher.Invoke(() => tablet.setConnected(true));
     
                Debug.Write("Tablet connected: ");
                Debug.WriteLine(client.RemoteMachineName);
            }
        }

        public void stopThread() {
            listener.Dispose();
            thread.Abort();
        }
    }
}

using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{
    public class BluetoothThreadHandler
    {
        private BluetoothListener listener;
        private Thread thread;
        private List<ScoutingTablet> tablets;

        public BluetoothThreadHandler(List<ScoutingTablet> tablets)
        {
            this.tablets = tablets;
            listener = new BluetoothListener(BluetoothService.SerialPort);
            thread = new Thread(new ThreadStart(run));
        }

        public void startThread()
        {
            listener.Start();
            thread.Start();
        }

        public void run()
        {
            if(listener.Pending())
            {
                BluetoothClient client = listener.AcceptBluetoothClient();
                ScoutingTablet tablet = new ScoutingTablet(client);
                tablets.Add(tablet);
            }
        }

        public void stopThread() {
            listener.Dispose();
            thread.Abort();
        }
    }
}

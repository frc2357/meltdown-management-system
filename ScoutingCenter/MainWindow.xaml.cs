using InTheHand.Net;
using InTheHand.Net.Bluetooth;
using InTheHand.Net.Sockets;
using Microsoft.VisualBasic.ApplicationServices;
using Microsoft.VisualBasic.FileIO;
using ScoutingCenter.src;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows;
using System.Xml.Linq;

namespace ScoutingCenter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private List<ScoutingTablet> tablets = new List<ScoutingTablet>();
        private BluetoothThreadHandler threadHandler;

        public MainWindow()
        {
            InitializeComponent();
            setUpScoutingCenter();
        }       

        /**
         * <summary>
         * The method that sets everything up
         * </summary>
         */
        public void setUpScoutingCenter()
        {
            threadHandler = new BluetoothThreadHandler(tablets, getTabletFields);
            threadHandler.startThread();
        }

        public ScoutingTablet.WindowFields getTabletFields(string id)
        {
            switch (id)
            {
                case "RED-1":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Red1Connected,
                        lastInfo = Red1LastInfo,
                        scouter = Red1Scouter,
                    };
                case "RED-2":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Red2Connected,
                        lastInfo = Red2LastInfo,
                        scouter = Red2Scouter,
                    };
                case "RED-3":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Red3Connected,
                        lastInfo = Red3LastInfo,
                        scouter = Red3Scouter,
                    };
                case "BLUE-1":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Blue1Connected,
                        lastInfo = Blue1LastInfo,
                        scouter = Blue1Scouter,
                    };
                case "BLUE-2":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Blue2Connected,
                        lastInfo = Blue2LastInfo,
                        scouter = Blue2Scouter,
                    };
                case "BLUE-3":
                    return new ScoutingTablet.WindowFields
                    {
                        isConnected = Blue3Connected,
                        lastInfo = Blue3LastInfo,
                        scouter = Blue3Scouter,
                    };
            }
            return null;
        }

        private void onSendAssignment(object sender, RoutedEventArgs e)
        {
            foreach (ScoutingTablet tablet in tablets)
            {
                tablet.sendAssignment();                
            }
        }
    }
}
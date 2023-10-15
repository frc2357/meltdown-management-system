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
        public MainWindow()
        {
            InitializeComponent();
            setUpScoutingCenter();
        }       

        private List<ScoutingTablet> tablets = new List<ScoutingTablet>();
        private BluetoothThreadHandler threadHandler;


        /**
         * <summary>
         * The method that sets everything up
         * </summary>
         */
        public void setUpScoutingCenter()
        {
            threadHandler = new BluetoothThreadHandler(tablets);
        }

        /**
         * <summary>
         * Satisfies the con requirement
         * </summary>
         */
        public void con(object sender, RoutedEventArgs eventArgs)
        {

        }
    }
}
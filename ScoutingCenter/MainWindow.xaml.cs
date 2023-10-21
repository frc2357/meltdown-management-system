using Microsoft.Win32;
using ScoutingCenter.src;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Windows;

namespace ScoutingCenter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private List<ScoutingTablet> tablets = new List<ScoutingTablet>();
        private BluetoothThreadHandler threadHandler;
        private MatchController matchController;
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
            matchController = new MatchController();
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

        private void onExportMatch(object sender, RoutedEventArgs e)
        {

        }
        private void onImportMatchData(object sender, RoutedEventArgs e)
        {
            matchController.importMatchCSV();
        }
    }
}
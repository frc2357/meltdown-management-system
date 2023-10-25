using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Windows.Controls;

namespace ScoutingCenter.src
{
    public class MatchController
    {
        private List<Match> matches;

        public int currentMatch { get; set; }
        public WindowFields fields { get; set; }

        public MatchController()
        {
            currentMatch = -1;
        }

        private void setWindowFields()
        {
            fields.currentMatch.Content = currentMatch;

            if (matches.Count > 0)
            {
                Match match = matches[currentMatch - 1 < 0 ? 0 : currentMatch - 1];

                fields.red1Scouter.Text = match.red1Scout;
                fields.red2Scouter.Text = match.red2Scout;
                fields.red3Scouter.Text = match.red3Scout;
                fields.blue1Scouter.Text = match.blue1Scout;
                fields.blue2Scouter.Text = match.blue2Scout;
                fields.blue3Scouter.Text = match.blue3Scout;
            }
            string label;
            if (currentMatch == -1)
            {
                label = "No Matches";
            }
            else if (currentMatch == matches.Count)
            {
                label = "Out of matches";
            }
            else
            {
                label = "Send Next Match: " + (currentMatch + 1);
            }

            fields.sendNextMatch.Content = label;
            fields.reSendMatch.Visibility = runningMatch() ?
                System.Windows.Visibility.Visible : System.Windows.Visibility.Hidden;
        }

        public void gotoNextMatch()
        {
            if (currentMatch < matches.Count && currentMatch > -1)
            {
                currentMatch++;
            }
            else
            {
                currentMatch = -1;
            }
            setWindowFields();
        }

        public bool outOfMatches()
        {
            return currentMatch > matches.Count || currentMatch == -1;
        }

        public bool runningMatch()
        {
            return currentMatch > 0 && currentMatch <= matches.Count;
        }

        public ScoutingTablet.MatchAssignment getMatchAssignment(string id)
        {
            if (!runningMatch())
            {
                return null;
            }

            Match match = matches[currentMatch - 1];
            switch (id)
            {
                case "RED-1":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.red1
                    };
                case "RED-2":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.red2
                    };
                case "RED-3":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.red3
                    };
                case "BLUE-1":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.blue1
                    };
                case "BLUE-2":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.blue2
                    };
                case "BLUE-3":
                    return new ScoutingTablet.MatchAssignment
                    {
                        matchNum = match.matchNum,
                        teamNum = match.blue3
                    };
            }
            return null;
        }

        /**
        * <summary>
        * Parses the values in the provided match file with one row (for now) and returns the values in it in a string array.
        * </summary>
        */
        public void importMatchCSV()
        {
            Stream importStream = Util.getCSVFileStream();

            if (importStream == null)
            {
                return;
            }

            matches = new List<Match>();
            try
            {
                using (TextFieldParser parser = new TextFieldParser(importStream))
                {

                    bool isFirstLine = true;
                    parser.TextFieldType = FieldType.Delimited;
                    parser.SetDelimiters(",");

                    while (!parser.EndOfData)
                    {
                        String[] matchData = parser.ReadFields();

                        if (isFirstLine)
                        {
                            isFirstLine = false;
                            continue;
                        }

                        Match match = new Match
                        {
                            matchNum = Int32.Parse(matchData[0]),
                            red1 = matchData[1],
                            red1Scout = matchData[2],
                            red2 = matchData[3],
                            red2Scout = matchData[4],
                            red3 = matchData[5],
                            red3Scout = matchData[6],
                            blue1 = matchData[7],
                            blue1Scout = matchData[8],
                            blue2 = matchData[9],
                            blue2Scout = matchData[10],
                            blue3 = matchData[11],
                            blue3Scout = matchData[12]
                        };
                        matches.Add(match);
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }

            importStream.Close();

            currentMatch = 0;
            setWindowFields();
        }

        public void exportMatchCSV()
        {
            string fileName = Util.getExportCSVFileName();

            if (string.IsNullOrWhiteSpace(fileName))
            {
                return;
            }

            string inputFolder = Util.getMatchPath(fields.eventName.Text);
            string output = Util.executePython("exportMatches.py", fileName, inputFolder);
            Debug.Write(output);
        }
        public class WindowFields
        {
            public Button reSendMatch { get; set; }
            public Button sendNextMatch { get; set; }
            public Label currentMatch { get; set; }
            public TextBox eventName { get; set; }

            public TextBox red1Scouter { get; set; }
            public TextBox red2Scouter { get; set; }
            public TextBox red3Scouter { get; set; }
            public TextBox blue1Scouter { get; set; }
            public TextBox blue2Scouter { get; set; }
            public TextBox blue3Scouter { get; set; }

        }
    }
}

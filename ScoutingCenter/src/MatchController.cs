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
        public int currentMatch { get; set; }
        public List<Match> matches;
        public WindowFields fields { get; set; }

        public MatchController()
        {
            currentMatch = -1;
        }

        private void setWindowFields()
        {
            fields.currentMatch.Content = currentMatch;

            string label = "";

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
            fields.reSendMatch.Visibility = runningMatch() ? System.Windows.Visibility.Visible : System.Windows.Visibility.Hidden;
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
            Match match = matches[currentMatch-1];
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

            if(importStream == null)
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
                            red2 = matchData[2],
                            red3 = matchData[3],
                            blue1 = matchData[4],
                            blue2 = matchData[5],
                            blue3 = matchData[6]
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

            if(string.IsNullOrWhiteSpace(fileName))
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
        }
    }
}

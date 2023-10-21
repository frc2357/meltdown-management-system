using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;

namespace ScoutingCenter.src
{
    public class MatchController
    {

        public Dictionary<int, int[]> matchDataDictionary = new Dictionary<int, int[]>();

        public MatchController()
        {
        }

        /**
        * <summary>
        * Parses the values in the provided match file with one row (for now) and returns the values in it in a string array.
        * </summary>
        */
        public void importMatchCSV()
        {
            try
            {
                using (TextFieldParser parser = new TextFieldParser(Util.getCSVFileStream()))
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

                        int matchNumber = Int32.Parse(matchData[0]);
                        int[] teamsInMatch = new int[] { Int32.Parse(matchData[1]), Int32.Parse(matchData[2]),
                            Int32.Parse(matchData[3]), Int32.Parse(matchData[4]), Int32.Parse(matchData[5]), Int32.Parse(matchData[6])};
                        matchDataDictionary.Add(matchNumber, teamsInMatch);
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
            foreach(int i in matchDataDictionary.Keys)
            {
                Debug.WriteLine($"Key: {i}");
                int[] values;
                matchDataDictionary.TryGetValue(i, out values);
                foreach (int value in values)
                {
                    Debug.WriteLine($"\tValue: {value}");
                }
            }
        }
    }
}

using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{
    public class MatchController
    {

        private 

        /**
         * <summary>
         * Parses the values in a CSV file with one row and returns the values in it in a string array.
         * </summary>
         */
        public string[] parseSingleRowCSVFile(string fileAddress)
        {
            try
            {
                using (TextFieldParser parser = new TextFieldParser(fileAddress))
                {
                    parser.TextFieldType = FieldType.Delimited;
                    parser.SetDelimiters(",");
                    while (!parser.EndOfData)
                    {
                        //Process row
                        return parser.ReadFields();
                    }
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Exception Message: " + e.Message + "\nException Stack Trace...\n" + e.StackTrace);
            }
            return new string[0];
        }
    }
}

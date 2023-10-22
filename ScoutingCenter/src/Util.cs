using Microsoft.Win32;
using System;
using System.Diagnostics;
using System.IO;

namespace ScoutingCenter.src
{
    public class Util
    {
        public static Stream getCSVFileStream()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "CSV files|*.csv",
                Multiselect = false
            };

            if (openFileDialog.ShowDialog() ?? false)
            {
                return openFileDialog.OpenFile();
            }
            return null;
        }

        public static string getExportCSVFileName()
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog
            {
                Filter = "CSV files|*.csv"
            };
            if (saveFileDialog.ShowDialog() ?? false)
            {
                return saveFileDialog.FileName;
            }
            return string.Empty;
        }

        public static string executePython(string pythonScript, string outputFileName, string inputFolder)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "src\\python\\" + pythonScript;
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = "py";
            start.Arguments = string.Format("{0} {1} {2}", path, outputFileName, inputFolder);
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            start.RedirectStandardError = true;

            using (Process process = Process.Start(start))
            {
                string result = "stdout: ";
                using (StreamReader reader = process.StandardOutput)
                {
                    result += reader.ReadToEnd();
                }

                result += "\n\nstderr: ";
                using (StreamReader reader = process.StandardError)
                {
                    result += reader.ReadToEnd();
                }

                return result;
            }
        }

        public static string getMatchPath(string eventName)
        {
            string documents = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            return Directory.CreateDirectory(documents + "\\matchLog\\" + eventName).FullName;
        }
    }
}

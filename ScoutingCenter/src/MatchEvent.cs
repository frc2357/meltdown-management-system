using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{
    public class MatchEvent
    {
        public string type { get; set; }
        public string piece { get; set; }
        public int row { get; set; }
        public int col { get; set; }
        public bool isAuto { get; set; }
        public string location { get; set; }
        public bool hasMobility { get; set; }
        public string loc { get; set; }

        public float timestamp {get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScoutingCenter.src
{
    public class MatchLog
    {
        public string teamNum { get; set; }

        public string scouterName { get; set; }
        public string matchNum { get; set; }
        public string alliance { get; set; }
        public string startPos { get; set; }
        public string preload { get; set; }
        public string notes { get; set; }

        public List<MatchEvent> events { get; set; }
    }
}

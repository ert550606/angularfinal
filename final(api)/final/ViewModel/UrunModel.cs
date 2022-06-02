using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final.ViewModel
{
    public class UrunModel
    {
        public string urunId { get; set; }
        public string urunAd { get; set; }
        public string urunKatId { get; set; }
        public string urunKatAd { get; set; }
        public int urunStok { get; set; }
        public string urunFiyat { get; set; }
    }
}
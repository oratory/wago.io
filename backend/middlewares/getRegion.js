/**
 * Detect wow region by cloudflare-identified country code
 * Used for highlighting current MDT week
 */
var regions = {
  KR: ['KR'],
  TW: ['TW'],
  CN: ['CN'],
  EU: [
    // Africa
    'AO',
    'BF',
    'BI',
    'BJ',
    'BW',
    'CD',
    'CF',
    'CG',
    'CI',
    'CM',
    'CV',
    'DJ',
    'DZ',
    'EG',
    'EH',
    'ER',
    'ET',
    'GA',
    'GH',
    'GM',
    'GN',
    'GQ',
    'GW',
    'KE',
    'KM',
    'LR',
    'LS',
    'LY',
    'MA',
    'MG',
    'ML',
    'MR',
    'MU',
    'MW',
    'MZ',
    'NA',
    'NE',
    'NG',
    'RE',
    'RW',
    'SC',
    'SD',
    'SH',
    'SL',
    'SN',
    'SO',
    'ST',
    'SZ',
    'TD',
    'TG',
    'TN',
    'TZ',
    'UG',
    'YT',
    'ZA',
    'ZM',
    'ZW',
    // Asia
    'AE',
    'AF',
    'AM',
    'AP',
    'AZ',
    'BD',
    'BH',
    'BN',
    'BT',
    'CC',
    'CX',
    'CY',
    'GE',
    'HK',
    'ID',
    'IL',
    'IN',
    'IO',
    'IQ',
    'IR',
    'JO',
    'JP',
    'KG',
    'KH',
    'KP',
    'KW',
    'KZ',
    'LA',
    'LB',
    'LK',
    'MM',
    'MN',
    'MO',
    'MV',
    'MY',
    'NP',
    'OM',
    'PH',
    'PK',
    'PS',
    'QA',
    'SA',
    'SG',
    'SY',
    'TH',
    'TJ',
    'TL',
    'TM',
    'UZ',
    'VN',
    'YE',
    // Europe
    'AD',
    'AL',
    'AT',
    'AX',
    'BA',
    'BE',
    'BG',
    'BY',
    'CH',
    'CZ',
    'DE',
    'DK',
    'EE',
    'ES',
    'EU',
    'FI',
    'FO',
    'FR',
    'FX',
    'GB',
    'GG',
    'GI',
    'GR',
    'HR',
    'HU',
    'IE',
    'IM',
    'IS',
    'IT',
    'JE',
    'LI',
    'LT',
    'LU',
    'LV',
    'MC',
    'MD',
    'ME',
    'MK',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT',
    'RO',
    'RS',
    'RU',
    'SE',
    'SI',
    'SJ',
    'SK',
    'SM',
    'TR',
    'UA',
    'VA'
  ]
}

module.exports = function(req, res, next) {
  var countryCode = req.headers['cf-ipcountry'] || ''
  var re = Object.keys(regions)
  for (let i = 0; i < re.length; i++) {
    if (regions[re[i]].indexOf(countryCode) >= 0) {
      req.wowRegion = re[i]
    }
  }
  // default to NA
  if (!req.wowRegion) {
    req.wowRegion = 'NA'
  }
  next()
}
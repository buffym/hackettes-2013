require 'rest_client'
require 'json'

RAILS_HOME = File.expand_path(File.join(File.dirname(__FILE__),".."))
require RAILS_HOME + "/config/environment"


towns = [
"Addison",
"Albany",
"Alburg",
"Andover",
"Arlington",
"Athens",
"Averill",
"Averys Gore",
"Bakersfield",
"Baltimore",
"Barnard",
"Barnet",
"Barre",
"Barton",
"Belvidere",
"Bennington",
"Benson",
"Berkshire",
"Berlin",
"Bethel",
"Bloomfield",
"Bolton",
"Bradford",
"Braintree",
"Brandon",
"Brattleboro",
"Bridgewater",
"Bridport",
"Brighton",
"Bristol",
"Brookfield",
"Brookline",
"Brownington",
"Brunswick",
"Buels Gore",
"Burke",
"Cabot",
"Calais",
"Cambridge",
"Canaan",
"Castleton",
"Cavendish",
"Charleston",
"Charlotte",
"Chelsea",
"Chester",
"Chittenden",
"Clarendon",
"Colchester",
"Concord",
"Corinth",
"Cornwall",
"Coventry",
"Craftsbury",
"Danby",
"Danville",
"Derby",
"Dorset",
"Dover",
"Dummerston",
"Duxbury",
"East Haven",
"East Montpelier",
"Eden",
"Elmore",
"Enosburg",
"Essex",
"Fair Haven",
"Fairfax",
"Fairfield",
"Fairlee",
"Fayston",
"Ferdinand",
"Ferrisburg",
"Fletcher",
"Franklin",
"Georgia",
"Glastenbury",
"Glover",
"Goshen",
"Grafton",
"Granby",
"Grand Isle",
"Granville",
"Greensboro",
"Groton",
"Guildhall",
"Guilford",
"Halifax",
"Hancock",
"Hardwick",
"Hartford",
"Hartland",
"Highgate",
"Hinesburg",
"Holland",
"Hubbardton",
"Huntington",
"Hyde Park",
"Ira",
"Irasburg",
"Isle La Motte",
"Jamaica",
"Jay",
"Jericho",
"Johnson",
"Killington",
"Kirby",
"Landgrove",
"Leicester",
"Lemington",
"Lewis",
"Lincoln",
"Londonderry",
"Lowell",
"Ludlow",
"Lunenburg",
"Lyndon",
"Maidstone",
"Manchester",
"Marlboro",
"Marshfield",
"Mendon",
"Middlebury",
"Middlesex",
"Middletown Springs",
"Milton",
"Monkton",
"Montgomery",
"Montpelier",
"Moretown",
"Morgan",
"Morristown",
"Mount Holly",
"Mount Tabor",
"New Haven",
"Newark",
"Newbury",
"Newfane",
"Newport",
"North Hero",
"Northfield",
"Norton",
"Norwich",
"Orange",
"Orwell",
"Panton",
"Pawlet",
"Peacham",
"Peru",
"Pittsfield",
"Pittsford",
"Plainfield",
"Plymouth",
"Pomfret",
"Poultney",
"Pownal",
"Proctor",
"Putney",
"Randolph",
"Reading",
"Readsboro",
"Richford",
"Richmond",
"Ripton",
"Rochester",
"Rockingham",
"Roxbury",
"Royalton",
"Rupert",
"Rutland",
"Ryegate",
"Salisbury",
"Sandgate",
"Searsburg",
"Shaftsbury",
"Sharon",
"Sheffield",
"Shelburne",
"Sheldon",
"Shoreham",
"Shrewsbury",
"Somerset",
"South Burlington",
"South Hero",
"Springfield",
"St George",
"St. Albans",
"St. Johnsbury",
"Stamford",
"Stannard",
"Starksboro",
"Stockbridge",
"Stowe",
"Strafford",
"Stratton",
"Sudbury",
"Sunderland",
"Sutton",
"Swanton",
"Thetford",
"Tinmouth",
"Topsham",
"Townshend",
"Troy",
"Tunbridge",
"Underhill",
"Unknown",
"Vergennes",
"Vernon",
"Vershire",
"Victory",
"Waitsfield",
"Walden",
"Wallingford",
"Waltham",
"Wardsboro",
"Warners Grant",
"Warren",
"Warren Gore",
"Washington",
"Waterbury",
"Waterford",
"Waterville",
"Weathersfield",
"Wells",
"West Fairlee",
"West Haven",
"West Rutland",
"West Windsor",
"Westfield",
"Westford",
"Westminster",
"Westmore",
"Weston",
"Weybridge",
"Wheelock",
"Whiting",
"Whitingham",
"Williamstown",
"Williston",
"Wilmington",
"Windham",
"Windsor",
"Winhall",
"Winooski",
"Wolcott",
"Woodbury",
"Woodford",
"Woodstock",
"Worcester",
]


towns.each do |town|
  name = town.downcase.gsub(' ', '+')
  url = "https://www.uvm.edu/landscape/api/?browse=town&TOWN=#{name}"

  puts "Getting town: #{name}"

  response = RestClient.get url, {:accept => :json}

  data = JSON.parse(response.to_s)

  data.each do |photo|
    Photo.create!(
        ls_id: photo['ls'],
        sequence: photo['sequence'],
        filename: photo['FILENAME'],
        county: photo['county'],
        town: photo['town'],
        year: photo['PHOTOYEAR'],
        description: photo['description'],
        keywords: photo['keywords'],
        latitude: photo['latitude'],
        longitude: photo['longitude'],
        url: photo['image_url'],
        utm_easting: photo['utm_easting'],
        utm_northing: photo['utm_northing'],
        location: photo['has_location'] == 1,
        photo_source: photo['PHOTOSOURCE'],
        title: photo['title']
    )
  end

  puts "Finished getting #{name}"
  sleep 1
end




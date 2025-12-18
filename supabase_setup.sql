-- Supabase Setup for BestUSNationalParks.com
-- Run in Supabase SQL Editor
-- Prefix: parks

-- ===========================================
-- MAIN LOCATIONS TABLE
-- ===========================================
CREATE TABLE parks_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL,                    -- Primary state
    states TEXT[],                           -- Array for multi-state parks (Yellowstone spans 3)
    region TEXT NOT NULL,                   -- West, Alaska, Southeast, Northeast, Midwest, Islands
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    established DATE,                        -- Date park was established
    size_acres INTEGER,                      -- Park size in acres
    annual_visitors INTEGER DEFAULT 0,       -- Annual visitor count
    entrance_fee DECIMAL(6, 2) DEFAULT 0,    -- Standard entrance fee
    reservation_required BOOLEAN DEFAULT false,
    best_seasons TEXT[],                     -- Array: ['spring', 'summer', 'fall', 'winter']
    difficulty TEXT DEFAULT 'moderate',      -- family, moderate, challenging, expert
    description TEXT,
    ai_description TEXT,
    things_to_do TEXT[],                     -- Array of activities
    top_hikes JSONB DEFAULT '[]',            -- [{name, distance, difficulty, elevation_gain}]
    wildlife TEXT[],                         -- Array of animals
    weather_notes TEXT,
    insider_tips TEXT[],
    nearest_airports TEXT[],
    gateway_cities TEXT[],
    photo_url TEXT,
    features JSONB DEFAULT '{}',             -- {camping, lodging, rv_facilities, wheelchair_accessible, dog_friendly}
    nps_url TEXT,                            -- Link to official NPS page
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_parks_locations_state ON parks_locations(state);
CREATE INDEX idx_parks_locations_region ON parks_locations(region);
CREATE INDEX idx_parks_locations_slug ON parks_locations(slug);
CREATE INDEX idx_parks_locations_visitors ON parks_locations(annual_visitors DESC);

-- ===========================================
-- SUBMISSIONS TABLE (User Tips/Corrections)
-- ===========================================
CREATE TABLE parks_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    park_name TEXT,                          -- Which park this relates to
    park_id UUID REFERENCES parks_locations(id),
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    suggestion_type TEXT DEFAULT 'tip',      -- correction, tip, photo, other
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',           -- pending, approved, rejected
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- CONTACT MESSAGES TABLE
-- ===========================================
CREATE TABLE parks_contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- ROW LEVEL SECURITY
-- ===========================================
ALTER TABLE parks_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE parks_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parks_contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access to locations
CREATE POLICY "Public read access" ON parks_locations
    FOR SELECT USING (true);

-- Public insert for submissions
CREATE POLICY "Public insert submissions" ON parks_submissions
    FOR INSERT WITH CHECK (true);

-- Public insert for contact messages
CREATE POLICY "Public insert contact" ON parks_contact_messages
    FOR INSERT WITH CHECK (true);

-- ===========================================
-- REGISTER IN SITES TABLE
-- ===========================================
-- Note: 'slug' is derived from 'id' in the Directory Factory code
INSERT INTO sites (id, name, table_name, site_type, domain)
VALUES (
    'parks',
    'Best US National Parks',
    'parks_locations',
    'place',
    'bestusnationalparks.com'
);

-- ===========================================
-- SAMPLE DATA (Top 10 Parks)
-- ===========================================
INSERT INTO parks_locations (name, slug, state, states, region, latitude, longitude, established, size_acres, annual_visitors, entrance_fee, reservation_required, best_seasons, difficulty, description, things_to_do, wildlife, features, nps_url)
VALUES
(
    'Great Smoky Mountains',
    'great-smoky-mountains',
    'Tennessee',
    ARRAY['Tennessee', 'North Carolina'],
    'Southeast',
    35.6532,
    -83.5070,
    '1934-06-15',
    522427,
    12900000,
    0.00,
    false,
    ARRAY['spring', 'fall'],
    'family',
    'America''s most visited national park spans the border of Tennessee and North Carolina, featuring ancient mountains, diverse wildlife, and the largest collection of log structures in the country.',
    ARRAY['Hiking Clingmans Dome', 'Cades Cove scenic drive', 'Waterfall hunting', 'Wildlife viewing', 'Historic buildings tour'],
    ARRAY['Black bear', 'White-tailed deer', 'Wild turkey', 'Elk', 'Salamanders'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/grsm'
),
(
    'Grand Canyon',
    'grand-canyon',
    'Arizona',
    ARRAY['Arizona'],
    'West',
    36.0544,
    -112.1401,
    '1919-02-26',
    1217262,
    6400000,
    35.00,
    false,
    ARRAY['spring', 'fall'],
    'moderate',
    'The Grand Canyon is a steep-sided canyon carved by the Colorado River, exposing nearly 2 billion years of Earth''s geological history. One of the most spectacular examples of erosion anywhere on Earth.',
    ARRAY['South Rim viewpoints', 'Bright Angel Trail', 'Mule rides', 'Colorado River rafting', 'Sunset at Desert View'],
    ARRAY['California condor', 'Mule deer', 'Elk', 'Mountain lion', 'Bighorn sheep'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/grca'
),
(
    'Zion',
    'zion',
    'Utah',
    ARRAY['Utah'],
    'West',
    37.2982,
    -113.0263,
    '1919-11-19',
    147243,
    4700000,
    35.00,
    true,
    ARRAY['spring', 'fall'],
    'challenging',
    'Zion Canyon''s towering red and cream sandstone cliffs create a dramatic landscape. The Virgin River runs through the heart of the park, and Angels Landing offers one of America''s most thrilling hikes.',
    ARRAY['Angels Landing', 'The Narrows', 'Observation Point', 'Emerald Pools', 'Canyon Overlook Trail'],
    ARRAY['Mule deer', 'Desert bighorn sheep', 'California condor', 'Mexican spotted owl', 'Peregrine falcon'],
    '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/zion'
),
(
    'Yellowstone',
    'yellowstone',
    'Wyoming',
    ARRAY['Wyoming', 'Montana', 'Idaho'],
    'West',
    44.4280,
    -110.5885,
    '1872-03-01',
    2219791,
    4900000,
    35.00,
    false,
    ARRAY['summer', 'winter'],
    'family',
    'The world''s first national park and home to half of Earth''s geothermal features. Yellowstone is famous for Old Faithful, colorful hot springs, abundant wildlife, and dramatic canyons.',
    ARRAY['Old Faithful', 'Grand Prismatic Spring', 'Yellowstone Lake', 'Mammoth Hot Springs', 'Lamar Valley wildlife'],
    ARRAY['Bison', 'Grizzly bear', 'Gray wolf', 'Elk', 'Moose'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/yell'
),
(
    'Rocky Mountain',
    'rocky-mountain',
    'Colorado',
    ARRAY['Colorado'],
    'West',
    40.3428,
    -105.6836,
    '1915-01-26',
    265461,
    4700000,
    30.00,
    true,
    ARRAY['summer', 'fall'],
    'moderate',
    'Rocky Mountain National Park features majestic mountain environments, including Trail Ridge Road - the highest continuous paved road in North America. Home to alpine tundra, forests, and abundant wildlife.',
    ARRAY['Trail Ridge Road', 'Bear Lake', 'Longs Peak', 'Alberta Falls', 'Elk viewing'],
    ARRAY['Elk', 'Mule deer', 'Bighorn sheep', 'Black bear', 'Moose'],
    '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/romo'
),
(
    'Acadia',
    'acadia',
    'Maine',
    ARRAY['Maine'],
    'Northeast',
    44.3386,
    -68.2733,
    '1919-02-26',
    49075,
    4100000,
    35.00,
    true,
    ARRAY['summer', 'fall'],
    'family',
    'Acadia preserves the Atlantic coast''s granite-domed mountains, woodlands, and rocky shorelines. Cadillac Mountain is the first place to see sunrise in the United States from October to March.',
    ARRAY['Cadillac Mountain sunrise', 'Park Loop Road', 'Jordan Pond House', 'Thunder Hole', 'Carriage roads biking'],
    ARRAY['White-tailed deer', 'Harbor seal', 'Peregrine falcon', 'Black bear', 'Puffin'],
    '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}',
    'https://www.nps.gov/acad'
),
(
    'Yosemite',
    'yosemite',
    'California',
    ARRAY['California'],
    'West',
    37.8651,
    -119.5383,
    '1890-10-01',
    761268,
    3900000,
    35.00,
    true,
    ARRAY['spring', 'summer', 'fall'],
    'moderate',
    'Yosemite is world-renowned for its granite cliffs, waterfalls, giant sequoia groves, and biological diversity. Half Dome and El Capitan are iconic landmarks that draw climbers from around the world.',
    ARRAY['Yosemite Falls', 'Half Dome', 'El Capitan viewing', 'Glacier Point', 'Mariposa Grove'],
    ARRAY['Black bear', 'Mule deer', 'Coyote', 'Peregrine falcon', 'Great gray owl'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/yose'
),
(
    'Grand Teton',
    'grand-teton',
    'Wyoming',
    ARRAY['Wyoming'],
    'West',
    43.7904,
    -110.6818,
    '1929-02-26',
    310044,
    3500000,
    35.00,
    false,
    ARRAY['summer', 'fall'],
    'moderate',
    'Rising above Jackson Hole valley, the Teton Range is the youngest mountain range in the Rockies. The park features pristine lakes, abundant wildlife, and world-class mountaineering.',
    ARRAY['Jenny Lake', 'Cascade Canyon', 'Mormon Row', 'Oxbow Bend', 'Laurance S. Rockefeller Preserve'],
    ARRAY['Moose', 'Elk', 'Bison', 'Grizzly bear', 'Bald eagle'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/grte'
),
(
    'Glacier',
    'glacier',
    'Montana',
    ARRAY['Montana'],
    'West',
    48.7596,
    -113.7870,
    '1910-05-11',
    1013322,
    3100000,
    35.00,
    true,
    ARRAY['summer'],
    'challenging',
    'Glacier National Park preserves over 1 million acres of forests, alpine meadows, and lakes. The Crown of the Continent ecosystem is one of the most intact natural areas in the temperate zones.',
    ARRAY['Going-to-the-Sun Road', 'Highline Trail', 'Many Glacier', 'Lake McDonald', 'Grinnell Glacier'],
    ARRAY['Grizzly bear', 'Mountain goat', 'Moose', 'Gray wolf', 'Bighorn sheep'],
    '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/glac'
),
(
    'Joshua Tree',
    'joshua-tree',
    'California',
    ARRAY['California'],
    'West',
    33.8734,
    -115.9010,
    '1994-10-31',
    790636,
    3000000,
    30.00,
    false,
    ARRAY['fall', 'winter', 'spring'],
    'moderate',
    'Joshua Tree is where the Mojave and Colorado deserts meet, creating a unique landscape of twisted Joshua trees, granite monoliths, and gold mining history. A world-class rock climbing destination.',
    ARRAY['Keys View', 'Skull Rock', 'Cholla Cactus Garden', 'Rock climbing', 'Stargazing'],
    ARRAY['Desert tortoise', 'Bighorn sheep', 'Coyote', 'Roadrunner', 'Tarantula'],
    '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}',
    'https://www.nps.gov/jotr'
);

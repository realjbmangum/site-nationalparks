-- All 63 US National Parks Data
-- Run this to populate the parks_locations table

INSERT INTO parks_locations (name, slug, state, states, region, latitude, longitude, established, size_acres, annual_visitors, entrance_fee, reservation_required, difficulty, nps_url, photo_url, features) VALUES

-- ALASKA (8 parks)
('Denali', 'denali', 'Alaska', ARRAY['Alaska'], 'alaska', 63.1148, -151.1926, '1917-02-26', 6045153, 600000, 15, true, 'challenging', 'https://www.nps.gov/dena/', 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Gates of the Arctic', 'gates-of-the-arctic', 'Alaska', ARRAY['Alaska'], 'alaska', 67.7863, -153.3017, '1980-12-02', 8472506, 10000, 0, false, 'expert', 'https://www.nps.gov/gaar/', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Glacier Bay', 'glacier-bay', 'Alaska', ARRAY['Alaska'], 'alaska', 58.6658, -136.9000, '1980-12-02', 3223384, 700000, 0, false, 'moderate', 'https://www.nps.gov/glba/', 'https://images.unsplash.com/photo-1531179234836-bb38c33ff56d?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Katmai', 'katmai', 'Alaska', ARRAY['Alaska'], 'alaska', 58.5970, -155.0170, '1980-12-02', 3674530, 80000, 0, false, 'challenging', 'https://www.nps.gov/katm/', 'https://images.unsplash.com/photo-1564517013001-b0e9ad3b0e8d?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Kenai Fjords', 'kenai-fjords', 'Alaska', ARRAY['Alaska'], 'alaska', 59.9224, -149.6525, '1980-12-02', 669984, 400000, 0, false, 'moderate', 'https://www.nps.gov/kefj/', 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Kobuk Valley', 'kobuk-valley', 'Alaska', ARRAY['Alaska'], 'alaska', 67.3556, -159.1289, '1980-12-02', 1750717, 15000, 0, false, 'expert', 'https://www.nps.gov/kova/', 'https://images.unsplash.com/photo-1517783999520-f068a0e6d0fd?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Lake Clark', 'lake-clark', 'Alaska', ARRAY['Alaska'], 'alaska', 60.4127, -154.3235, '1980-12-02', 2619733, 20000, 0, false, 'expert', 'https://www.nps.gov/lacl/', 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Wrangell-St. Elias', 'wrangell-st-elias', 'Alaska', ARRAY['Alaska'], 'alaska', 61.0000, -142.0000, '1980-12-02', 13175799, 80000, 0, false, 'expert', 'https://www.nps.gov/wrst/', 'https://images.unsplash.com/photo-1494791286192-53e7b27e4adf?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

-- WEST (25 parks)
('Arches', 'arches', 'Utah', ARRAY['Utah'], 'west', 38.7331, -109.5925, '1971-11-12', 76679, 1800000, 30, true, 'moderate', 'https://www.nps.gov/arch/', 'https://images.unsplash.com/photo-1605999211553-89b33e0a0a73?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Badlands', 'badlands', 'South Dakota', ARRAY['South Dakota'], 'west', 43.8554, -102.3397, '1978-11-10', 242756, 1000000, 30, false, 'family', 'https://www.nps.gov/badl/', 'https://images.unsplash.com/photo-1619468129361-605ebea10b44?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Big Bend', 'big-bend', 'Texas', ARRAY['Texas'], 'west', 29.2500, -103.2500, '1944-06-12', 801163, 500000, 30, false, 'challenging', 'https://www.nps.gov/bibe/', 'https://images.unsplash.com/photo-1552944150-6dd1180e5999?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Black Canyon of the Gunnison', 'black-canyon-of-the-gunnison', 'Colorado', ARRAY['Colorado'], 'west', 38.5754, -107.7416, '1999-10-21', 30750, 300000, 30, false, 'challenging', 'https://www.nps.gov/blca/', 'https://images.unsplash.com/photo-1627662235844-5f2a8f3b15f4?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Bryce Canyon', 'bryce-canyon', 'Utah', ARRAY['Utah'], 'west', 37.5930, -112.1871, '1928-02-25', 35835, 2500000, 35, false, 'moderate', 'https://www.nps.gov/brca/', 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Canyonlands', 'canyonlands', 'Utah', ARRAY['Utah'], 'west', 38.3269, -109.8783, '1964-09-12', 337598, 900000, 30, false, 'challenging', 'https://www.nps.gov/cany/', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Capitol Reef', 'capitol-reef', 'Utah', ARRAY['Utah'], 'west', 38.2000, -111.1667, '1971-12-18', 241904, 1200000, 20, false, 'moderate', 'https://www.nps.gov/care/', 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Carlsbad Caverns', 'carlsbad-caverns', 'New Mexico', ARRAY['New Mexico'], 'west', 32.1232, -104.5567, '1930-05-14', 46766, 500000, 15, true, 'family', 'https://www.nps.gov/cave/', 'https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Channel Islands', 'channel-islands', 'California', ARRAY['California'], 'west', 34.0069, -119.7785, '1980-03-05', 249561, 400000, 0, false, 'challenging', 'https://www.nps.gov/chis/', 'https://images.unsplash.com/photo-1590071089561-a8a79c4b4e4c?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Death Valley', 'death-valley', 'California', ARRAY['California', 'Nevada'], 'west', 36.5054, -117.0794, '1994-10-31', 3408407, 1700000, 30, false, 'challenging', 'https://www.nps.gov/deva/', 'https://images.unsplash.com/photo-1544080923-b4d28fb2c1fd?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Grand Canyon', 'grand-canyon', 'Arizona', ARRAY['Arizona'], 'west', 36.1070, -112.1130, '1919-02-26', 1201647, 6400000, 35, true, 'moderate', 'https://www.nps.gov/grca/', 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Grand Teton', 'grand-teton', 'Wyoming', ARRAY['Wyoming'], 'west', 43.7904, -110.6818, '1929-02-26', 310044, 3500000, 35, false, 'moderate', 'https://www.nps.gov/grte/', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Great Basin', 'great-basin', 'Nevada', ARRAY['Nevada'], 'west', 38.9833, -114.3000, '1986-10-27', 77180, 150000, 0, false, 'moderate', 'https://www.nps.gov/grba/', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Great Sand Dunes', 'great-sand-dunes', 'Colorado', ARRAY['Colorado'], 'west', 37.7329, -105.5122, '2004-09-13', 107342, 600000, 25, false, 'moderate', 'https://www.nps.gov/grsa/', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Guadalupe Mountains', 'guadalupe-mountains', 'Texas', ARRAY['Texas'], 'west', 31.8916, -104.8608, '1972-10-15', 86367, 200000, 10, false, 'challenging', 'https://www.nps.gov/gumo/', 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Joshua Tree', 'joshua-tree', 'California', ARRAY['California'], 'west', 33.8734, -115.9010, '1994-10-31', 795156, 3000000, 30, false, 'moderate', 'https://www.nps.gov/jotr/', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Lassen Volcanic', 'lassen-volcanic', 'California', ARRAY['California'], 'west', 40.4977, -121.4207, '1916-08-09', 106452, 500000, 30, false, 'moderate', 'https://www.nps.gov/lavo/', 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Mesa Verde', 'mesa-verde', 'Colorado', ARRAY['Colorado'], 'west', 37.2309, -108.4618, '1906-06-29', 52485, 600000, 30, true, 'moderate', 'https://www.nps.gov/meve/', 'https://images.unsplash.com/photo-1516687401797-25297ff1462c?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Mount Rainier', 'mount-rainier', 'Washington', ARRAY['Washington'], 'west', 46.8800, -121.7269, '1899-03-02', 236382, 2000000, 30, false, 'challenging', 'https://www.nps.gov/mora/', 'https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('North Cascades', 'north-cascades', 'Washington', ARRAY['Washington'], 'west', 48.7718, -121.2985, '1968-10-02', 504781, 30000, 0, false, 'challenging', 'https://www.nps.gov/noca/', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Olympic', 'olympic', 'Washington', ARRAY['Washington'], 'west', 47.8021, -123.6044, '1938-06-29', 922651, 3500000, 30, false, 'moderate', 'https://www.nps.gov/olym/', 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Petrified Forest', 'petrified-forest', 'Arizona', ARRAY['Arizona'], 'west', 34.9100, -109.8068, '1962-12-09', 221415, 800000, 25, false, 'family', 'https://www.nps.gov/pefo/', 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Pinnacles', 'pinnacles', 'California', ARRAY['California'], 'west', 36.4906, -121.1825, '2013-01-10', 26686, 350000, 30, false, 'moderate', 'https://www.nps.gov/pinn/', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Redwood', 'redwood', 'California', ARRAY['California'], 'west', 41.2132, -124.0046, '1968-10-02', 138999, 500000, 0, false, 'family', 'https://www.nps.gov/redw/', 'https://images.unsplash.com/photo-1427435300977-dc78fa3d51e0?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Rocky Mountain', 'rocky-mountain', 'Colorado', ARRAY['Colorado'], 'west', 40.3428, -105.6836, '1915-01-26', 265807, 4700000, 30, true, 'moderate', 'https://www.nps.gov/romo/', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Saguaro', 'saguaro', 'Arizona', ARRAY['Arizona'], 'west', 32.2500, -110.5000, '1994-10-14', 92867, 1000000, 25, false, 'family', 'https://www.nps.gov/sagu/', 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Sequoia', 'sequoia', 'California', ARRAY['California'], 'west', 36.4864, -118.5658, '1890-09-25', 404064, 1200000, 35, false, 'moderate', 'https://www.nps.gov/seki/', 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Theodore Roosevelt', 'theodore-roosevelt', 'North Dakota', ARRAY['North Dakota'], 'west', 46.9790, -103.4379, '1978-11-10', 70447, 600000, 30, false, 'family', 'https://www.nps.gov/thro/', 'https://images.unsplash.com/photo-1564517013001-b0e9ad3b0e8d?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('White Sands', 'white-sands', 'New Mexico', ARRAY['New Mexico'], 'west', 32.7872, -106.3257, '2019-12-20', 146344, 600000, 25, false, 'family', 'https://www.nps.gov/whsa/', 'https://images.unsplash.com/photo-1571072544706-38d5dd3ff2bf?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Yellowstone', 'yellowstone', 'Wyoming', ARRAY['Wyoming', 'Montana', 'Idaho'], 'west', 44.4280, -110.5885, '1872-03-01', 2219791, 4900000, 35, false, 'family', 'https://www.nps.gov/yell/', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Yosemite', 'yosemite', 'California', ARRAY['California'], 'west', 37.8651, -119.5383, '1890-10-01', 761748, 3900000, 35, true, 'moderate', 'https://www.nps.gov/yose/', 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Zion', 'zion', 'Utah', ARRAY['Utah'], 'west', 37.2982, -113.0263, '1919-11-19', 147243, 4700000, 35, true, 'challenging', 'https://www.nps.gov/zion/', 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

-- SOUTHEAST (12 parks)
('Biscayne', 'biscayne', 'Florida', ARRAY['Florida'], 'southeast', 25.4824, -80.2083, '1980-06-28', 172971, 700000, 0, false, 'family', 'https://www.nps.gov/bisc/', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Congaree', 'congaree', 'South Carolina', ARRAY['South Carolina'], 'southeast', 33.7948, -80.7821, '2003-11-10', 26476, 250000, 0, false, 'family', 'https://www.nps.gov/cong/', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Dry Tortugas', 'dry-tortugas', 'Florida', ARRAY['Florida'], 'southeast', 24.6285, -82.8732, '1992-10-26', 64701, 80000, 15, false, 'moderate', 'https://www.nps.gov/drto/', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Everglades', 'everglades', 'Florida', ARRAY['Florida'], 'southeast', 25.2866, -80.8987, '1947-12-06', 1508939, 1100000, 30, false, 'family', 'https://www.nps.gov/ever/', 'https://images.unsplash.com/photo-1590417975549-77eb1af4b5d0?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Great Smoky Mountains', 'great-smoky-mountains', 'Tennessee', ARRAY['Tennessee', 'North Carolina'], 'southeast', 35.6532, -83.5070, '1934-06-15', 522427, 12900000, 0, true, 'family', 'https://www.nps.gov/grsm/', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Hot Springs', 'hot-springs', 'Arkansas', ARRAY['Arkansas'], 'southeast', 34.5217, -93.0424, '1921-03-04', 5554, 2000000, 0, false, 'family', 'https://www.nps.gov/hosp/', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Mammoth Cave', 'mammoth-cave', 'Kentucky', ARRAY['Kentucky'], 'southeast', 37.1870, -86.1005, '1941-07-01', 54012, 500000, 0, true, 'family', 'https://www.nps.gov/maca/', 'https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('New River Gorge', 'new-river-gorge', 'West Virginia', ARRAY['West Virginia'], 'southeast', 37.9775, -81.0816, '2020-12-27', 72808, 1700000, 0, false, 'moderate', 'https://www.nps.gov/neri/', 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Shenandoah', 'shenandoah', 'Virginia', ARRAY['Virginia'], 'southeast', 38.4755, -78.4535, '1935-12-26', 199224, 1400000, 30, false, 'family', 'https://www.nps.gov/shen/', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

-- NORTHEAST (4 parks)
('Acadia', 'acadia', 'Maine', ARRAY['Maine'], 'northeast', 44.3500, -68.2167, '1919-02-26', 49075, 4100000, 35, true, 'family', 'https://www.nps.gov/acad/', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Cuyahoga Valley', 'cuyahoga-valley', 'Ohio', ARRAY['Ohio'], 'northeast', 41.2808, -81.5678, '2000-10-11', 32572, 2800000, 0, false, 'family', 'https://www.nps.gov/cuva/', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

('Indiana Dunes', 'indiana-dunes', 'Indiana', ARRAY['Indiana'], 'northeast', 41.6533, -87.0524, '2019-02-15', 15349, 3600000, 0, false, 'family', 'https://www.nps.gov/indu/', 'https://images.unsplash.com/photo-1500534623283-d30ee8252bb8?w=1200', '{"camping": true, "lodging": false, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": true}'::jsonb),

-- MIDWEST (7 parks)
('Gateway Arch', 'gateway-arch', 'Missouri', ARRAY['Missouri'], 'midwest', 38.6247, -90.1848, '2018-02-22', 91, 2000000, 0, false, 'family', 'https://www.nps.gov/jeff/', 'https://images.unsplash.com/photo-1577473961960-edb6e3b5df62?w=1200', '{"camping": false, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Isle Royale', 'isle-royale', 'Michigan', ARRAY['Michigan'], 'midwest', 48.0000, -88.8333, '1940-04-03', 571790, 25000, 7, false, 'challenging', 'https://www.nps.gov/isro/', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Voyageurs', 'voyageurs', 'Minnesota', ARRAY['Minnesota'], 'midwest', 48.4839, -92.8333, '1975-04-08', 218200, 240000, 0, false, 'moderate', 'https://www.nps.gov/voya/', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Wind Cave', 'wind-cave', 'South Dakota', ARRAY['South Dakota'], 'midwest', 43.5724, -103.4837, '1903-01-09', 33971, 700000, 0, true, 'family', 'https://www.nps.gov/wica/', 'https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

-- ISLANDS (7 parks)
('American Samoa', 'american-samoa', 'American Samoa', ARRAY['American Samoa'], 'islands', -14.2583, -170.6833, '1988-10-31', 8257, 5000, 0, false, 'moderate', 'https://www.nps.gov/npsa/', 'https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=1200', '{"camping": false, "lodging": false, "rv_facilities": false, "wheelchair_accessible": false, "dog_friendly": false}'::jsonb),

('Haleakala', 'haleakala', 'Hawaii', ARRAY['Hawaii'], 'islands', 20.7204, -156.1552, '1961-07-01', 33265, 1000000, 30, true, 'moderate', 'https://www.nps.gov/hale/', 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Hawaii Volcanoes', 'hawaii-volcanoes', 'Hawaii', ARRAY['Hawaii'], 'islands', 19.4194, -155.2885, '1916-08-01', 335259, 1300000, 30, false, 'moderate', 'https://www.nps.gov/havo/', 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1200', '{"camping": true, "lodging": true, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Virgin Islands', 'virgin-islands', 'US Virgin Islands', ARRAY['US Virgin Islands'], 'islands', 18.3358, -64.7505, '1956-08-02', 15052, 300000, 0, false, 'family', 'https://www.nps.gov/viis/', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200', '{"camping": true, "lodging": false, "rv_facilities": false, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

-- Final parks to reach 63
('Glacier', 'glacier', 'Montana', ARRAY['Montana'], 'west', 48.7596, -113.7870, '1910-05-11', 1013125, 3100000, 35, true, 'challenging', 'https://www.nps.gov/glac/', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Kings Canyon', 'kings-canyon', 'California', ARRAY['California'], 'west', 36.8879, -118.5551, '1940-03-04', 461901, 700000, 35, false, 'challenging', 'https://www.nps.gov/seki/', 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb),

('Crater Lake', 'crater-lake', 'Oregon', ARRAY['Oregon'], 'west', 42.9446, -122.1090, '1902-05-22', 183224, 700000, 30, false, 'moderate', 'https://www.nps.gov/crla/', 'https://images.unsplash.com/photo-1500534623283-d30ee8252bb8?w=1200', '{"camping": true, "lodging": true, "rv_facilities": true, "wheelchair_accessible": true, "dog_friendly": false}'::jsonb)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  state = EXCLUDED.state,
  states = EXCLUDED.states,
  region = EXCLUDED.region,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  established = EXCLUDED.established,
  size_acres = EXCLUDED.size_acres,
  annual_visitors = EXCLUDED.annual_visitors,
  entrance_fee = EXCLUDED.entrance_fee,
  reservation_required = EXCLUDED.reservation_required,
  difficulty = EXCLUDED.difficulty,
  nps_url = EXCLUDED.nps_url,
  photo_url = EXCLUDED.photo_url,
  features = EXCLUDED.features;

-- Verify count
SELECT COUNT(*) as total_parks FROM parks_locations;

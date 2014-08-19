# Metric Types
MetricType.attr_accessible :min, :max, :name
mets = [
        {name:'pH', min: 0, max: 0},
        {name:'precipitation description'},
        {name:'land description'},
        {name:'turbidity (NTU)'},
        {name:'water temperature (C)',min: -30, max: 80},
        {name:'dissolved oxygen (ppm)'},
        {name:'air temperature (C)',min: -30, max: 80},
]
MetricType.create(mets)

# Report Types
ReportType.attr_accessible :auth_required
reps = [
        {name:'default', auth_required: 0}
]
ReportType.create(reps)

# Users
User.attr_accessible :admin, :guardian, :token
first = [['Jacob', 'Mason', 'Ethan', 'Noah', 'William', 'Liam', 'Jayden', 'Michael', 'Alexander', 'Aiden'],['Sophia', 'Emma', 'Isabella', 'Olivia', 'Ava', 'Emily', 'Abigail', 'Mia', 'Madison', 'Elizabeth']]
last = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White']

# Animals (244)
animals = ['Animal', 'Aardvark', 'Albatross', 'Alligator', 'Alpaca', 'Ant', 'Anteater', 'Antelope', 'Ape', 'Armadillo', 'Ass/Donkey', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear', 'Beaver', 'Bee', 'Bison', 'Boar (wild pig)', 'Also see Pig', 'Buffalo, African (for American buffalo, see Bison)', 'Butterfly', 'Camel', 'Capybara', 'Caribou', 'Cassowary', 'Cat', 'Caterpillar', 'Cattle[note 3]', 'Chamois', 'Cheetah', 'Chicken', 'Chimpanzee', 'Chinchilla', 'Chough', 'Clam', 'Cobra', 'Cockroach', 'Cod', 'Cormorant', 'Coyote', 'Crab', 'Crane', 'Crocodile', 'Crow', 'Curlew', 'Deer', 'Dinosaur', 'Dog', 'Dogfish', 'Dolphin', 'Donkey - See Ass', 'Dotterel', 'Dove', 'Dragonfly', 'Duck', 'Also see Mallard', 'Dugong', 'Dunlin', 'Eagle', 'Echidna', 'Eel', 'Eland', 'Elephant', 'Elephant seal', 'Elk (wapiti)', 'Emu', 'Falcon', 'Ferret', 'Finch', 'Fish', 'Flamingo', 'Fly', 'Fox', 'Frog', 'Gaur', 'Gazelle', 'Gerbil', 'Giant Panda', 'Giraffe', 'Gnat', 'Gnu', 'Goat', 'Goldfinch', 'Goldfish', 'Goose', 'Gorilla', 'Goshawk', 'Grasshopper', 'Grouse', 'Guanaco', 'Guinea fowl', 'Guinea pig', 'Gull', 'Hamster', 'Hare', 'Hawk', 'Hedgehog', 'Heron', 'Herring', 'Hippopotamus', 'Hornet', 'Horse', 'Human', 'Hummingbird', 'Hyena', 'Ibex', 'Ibis', 'Jackal', 'Jaguar', 'Jay', 'Jay, Blue', 'Jellyfish', 'Kangaroo', 'Kingfisher', 'Koala', 'Komodo dragon', 'Kookabura', 'Kouprey', 'Kudu', 'Lapwing', 'Lark', 'Lemur', 'Leopard', 'Lion', 'Llama', 'Lobster', 'Locust', 'Loris', 'Louse', 'Lyrebird', 'Magpie', 'Mallard', 'Also see Duck', 'Manatee', 'Mandrill', 'Mantis', 'Marten', 'Meerkat', 'Mink', 'Mole', 'Mongoose', 'Monkey', 'Moose', 'Mosquito', 'Mouse', 'Mule', 'Narwhal', 'Newt', 'Nightingale', 'Octopus', 'Okapi', 'Opossum', 'Oryx', 'Ostrich', 'Otter', 'Owl', 'Ox', 'Oyster', 'Panther', 'Parrot', 'Partridge', 'Peafowl', 'Pelican', 'Penguin', 'Pheasant', 'Pig', 'Also see Boar', 'Pigeon', 'Polar Bear', 'Pony- See Horse', 'Porcupine', 'Porpoise', 'Prairie Dog', 'Quail', 'Quelea', 'Quetzal', 'Rabbit', 'Raccoon', 'Rail', 'Ram', 'Also see Sheep', 'Rat', 'Raven', 'Red deer', 'Red panda', 'Reindeer (caribou)', 'Rhinoceros', 'Rook', 'Salamander', 'Salmon', 'Sand Dollar', 'Sandpiper', 'Sardine', 'Scorpion', 'Sea lion', 'Sea Urchin', 'Seahorse', 'Seal', 'Shark', 'Sheep', 'Also see Ram', 'Shrew', 'Skunk', 'Snail', 'Snake', 'Sparrow', 'Spider', 'Spoonbill', 'Squid', 'Squirrel', 'Starling', 'Stingray', 'Stinkbug', 'Stork', 'Swallow', 'Swan', 'Tapir', 'Tarsier', 'Termite', 'Tiger', 'Toad', 'Trout', 'Turkey', 'Turtle', 'Vicu\xc3\xb1a', 'Viper', 'Vulture', 'Wallaby', 'Walrus', 'Wasp', 'Water buffalo', 'Weasel', 'Whale', 'Wolf', 'Wolverine', 'Wombat', 'Woodcock', 'Woodpecker', 'Worm', 'Wren', 'Yak', 'Zebra']


users = []
for i in 0..10
  fname = first[rand(2)][rand(10)]
  lname = last[rand(20)]
  admin = (rand(2) > 0) ? true : false
  u = {
    first_name: fname,    
    last_name: lname,
    email: fname+'.'+lname+'@test.com',
    admin: admin,
    guardian: (admin) ? true : ((rand(2) > 0) ? true : false),
    token: (0...8).map { (65 + rand(26)).chr }.join        
  }
  u = User.create(u)
  u.skip_confirmation!
  u.password = 'password'
  u.save
  users.push(u)
end
users.each do |u|
  # Observations, Metrics, Report
  Observation.attr_accessible :user_id
  num = rand(10)
  for i in 0..num
    obs = {
      user_id: u.id,
      lat: 180*rand()-90,
      lon: 360*rand()-180,
      timestamp: Time.now.to_i,
      participants: rand(4),
      guardian: u.guardian,
      rcs_test_kit_use: rand(2),
      photo: 'http://lorempixel.com/400/200/'
    }    
    o = Observation.create(obs)
    o.save
    # Metrics    
    Metric.attr_accessible :observation_id, :metric_type_id
    num = rand(3)
    for j in 0..num
      met = {
        observation_id: o.id,
        metric_type_id: rand(7)+1,
        value: 100*rand()
      }
      m = Metric.create(met)
      m.save
    end
    # Reports
    Report.attr_accessible :user_id, :report_type_id
    num = rand(5)
    for j in 0..num
      rep = {
        user_id: u.id,
        report_type_id: 1,
        lat: 180*rand()-90,
        lon: 360*rand()-180,
        message: "Whoa! Just saw a "+animals[rand(244)]+".",
        photo: 'http://lorempixel.com/400/200/animals/'
      }
      r = Report.create(rep)
      r.save
    end
  end
end

# News
News.attr_accessible :user_id, :for
scripts = ['Just caught a Angelfish. It looks divine!', 'Just caught a Arapaima. This thing is huge!', "Just caught a Arowana. I caught an arowana! It's the golden dragon fish! I", "Just caught a . wonder what it's worth...", "Just caught a Barbel Steed. That's funny...It looks more like a fish than a horse.", "Just caught a Bass. If I can catch a drummer, maybe I'll form a band!", 'Just caught a Bitterling. I wonder what makes this little guy so angry...', "Just caught a Bluegill. Don't worry I caught the rest of the fish, too!", "Just caught a Brook Trout. I guess that little guy's just trOUT of luck!", "Just caught a Catfish. I think I'll name it Whiskers...", 'Just caught a Cherry Salmon. It looks so PITiful! Get it? Pit? Oh, never mind.', "Just caught a Coelacanth. Would you look at that! A living fossil. I didn't know", 'Just caught a . they truly existed.', 'Just caught a Crawfish. Check out those pincers!', 'Just caught a Crucian Carp. Carpe diem!', 'Just caught a Dace. Daces wild!', "Just caught a Eel. I've been told they're rEELy tough to catch (I'm sorry).", 'Just caught a Freshwater Goby. Go me, goby!', "Just caught a Frog. Think I should kiss it? (Ew...it's all warty!)", "Just caught a Giant Catfish. I caught a giant catfish! (That's because I used a giant", 'Just caught a . mousefish as bait!', 'Just caught a Giant Snakehead. Yep! A giant snakehead. Who names these things?', "Just caught a Goldfish. It's worth its weight in...fish. Great.", 'Just caught a Guppy. He ate an awful lot of bait for being so tiny!', 'Just caught a Jellyfish. I wonder how it would taste on some toast...', 'Just caught a Killifish. Killer!', 'Just caught a Koi. Whoever colored it did a real good job.', "Just caught a Large Bass. Well, it's pretty big...I guess...", "Just caught a Loach. You don't suppose it's Hylian, do you?", 'Just caught a Pale Chub. Looks like it could use a little sun...and a little diet', "Just caught a Piranha. I caught a piranha! Which river is this, anyway? I'm glad", "Just caught a . I didn't take a dip!", 'Just caught a Pond Smelt. Whew! And I thought the POND smelt bad!', 'Just caught a Popeyed Goldfish. Aw, look... He wants his spinach...', "Just caught a Rainbow Trout. Now that's a trout of a different color!", 'Just caught a Red Snapper. That was a snap! (I really have to stop saying things', 'Just caught a . like that.)', 'Just caught a Salmon. And it made it all the way back here!Now i feel bad.', 'Just caught a Sea Bass. See? Bass! (Why do I keep saying things like that?)', 'Just caught a Small Bass. Now, I just need to catch a small bass amp. (Oh, that was', 'Just caught a . terrible...)', 'Just caught a Stringfish. Ohhh, boy! I hooked a stringfish! I was just stringing it', 'Just caught a . along...', 'Just caught a Sweetfish. And let me tell you, that is one SWEET fish!'] # length=44

for i in 0..44
  story = {
    user_id: 1,
    title: "Exciting news!",
    body: scripts[i],
    for: 0
  }
  n = News.create(story)
  n.save
end

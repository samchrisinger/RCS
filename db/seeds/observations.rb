# Animals (244)
animals = ['Animal', 'Aardvark', 'Albatross', 'Alligator', 'Alpaca', 'Ant', 'Anteater', 'Antelope', 'Ape', 'Armadillo', 'Ass/Donkey', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear', 'Beaver', 'Bee', 'Bison', 'Boar (wild pig)', 'Also see Pig', 'Buffalo, African (for American buffalo, see Bison)', 'Butterfly', 'Camel', 'Capybara', 'Caribou', 'Cassowary', 'Cat', 'Caterpillar', 'Cattle[note 3]', 'Chamois', 'Cheetah', 'Chicken', 'Chimpanzee', 'Chinchilla', 'Chough', 'Clam', 'Cobra', 'Cockroach', 'Cod', 'Cormorant', 'Coyote', 'Crab', 'Crane', 'Crocodile', 'Crow', 'Curlew', 'Deer', 'Dinosaur', 'Dog', 'Dogfish', 'Dolphin', 'Donkey - See Ass', 'Dotterel', 'Dove', 'Dragonfly', 'Duck', 'Also see Mallard', 'Dugong', 'Dunlin', 'Eagle', 'Echidna', 'Eel', 'Eland', 'Elephant', 'Elephant seal', 'Elk (wapiti)', 'Emu', 'Falcon', 'Ferret', 'Finch', 'Fish', 'Flamingo', 'Fly', 'Fox', 'Frog', 'Gaur', 'Gazelle', 'Gerbil', 'Giant Panda', 'Giraffe', 'Gnat', 'Gnu', 'Goat', 'Goldfinch', 'Goldfish', 'Goose', 'Gorilla', 'Goshawk', 'Grasshopper', 'Grouse', 'Guanaco', 'Guinea fowl', 'Guinea pig', 'Gull', 'Hamster', 'Hare', 'Hawk', 'Hedgehog', 'Heron', 'Herring', 'Hippopotamus', 'Hornet', 'Horse', 'Human', 'Hummingbird', 'Hyena', 'Ibex', 'Ibis', 'Jackal', 'Jaguar', 'Jay', 'Jay, Blue', 'Jellyfish', 'Kangaroo', 'Kingfisher', 'Koala', 'Komodo dragon', 'Kookabura', 'Kouprey', 'Kudu', 'Lapwing', 'Lark', 'Lemur', 'Leopard', 'Lion', 'Llama', 'Lobster', 'Locust', 'Loris', 'Louse', 'Lyrebird', 'Magpie', 'Mallard', 'Also see Duck', 'Manatee', 'Mandrill', 'Mantis', 'Marten', 'Meerkat', 'Mink', 'Mole', 'Mongoose', 'Monkey', 'Moose', 'Mosquito', 'Mouse', 'Mule', 'Narwhal', 'Newt', 'Nightingale', 'Octopus', 'Okapi', 'Opossum', 'Oryx', 'Ostrich', 'Otter', 'Owl', 'Ox', 'Oyster', 'Panther', 'Parrot', 'Partridge', 'Peafowl', 'Pelican', 'Penguin', 'Pheasant', 'Pig', 'Also see Boar', 'Pigeon', 'Polar Bear', 'Pony- See Horse', 'Porcupine', 'Porpoise', 'Prairie Dog', 'Quail', 'Quelea', 'Quetzal', 'Rabbit', 'Raccoon', 'Rail', 'Ram', 'Also see Sheep', 'Rat', 'Raven', 'Red deer', 'Red panda', 'Reindeer (caribou)', 'Rhinoceros', 'Rook', 'Salamander', 'Salmon', 'Sand Dollar', 'Sandpiper', 'Sardine', 'Scorpion', 'Sea lion', 'Sea Urchin', 'Seahorse', 'Seal', 'Shark', 'Sheep', 'Also see Ram', 'Shrew', 'Skunk', 'Snail', 'Snake', 'Sparrow', 'Spider', 'Spoonbill', 'Squid', 'Squirrel', 'Starling', 'Stingray', 'Stinkbug', 'Stork', 'Swallow', 'Swan', 'Tapir', 'Tarsier', 'Termite', 'Tiger', 'Toad', 'Trout', 'Turkey', 'Turtle', 'Vicu\xc3\xb1a', 'Viper', 'Vulture', 'Wallaby', 'Walrus', 'Wasp', 'Water buffalo', 'Weasel', 'Whale', 'Wolf', 'Wolverine', 'Wombat', 'Woodcock', 'Woodpecker', 'Worm', 'Wren', 'Yak', 'Zebra']

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

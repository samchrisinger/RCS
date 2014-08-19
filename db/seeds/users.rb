# Users
User.attr_accessible :admin, :guardian, :token
first = [['Jacob', 'Mason', 'Ethan', 'Noah', 'William', 'Liam', 'Jayden', 'Michael', 'Alexander', 'Aiden'],['Sophia', 'Emma', 'Isabella', 'Olivia', 'Ava', 'Emily', 'Abigail', 'Mia', 'Madison', 'Elizabeth']]
last = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White']

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

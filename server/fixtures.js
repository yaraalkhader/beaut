// Fixture data
Meteor.startup(function() {
	if (Providers.find().count() == 0) {
		Providers.insert({
			name: 'Myriam at Beauté Desirée',
	  	    locationName: "France, Nice",
            Address:  "9 Rue Biscarra, 06000",
            mobile: false,
            Phone: "(+33) 06 88 74 14 71",
            Website: "http://www.beautedesiree.fr/",
            SpeaksEnglish:true,
            mobile:true,
            price:'$$',
            radius:10,
            logo: "",
            gender:"female",
            profilePic:"/1/img2.jpg",
            contact: {
                email : "spa@test.com",
                tel   : "088080808080",    
            },
            services: {
                service : {
                    name: "nail",
                    time: "20 min",
                    price: "50 $"
                },
                service : {
                    name: "hair",
                    time: "60 min",
                    price: "150 $"
                }
            },
            hours:['090','200'],             
            holiday:['Wed', 'Sun'],
            date: ['Wed Jul 14th 16'],
           location: {
      type: "Point",
      coordinates: [-73.856077, 40.848447]
   },
            
                    
	
		});
        
        
        Providers.insert({
			name: 'Lisa at Beauté Desirée',
	  	    locationName: "France, Nice",
            Address:  "9 Rue Biscarra, 06000",
            mobile: false,
            Phone: "(+33) 06 88 74 14 71",
            Website: "http://www.beautedesiree.fr/",
            SpeaksEnglish:true,
            mobile:true,
            price:'$$$',
            radius:10,
            logo: "",
            gender:"female",
            profilePic:"/1/img1.jpg",
            contact: {
                email : "spa@test.com",
                tel   : "088080808080",    
            },
            services: {
                service : {
                    name: "nail",
                    time: "20 min",
                    price: "50 $"
                },
                service : {
                    name: "hair",
                    time: "60 min",
                    price: "150 $"
                }
            },
            hours:['090','200'],             
            holiday:['Wed', 'Sun'],
            date: ['Wed Jul 14th 16'],
               
        location: {
      type: "Point",
      coordinates: [-73.856077, 50.848447]
   },
     
       
                    
	
		});
//		Customers.insert({
//			name: 'Bob',
//	  	surname: 'Edelson',
//	  	email: 'edelson.bob@example.com'
//		});
//		Customers.insert({
//			name: 'Dan',
//	  	surname: "Carlson",
//	  	email: 'carlsondan@example.com'
//		});
//		Customers.insert({
//			name: 'Alice',
//	  	surname: 'Foster',
//	  	email: 'a.foster@example.com'
//		});
//		Customers.insert({
//			name: 'Erica',
//	  	surname: "Breeson",
//	  	email: 'ericabreeson@example.com'
//		});
//		Customers.insert({
//			name: 'Cindy',
//	  	surname: 'Driver',
//	  	email: 'cindy.driver@example.com'
//		});
	}
});
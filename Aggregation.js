// 1. Find the Number Of Active User

/*

[
    //First Stage Where we Find the number of 
    {
  $match: {
    isActive:true
  }
},
 
Second Stage 
{
  $count: 'ActiveUser'
}
]


*/


// 2. What is the average age of all users


/*

[{
  $group: {
    _id: null,
    averageAge: {
      $avg : "$age"
    }
  }
}] 

*/


// 3. List The Top 2 most common fav fruit

/*


[
    First Stage to Group All Fruit and count the number of users fav fruit
{
  $group: {
    _id:"$favoriteFruit",
    countNumber:{
      $sum:1
    }
    }
},

   Second Stage to sort the number of fruit
 {
  $sort: {
    countNumber:-1
  }
},
    Third Stage to Show the top 2
 {
   $limit: 2
 }
] 


*/


// Total Number Of Male and Female


/*

[{
  $group: {
    _id: "$gender",
    countGender:{
      $sum:1
    }
  }
}]

*/


// Names and age of users who are inactive  aand have velit  as a tag

/*


[{
  $match: {
		tags:	"velit",
    isActive: false
  }
},{
  $project: {
    name:1,
    age:1
  }
}]

*/



// Latest Registration
/*


[{
  $sort: {
    registered: -1
  }
},{
  $limit: 3
},{
  $project: {
    name:1,
    registered:1,
    favoriteFruit:1
  }
}]




List the number of company based on the location usa

[{
  $match: {
    "company.location.country":"USA"
  }
},{
 $group: {
   _id: "$company.title",
   countUser:{$sum :1}
   
 }
}]

*/





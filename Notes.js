// find()
//     -Gives Multiple Document Thats Why it provide Cursoir
//     -Gives The Cursor Not The Document.
//     -Gives First 20 Documents

// findOne()
//     -Gives Single Document.

// Projections 
//     Sytanx :- find({},{name:"manav})
//     USED WHEN YOU WANT TO RETRIVE THE DATA BASE ON FIELD 
//     HELPS IN FILTERING



//     {
//    $lookup:
//      {
//        from: <collection to join>,
//        localField: <field from the input documents>,
//        foreignField: <field from the documents of the "from" collection>,
//        as: <output array field>
//      }
// }

// Comparison Operator

//1.$eq

//    -Checks that the vaule are equal to a specified value or not..
//2.$gt

//    -Matches values that are greater than a specified value.
//3.$gte

//    -Matches values that are greater than or equal to a specified value.
//4.$in

//    -Matches any of the values specified in an array.
// $lt

//    -Matches values that are less than a specified value.
//5.$lte

//    -Matches values that are less than or equal to a specified value.
//6.$ne

//    -Matches all values that are not equal to a specified value.
//7.$nin

//    -Matches none of the values specified in an array.


//https://www.mongodb.com/docs/manual/reference/operator/query/




// Logical Operator

// 1.$and

//     -Takes Array as a input
//     -Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.

// 2.$not

    // -Inverts the effect of a query expression and returns documents that do not match the query expression.
// 3.$nor

//     -Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
// 4.$or

//     -Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

//-------------------------------------------------------------------------------------------------------------------//


// $type:-

// $type selects documents where the value of the field is an instance of the specified BSON type(s). 
// Querying by data type is useful when dealing with highly unstructured data where data types are not predictable.

//{ field: { $type: <BSON type> } }
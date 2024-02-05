const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.teacher.create({
      data: 
        { name: "Neil Shukla" ,
        userId: "user_2ZnEXb621H9DTn4Nh5KNNQ3FMiQ"}
      
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//   try {
//     await database.category.createMany({
//       data: [
//         { name: "Computer Science" },
//         { name: "Music" },
//         { name: "Fitness" },
//         { name: "Photography" },
//         { name: "Accounting" },
//         { name: "Engineering" },
//         { name: "Filming" },
//       ]
//     });

//     console.log("Success");
//   } catch (error) {
//     console.log("Error seeding the database categories", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();
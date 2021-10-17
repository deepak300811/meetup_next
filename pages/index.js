import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://www.planetware.com/wpimages/2020/11/europe-top-attractions-eiffel-tower.jpg",
//     address: "BA-345, 56th Street, France",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://www.planetware.com/wpimages/2020/11/europe-top-attractions-colosseum-rome.jpg",
//     address: "BA-345, 56th Street, France",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://www.planetware.com/wpimages/2020/11/europe-top-attractions-acropolis-athens-greece.jpg",
//     address: "BA-345, 56th Street, France",
//     description: "This is a first meetup!",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a hige list of highly active meetups!"
        />
      </Head>{" "}
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API / database / files
  MongoClient.connect();
  const client = await MongoClient.connect(
    "mongodb+srv://deepak:Pass1234@cluster0.r1i85.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API / database / files
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

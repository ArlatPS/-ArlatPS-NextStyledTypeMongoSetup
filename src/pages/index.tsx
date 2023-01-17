import Head from "next/head";
import styled from "styled-components";
import mongoose from "mongoose";

const H1Styled = styled.h1`
  color: #1d3557;
  margin: 0;
  padding: 10px 20px;
  font-weight: 600;
`;

const MainStyled = styled.main`
  background-color: #a8dadc;
  height: 100vh;
`;

export default function Home(props: { reviews: { body: string }[] }) {
  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainStyled>
        <H1Styled>Next + StyledComponents + TS + MongoDB Setup</H1Styled>
        <h2>{props.reviews[0].body}</h2>
      </MainStyled>
    </>
  );
}

export async function getStaticProps() {
  mongoose.connect(process.env.DBUrl as string);
  const db = mongoose.connection;
  db.on("error", () => console.log("error"));
  db.once("open", () => {
    console.log("CONNECTED WITH DB");
  });

  const { Schema } = mongoose;

  //schema for reviews
  const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, //conected to users collection
  });

  const Review =
    mongoose.models.Review || mongoose.model("Review", reviewSchema);
  const res = await Review.find({});
  const reviews: {}[] = JSON.parse(JSON.stringify(res));
  return {
    props: {
      reviews: reviews,
      as: "Ss",
    },
  };
}

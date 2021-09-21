import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Typography, Link as LinkMaterial, Button } from "@mui/material";
import { getUserData } from "../api/users/[pid]";
import { UserDetailed } from "../../shared/types";
import styles from "../../styles/Users.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params && context.params["id"]) as string;
  const data = await getUserData(id);

  return {
    props: {
      user: data.user as UserDetailed,
    },
  };
};

const Users: NextPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { createdAt, email, imgUrl, location, name, url, username } = user;

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <main className={styles.container}>
        <Image
          className={styles.avatar}
          src={imgUrl}
          alt="github user avatar"
          width="200"
          height="200"
        />
        <Typography variant="h1">{username}</Typography>
        {name && (
          <Typography variant="subtitle1">
            <strong>Name</strong>: {name}
          </Typography>
        )}
        {location && (
          <Typography variant="subtitle1">
            <strong>Location</strong>: {location}
          </Typography>
        )}
        {email && (
          <Typography variant="subtitle1">
            <strong>Email</strong>: {email}
          </Typography>
        )}
        <Typography variant="subtitle1">
          <strong>Member since</strong>: {new Date(createdAt).toDateString()}
        </Typography>
        <Typography variant="subtitle1">
          <LinkMaterial href={url} target="_blank">
            See more on GitHub
          </LinkMaterial>
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained">Back to frontpage</Button>
        </Link>
      </main>
    </>
  );
};

export default Users;

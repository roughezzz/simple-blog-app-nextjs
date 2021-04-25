import Link from "next/link";
import {InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';

import styles from '../styles/Home.module.css';
import {Post} from '../utils/types'


const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlogTitle = styled.div`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const List = styled.ul`
  list-style: sqaure;
`;

const ListItem = styled.li`
  padding: 10px;
  text-transform: capitalize;
  margin: 40px 0;
  cursor: pointer;
  color: #252525;
  &:hover{
    background: #f0f0f0;
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

export default function Home({posts} : InferGetStaticPropsType<typeof getStaticProps>) {

  const title: string = "My Blog App";

  return (
    <Container className={styles.container}>
      <Head>
        <title>My Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <BlogTitle>Blog App</BlogTitle>

        <Link href="/about">
          <a>Abour this blog</a>
        </Link>

        <List>
          {posts.map((post) => (
            <Link href="posts/[id]" as={`/posts/${post.id}`}>
              <ListItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
              </ListItem>
            </Link>
          ))}
        </List>
      </Main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </Container>
  )
}

export  const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts: Post[] = await response.json();

  return {
    props: {
      posts,
    }
  }
}

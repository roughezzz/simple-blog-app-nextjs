import {GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths} from 'next';
import Head from 'next/head';

import {Article} from "@components/Article";
import {Post} from '../../utils/types';



export default function BlogPost({post}: InferGetStaticPropsType<typeof getStaticProps>){
    const {title, body} = post;
    return(
        <Article>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title}/>
            </Head>
            <h1>{title}</h1>
            <p>{body}</p>
        </Article>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const posts: Post[] = await response.json();

    const paths = posts.map(post => ({
        params: {
            id: post.id.toString(),
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export  const getStaticProps = async (context: GetStaticPropsContext) => {
    
    const {params} = context;
    const emptyPost = {
        title: "Post not found",
        body: "",
        id: 0,
        userId: 0
    }

    if (!params?.id){
        return {
            props: {
                post: emptyPost
            }
        }
    }


    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post: Post = await response.json();
  
    return {
      props: {
        post,
      }
    }
}
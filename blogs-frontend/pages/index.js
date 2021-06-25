import Link from "next/link";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";

export default function Home({ articles }) {
 return (
   <>
     <Layout>
       <body className="antialiased md:bg-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
           {articles.map((article) => (
             <div key={article.id} className="md:p-8 p-2 bg-white">
               <div>
                 {article.image && (
                   <img src={`http://localhost:1337${article.image.url}`} />
                 )}
               </div>
               {article.title}
               <div>
                 {article.category && (
                   <p className="text-indigo-500 font-semibold text-base mt-2">
                     {article.category.name}
                   </p>
                 )}
               </div>
               <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate">
                 {article.title}
               </h1>
               <Link href={`/article/${article.slug}`}>
                 <div className="max-w-full">
                   <p className="text-base font-medium tracking-wide text-gray-600 mt-1">
                     {article.description}
                   </p>
                 </div>
               </Link>
               <div className="flex items-center space-x-2 mt-20">
                 <div>
                   {article.author && (
                     <p className="text-gray-900 font-semibold pb-2">
                       {article.author.name}
                     </p>
                   )}
                   <p className="text-gray-500 font-semibold text-sm">
                     Created on - {new Date(article.created_at).toDateString()}
                   </p>
                   <p className="text-gray-500 font-semibold text-sm">
                     Updated on - {new Date(article.updated_at).toDateString()}
                   </p>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </body>
     </Layout>
   </>
 );
}

export async function getStaticProps() {
 try {
   const articles = await fetchAPI("/articles?status=published");;
   return {
     props: {
       articles
     },
   };
 } catch (error) {
   return { error };
 }
}
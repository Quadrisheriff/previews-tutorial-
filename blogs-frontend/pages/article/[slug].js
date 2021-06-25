import Markdown from "markdown-to-jsx";
import { fetchAPI, getPageData } from "../../lib/api";
import Layout from "../../components/layout";

const Article = ({ article, preview }) => {
  return (
    <>
      <div>
        {preview ? (
          <div className="relative bg-indigo-600">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div className="pr-16 sm:text-center sm:px-16">
                <p className="font-medium text-white">
                  <span>Preview mode is on,</span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a
                      href="/api/exit-preview"
                      className="underline hover:text-cyan transition-colors"
                    >
                      turn off
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Layout>
        <div className="mt-10">
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto">
            <div className="absolute left-0 bottom-0 w-full h-full" />
            <div>
              {article.image && (
                <img src={`http://localhost:1337${article.image.url}`} />
              )}
            </div>
            <div>
              {article.category && (
                <a
                  href="#"
                  className="px-4 py-1 bg-black text-blue-200 inline-flex text-md items-center justify-center mb-2"
                >
                  {article.category.name}
                </a>
              )}
            </div>
            <h2 className="text-4xl pt-2 font-semibold text-gray-500 leading-tight">
              {article.description}
            </h2>
            <div className="mt-3">
              {article.author && (
                <p className="text-blue-900 font-semibold pb-2">
                  Written by - {article.author.name}
                </p>
              )}
            </div>
          </div>
          <article className="prose lg:prose-xl px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            <Markdown>{article.content}</Markdown>
          </article>
        </div>
      </Layout>
    </>
  );
 };

export default Article;

export async function getStaticPaths() {
 const articles = await fetchAPI("/articles");

 return {
   paths: articles.map((article) => ({
     params: {
       slug: article.slug,
     },
   })),
   fallback: false,
 };
}

export async function getStaticProps({ params, preview = null }) {
  const article = await getPageData(params.slug, preview);
 
  return {
    props: { article, preview },
    revalidate: 1,
  };
 }
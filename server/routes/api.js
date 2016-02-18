/**
 *
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:52
 * @version $Id$
 */
import Article from '../db/Article';

export default function(Router) {
  const router = new Router({
    prefix: '/api'
  });

  router.get('/article', function* () {

        let articles = Article.getArticles();
        console.log(articles);
        yield this.body = {
          articles: articles,
          msg: 'ok'
        };
  });

  router.get('/create', function* () {
        let data = {

        }
        Article.createArticle(data);
  });

  router.get('*', function* () {
    console.log("the api service");
  });

  return router;
}

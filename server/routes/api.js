/**
 * 
 * @authors zyb (zybbyzaa@163.com)
 * @date    2016-01-31 15:08:52
 * @version $Id$
 */

export default function(Router) {
  const router = new Router({
    prefix: '/api'
  });

  router.get('*', function* () {
    console.log("the api service");
  });

  return router;
}

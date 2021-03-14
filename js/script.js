{

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */
  
    const activeLinks = document.querySelectorAll('.titles a.active');
  
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
  
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [IN PROGRESS] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('Href:', articleSelector);
  
    /* [IN PROGRESS] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);
  
    /* [IN PROGRESS] add class 'active' to the correct article */

    console.log('targetArticle:', targetArticle);    
    targetArticle.classList.add('active');

  }
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [IN PROGRESS] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('optTitleListSelector = ', optTitleListSelector);
  console.log('titleList = ', titleList);

  /* [IN PROGRESS] for each article */

  const articles =  document.querySelectorAll(optArticleSelector);
  console.log('customSelector = ', customSelector);
  console.log('articles = ', articles);

  for(let article of articles){
    article.querySelector(optArticleSelector);
    console.log('article = ', article);

    /* [IN PROGRESS] get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleId = ', articleId);

    /* [IN PROGRESS] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle = ', articleTitle);

    /* [IN PROGRESS] get the title from the title element */

    /* [IN PROGRESS] create HTML of the link */

    /* [IN PROGRESS] insert link into titleList */
  }
}

generateTitleLinks();
}
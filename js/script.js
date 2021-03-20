'use strict';

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
  
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Href:', articleSelector);
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);
  
  /* [DONE] add class 'active' to the correct article */

  console.log('targetArticle:', targetArticle);    
  targetArticle.classList.add('active');

};
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('optTitleListSelector = ', optTitleListSelector);
  console.log('titleList = ', titleList);

  /* [DONE] for each article */

  const articles =  document.querySelectorAll(optArticleSelector);
  console.log('customSelector = ', customSelector);
  console.log('articles = ', articles);

  let html ='';
  
  for(let article of articles){
    article.querySelector(optArticleSelector);
    console.log('article = ', article);

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleId = ', articleId);

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle = ', articleTitle);

    /* [DONE] get the title from the title element */

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML = ', linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){
    article.querySelector(optArticleSelector);

    console.log('article = ', article);
  
    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);

    console.log('tagsList = ', tagsList);

    /* make html variable with empty string */

    let html ='';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      console.log('tag: ',tag);

      /* generate HTML of the link */

      const linkHTMLData = { id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + linkHTML + ' ';

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;

  /* END LOOP: for every article: */
    }
  }
}

generateTags();
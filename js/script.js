'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.list.authors';

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

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('optTitleListSelector = ', optTitleListSelector);
  console.log('titleList = ', titleList);

  /* [DONE] for each article */

  const articles =  document.querySelectorAll(optArticleSelector + customSelector);
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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

const calculateTagsParams = function(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + 'times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
};

const calculateTagClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount -1) + 1);

  return optCloudClassPrefix + classNumber;
};



function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  console.log('articles: ', articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    article.querySelector(optArticleSelector);

    console.log('article = ', article);
  
    /* find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    console.log('tagWrapper = ', tagWrapper);

    /* make html variable with empty string */

    let html ='';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      console.log('tag: ' ,tag);

      /* generate HTML of the link */

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="'+ calculateTagClass(allTags[tag], tagsParams) +'">' + tag + '</a></li>';

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:', tagLinkHTML);

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTags.join(' ');

  console.log(allTagsData);
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for(let activeTagLink of activeTagLinks){

    /* remove class active */

    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let foundTagLink of foundTagLinks){

    /* add class active */

    foundTagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let linkTag of linkTags){

    /* add tagClickHandler as event listener for that link */

    linkTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* "NEW" create a new variable allTags with an empty object */

  let allAuthors = {};

  /* find all authors */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP for every author */

  for(let article of articles) {

    /* find author post */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get author from data-author attribute */

    const tagAuthor = article.getAttribute('data-author');
    console.log(tagAuthor);

    /* generate html of the link */

    const linkHTMLData = {id: tagAuthor, title: tagAuthor};
    const linkHTML = templates.authorLink(linkHTMLData); 

    /* add generate code to html variable */

    html = html + linkHTML;

    /* "NEW" check if the link is not already in allAuthors */

    if(!allAuthors[tagAuthor]) {

      /* "NEW" add generated code to allAuthors array */

      allAuthors[tagAuthor] = 1;
    } else {
      allAuthors[tagAuthor] ++;
    }

    /* insert html of all links into the tags wrapper */
    
    authorWrapper.innerHTML = html;

  /* END LOOP for every article */
  }

  /* "NEW" find wrapper of authors in right column */

  const authorLists = document.querySelector(optAuthorListSelector);

  const tagsParams = calculateTagsParams(allAuthors);

  /* "NEW" create variable for all links html code */

  const allAuthorsData = {authors: []};

  /* "NEW" START LOOP: for each author in allAuthors */

  for(let author in allAuthors){

    /* "NEW" generate code of a link and add it to allAuthorsHTML */

    //allAuthorsHTML +='<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author], tagsParams) + '">' + author + '</a></li>';
  
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], tagsParams)
    });
  }

  /* "NEW" add HTML from allAuthorsHTML to tagList */

  authorLists.innerHTML = templates.authorCloudLink(allAuthorsData);

}

generateAuthors();

function authorClickHandler(event){
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make a new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  //console.log('I. Link was clicked', clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
    
  /* [DONE] make a new constant "author" and extract author name from the "href" constant */

  const author = href.replace('#author-', '');

  /* [DONE] find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */

  for(let activeAuthorLink of activeAuthorLinks) {

    /* [DONE] remove class active */

    activeAuthorLink.classList.remove('active');

  /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for(let foundAuthorLink of foundAuthorLinks){

    /* [DONE] add class active */

    foundAuthorLink.classList.add('active');

  /* [DONE] END LOOP: for each found author link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors(){
  /* [DONE] find all links to author */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for(let authorLink of authorLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    
    authorLink.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();
{
	"translatorID": "4dfca45b-e72e-4e20-aa6c-19d4a5d6ed90",
	"label": "ImportantPolicy@EY",
	"creator": "hdwu",
	"target": "^https?://(www.)?ey.gov.tw/Page/2124AB8A95F79A75",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-09-29 12:30:02"
}

/* 
	***** BEGIN LICENSE BLOCK ***** 

	Copyright © 2017 Hdwu 
	

	***** END LICENSE BLOCK ***** 
*/ 

function  attr ( docOrElem ,  selector ,  attr ,  index )  { 
	var  elem  =  index  ?  docOrElem . querySelectorAll ( selector ). item ( index )  :  docOrElem . querySelector ( selector ); 
	return  elem  ?  elem . getAttribute ( attr )  :  null ; 
} 


function  text ( docOrElem ,  selector ,  index )  { 
	var  elem  =  index  ?  docOrElem . querySelectorAll ( selector ). item ( index )  :  docOrElem . querySelector ( selector ); 
	return  elem  ?  elem . textContent  :  null ; 
} 

function  detectWeb ( doc ,  url )  { 
	// Adjust the inspection of url as required 
	if  ( url . indexOf ( '2124AB8A95F79A75' )  !=  - 1  &&  getSearchResults ( doc ,  true ))  { 
//	if  ( url . indexOf ( '2124AB8A95F79A75' )  !=  - 1  ){ 

		return  'multiple' ; 
	} 
	// Adjust the inspection of url as required 
	else  if  ( url . indexOf ( '5A8A0CB5B41DA11E' )  !=  - 1 ){ 
		return  'Web' ; 
	} 
	// Add other cases if needed 
} 

function  doWeb ( doc ,  url )  { 
	if  ( detectWeb ( doc ,  url )  ==  "multiple" )  { 
		Zotero . selectItems ( getSearchResults ( doc ,  false ),  function  ( items )  { 
			if  ( ! items )  { 
				return  true ; 
			} 
			var  articles  =  []; 
			for  ( var  i  in  items )  { 
				articles . push ( i ); 
			} 
			ZU . processDocuments ( articles ,  scrape ); 
		}); 
	}  else  { 
		scrape ( doc ,  url ); 
	} 
} 


function  getSearchResults ( doc ,  checkOnly )  { 
	var  items  =  {}; 
	var  found  =  false ; 
	// Adjust the CSS Selectors  
//	var  rows  =  doc . querySelectorAll ( '.news_box pdf_box a' ); 

	var  rows  =  doc . querySelectorAll ('html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words ul.grid.effect.list-group-item li.new_img.hvr-outline-in div.news_box.pdf_box a');

	for  ( var  i = 0 ;  i < rows . length ;  i ++ )  { 
		// Adjust if required, use Zotero.debug(rows) to check 
		var  href  =  rows [ i ]. href ; 
		// Adjust if required, use Zotero.debug(rows) to check 
		var  title  =  rows [ i ]. title; 
		if  ( ! href  ||  ! title )  continue ; 
		if  ( checkOnly )  return  true ; 
		found  =  true ; 
		items [ href ]  =  title ; 
	} 
	return  found  ?  items  :  false ; 
} 

function  scrape ( doc ,  url )  { 
	item  =  new  Zotero . Item ( "webpage" ); 
	//item.title = text(doc,'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail span.h2.font_black')
	//item.title =  ZU . trimInternal ( doc . getElementByClassName ( 'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail span.h2.font_black' ). textContent );
	//item.title = "abc"; //text(doc, 'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail span.h2.font_black');
	
	//item.title = text(doc,'#h2\ font_black');
	
	//item.title = text(doc,'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail span.h2.font_black')
	
	//item.title = doc.title ;
	
	//item.title = text(doc,'html head meta')
	
	item.title = attr(doc, 'meta[property="og:title"]', 'content');
	//item.abstract = attr(doc, 'meta[property="og:description"]', 'content');
	item.creator = "行政院全球資訊網-重要政策";
	
	//item.Date = text(doc,'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail p.first_p span.date_style2 font');
	//item.date = "日期：110-07-20";
	
	item.date = text(doc,'.date_style2 font');
	
	
	//item . rights  =  text ( doc ,  '#footer-info-copyright a' );	

 	item.url = url;
	
	//item.abstract = doc.meta.
	
	//item.Abstract = "Abstract";
	//item.date = "2021-09-29"
	
	//item . title  =  ZU . trimInternal ( doc . getElementById ( 'firstHeading' ). textContent );

/*
	item . rights  =  text ( doc ,  '#footer-info-copyright a' );	
	item . language  =  doc . documentElement . lang ;  // check this: showing en for all, as en is written in html node, try to fix it. 
	item . archive  =  "Mediawiki" ; 
	
	var  tags  =  doc . querySelectorAll ( '.mw-normal-catlinks ul li a' ); 
	if ( tags . length ) 
	{ 
		for  ( var  i = 0 ;  i < tags . length ;  i ++ )  { 
			item . tags . push ( tags [ i ]. text ); 
		} 
	} 
	
	item . attachments . push ({ 
		url  :  url , 
		title  :  "Wikimedia Snapshot2" , 
		type  :  "text/html" 
	}); 
*/	
	item.complete();
} 

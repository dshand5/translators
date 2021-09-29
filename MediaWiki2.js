{
	"translatorID": "5fdd9a37-da7f-4699-9fbc-b7d6875ee20c",
	"label": "MediaWiki2",
	"creator": "hdwu3",
	"target": "https?://(www.)?mediawiki.org/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-09-29 03:28:21"
}

/* 
	***** BEGIN LICENSE BLOCK ***** 

	Copyright © 2017 YourName 
	
	This file is part of Zotero. 

	Zotero is free software: you can redistribute it and/or modify 
	it under the terms of the GNU Affero General Public License as published by 
	the Free Software Foundation, either version 3 of the License, or 
	(at your option) any later version. 

	Zotero is distributed in the hope that it will be useful, 
	but WITHOUT ANY WARRANTY; without even the implied warranty of 
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
	GNU Affero General Public License for more details. 

	You should have received a copy of the GNU Affero General Public License 
	along with Zotero. If not, see <http://www.gnu.org/licenses/>. 

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
	if  ( url . indexOf ( 'search' )  !=  - 1  &&  getSearchResults ( doc ,  true ))  { 
		return  'multiple' ; 
	} 
	// Adjust the inspection of url as required 
	else  if  ( url . indexOf ( 'mediawiki.org/wiki' )  !=  - 1 ){ 
		return  'encyclopediaArticle' ; 
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
	var  rows  =  doc . querySelectorAll ( '.mw-search-result-heading a' ); 
	for  ( var  i = 0 ;  i < rows . length ;  i ++ )  { 
		// Adjust if required, use Zotero.debug(rows) to check 
		var  href  =  rows [ i ]. href ; 
		// Adjust if required, use Zotero.debug(rows) to check 
		var  title  =  ZU . trimInternal ( rows [ i ]. textContent ); 
		if  ( ! href  ||  ! title )  continue ; 
		if  ( checkOnly )  return  true ; 
		found  =  true ; 
		items [ href ]  =  title ; 
	} 
	return  found  ?  items  :  false ; 
} 

function  scrape ( doc ,  url )  { 
	item  =  new  Zotero . Item ( "encyclopediaArticle" ); 
	item . title  =  ZU . trimInternal ( doc . getElementById ( 'firstHeading' ). textContent );
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
		title  :  "Wikimedia Snapshot3" , 
		type  :  "text/html" 
	}); 
	
	item.complete();
} 



/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.mediawiki.org/wiki/Citoid",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "citoid",
				"creators": [],
				"archive": "Mediawiki",
				"language": "en",
				"libraryCatalog": "MediaWiki2",
				"rights": "Creative Commons Attribution-ShareAlike License",
				"attachments": [
					{
						"title": "Wikimedia Snapshot",
						"type": "text/html"
					}
				],
				"tags": [
					{
						"tag": "Extensions with VisualEditor support"
					},
					{
						"tag": "WMF Projects"
					},
					{
						"tag": "WMF Projects missing start date"
					}
				],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.mediawiki.org/w/index.php?search=zotero&title=Special:Search&profile=default&fulltext=1&ns0=1&ns12=1&ns100=1&ns102=1&ns104=1&ns106=1",
		"items": "multiple"
	}
]
/** END TEST CASES **/

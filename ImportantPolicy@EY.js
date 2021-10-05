{
	"translatorID": "4dfca45b-e72e-4e20-aa6c-19d4a5d6ed90",
	"label": "ImportantPolicy@EY",
	"creator": "hdwu",
	"target": "^https?://(www.)?ey.gov.tw",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-09-30 03:51:18"
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
		return  'webpage' ; 
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
	item.abstractNote = attr(doc, 'meta[property="og:description"]', 'content');
	item.websiteTitle = "行政院全球資訊網-重要政策";
	
	//item.Date = text(doc,'html body#PageBody div.wrapper form#form1 section.content-wrap div.container div.words div.ail p.first_p span.date_style2 font');
	//item.date = "日期：110-07-20";
	
	item.date = text(doc,'.date_style2 font');

	var mmdd = item.date.replace(/日期：([0-9]+)-([0-9]+)-([0-9]+)/, '$2-$3');
	
	var yyyy = item.date.replace(/日期：([0-9]+)-([0-9]+)-([0-9]+)/, '$1');
	
	yyyy = parseInt(yyyy,0)+1911;
	
	item.date = yyyy+"-"+mmdd;
	
//	item.date = yyyy.concat('-',mmdd);
	
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
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.ey.gov.tw/Page/2124AB8A95F79A75",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/0405a9c3-289e-4c74-b430-e67570c799f7",
		"items": [
			{
				"itemType": "webpage",
				"title": "20萬戶社會住宅，穩步邁進中",
				"creators": [],
				"date": "日期：110-09-13",
				"abstractNote": "一、前言\n\n為照顧弱勢及青年族群的居住需求，實現居住正義並健全住宅市場，政府推動社會住宅政策，以8年（106至113年）興辦20萬戶社會住宅為目標，並於106年1月公布修正《住宅法》，為推動社會住宅機制建立法制基礎。\n\n行政院續於同年3月核定「社會住宅興辦計畫」，結合政府興建與包租代管2種供給方案，增加政府住宅政策供給資源；同時透過包租代管民間的住宅，發揮租屋市場與購屋市場相互調控的市場均衡機制，以達成穩定住宅市場及安定人民居住的目標。\n\n二、興辦目標與進度\n\n■ 目標：8年（106至113年）分兩階段逐步達成，興辦20萬戶社會住宅。\n第一階段（106至109年）：政府直接興建4萬戶及包租代管4萬戶，計8萬戶\n第二階段（110至113年）：政府直接興建8萬戶及包租代管4萬戶，計12萬戶。\n\n■ 進度（截至110年8月底)\n第一階段政府直接興建部分係由地方主導，已於去（109）年底順利達標，目前全國已完工、施工中及已決標待開工的社會住宅共4萬7,340戶；第二階段興辦所需用地自107年起即超前儲備，全國已盤點出209處170公頃適合用地，約可興建8萬戶，將由中央承擔興建主力。另包租代管部分，經過幾年的市場磨合，媒合戶數在今（110）年顯著成長，累計約2萬件。 \n\n三、第二階段政府直接興建亮點\n■ 中央主導興辦：政府直接興建8萬戶的部分，將由中央將直接發包興建其中的6萬8千戶，由國家住宅及都市更新中心（簡稱住都中心）補足地方量能不足，並建立社會住宅國家生產線加速推動。\n■ 推動主題型社會住宅：推動軍職、警消、文化、創生、藝術、產業及公路等7大主題型社會住宅計畫，創造地區融合共好，並原則上每處至少設置1項老人日照、托嬰、托兒及青創等社會福利及公共服務設施，促進建構社會安全網。\n■ 品質內涵再提升：第一階段社會住宅目前有72%至少取得2項建築標章（如綠建築、耐震、智慧建築等標章)，第二階段每一案件將至少取得2項建築標章，並導入循環經濟理念，建構優質建築，提升社會住宅品質。\n\n四、具體推動作為\n\n■ 協助地方政府多元取得土地或資源\n1. 直轄市、縣（市）政府應優先運用縣市所有土地，如有不足，可無償撥用國有非公用土地或建築物；且租金及其他收益無需解繳國庫；至屬特種基金之國有非公用土地，依《住宅法》規定，得辦理長期租用，可大幅降低縣市政府取得社會住宅土地成本。另亦考量運用都市更新、都市計畫容積獎勵或變更方式，多元興辦社會住宅。\n\n2. 全面清查及盤點各地方政府、國有、國營事業、公股公司等適合興建社會住宅之土地。\n\n3. 運用國防部土地興辦社會住宅\n＊國防部營改基金土地：由住都中心以當年度公告現值價購營改基金土地，得分期支付土地款，並由國防部配合社宅興辦時程交地。\n＊國防部眷改基金土地：由國防部依以公告地價3%之優惠租金出租予住都中心或地方政府興辦社會住宅。\n\n4. 各國營事業土地出租與中央、地方主管機關或住都中心興辦社宅者，租金以不超過公告地價之45‰為原則，且免收權利金。\n\n■ 減輕地方政府財務負擔：106年3月13日核定「社會住宅融資服務平臺」，協助地方政府取得較低利率融資興辦社會住宅，有效減輕地方政府財務負擔；另由中央補助地方政府興辦期間之融資利息與非自償性經費，使財務較差之縣市也有能力興辦。\n\n■ 成立專責機構強化執行人力及資源：107年2月14日公布施行《國家住宅及都市更新中心設置條例》，同年8月成立行政法人「國家住宅及都市更新中心」，以企業化經營模式，輔助中央推動社會住宅。另部分地方政府擬以行政法人模式成立專責機構，強化社會住宅推行。\n\n■ 推動包租代管民間住宅\n1. 方式與對象：以低於市場租金包租或代管方式，提供給所得較低家庭、弱勢對象及就業、就學有居住需求者，以活化及利用現有住宅、減輕地方政府直接興建社會住宅財政負擔，並協助弱勢房客解決租不到、租不起及租不好的問題，同時為鼓勵房東加入，提供房屋稅、地價稅、綜合所得稅等優惠稅率，以擴大民間參與及提升社會住宅成效。\n\n2. 擴大民間參與：第1期計畫於106年至108年11月由6都試辦，累計媒合近5,100戶。第2期於108年起擴大由各縣市政府及住都中心共同辦理，累計媒合近1萬4千戶；第3期已由桃園市率先於110年5月1日開辦，另為吸引更多房東房客加入，推動以下精進措施：\n＊「租金補貼」轉軌「包租代管」之整合方案：整合方案有兩模式，一是租金補貼房東房客同時轉入包租代管；二是房東轉入包租代管，房客續留租金補貼。也就是原本作為公益出租人的房東（讓房客以租約去申請租金補貼），可轉給專業業者包租代管，以輕鬆收房租、享稅費減免等，而房客可計算一次性租金補貼和包租代管租金哪個較為優惠，自行選擇最有利方案。\n＊新增「以屋換屋」：名下有1戶自有住宅的身障者或滿65歲銀髮長輩，可申請換住同一縣市有電梯的大樓，解決民眾行動不便的困擾。\n＊取消設籍規定：房客只要有租屋事實，即可申請房租補助，不需要在當縣市設籍，而且下修申請承租年齡到18歲，嘉惠外地打拚的上班族及大學生。\n＊提高租金所得免稅額：《住宅法》已於本（110）年6月9日為公布修正，租金所得免稅額從1萬元提高至1萬5,000元，且明定契約資料不得作為所得查核依據，以增加房東誘因。\n＊定額計酬：改變前兩期依租金不同，計算包租代管業者補貼金額之作法，改為按件定額計酬，讓業者不必精算租金高低申請補助，且獲得合理報酬。\n\n3. 建立包租代管專業服務制度：《租賃住宅市場發展及管理條例》於107年6月27日公布施行，建立包租代管專業服務制度，協助租賃雙方快速處理房屋的日常修繕、租金收取、溝通協調等繁雜事務，有效減少租賃糾紛發生，營造友善、合宜的租賃住宅環境，進一步擴大服務媒合量能。\n\n■ 打造國人肯定的好宅：綠建築、智慧建築、耐震標章、無障礙設施，及結合托幼、長照等社會福利設施，均已成為各縣市興辦社會住宅的基本標準，其品質及內涵均將是各國頂尖水準，讓社會住宅成為國人肯定的好宅。\n\n五、結語\n\n推動只租不賣、租金合理的社會住宅，是政府協助中低收入、社會弱勢及受薪階級居住安穩的具體行動，不僅著重「量」的增加，更重視「質」的提升，將持續與其他社會政策相互搭配，建立居住安全網；同時希望透過高品質的社會住宅，帶動民間住宅興建標準向上提高，成為城市的驕傲，國家進步的象徵。",
				"url": "https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/0405a9c3-289e-4c74-b430-e67570c799f7",
				"websiteTitle": "行政院全球資訊網-重要政策",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/

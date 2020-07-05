function getTitleAsinMapping() {
  var bookDivs = document.querySelectorAll("div#library div.a-row.kp-notebook-library-each-book");
  var mapping = {};
  for(var i=0;i<bookDivs.length;++i) {
    var asin = bookDivs[i].getAttribute("id");
    var title = bookDivs[i].querySelector("h2").innerText;
    mapping[title] = asin;
  }
  return mapping;
}

function getBookTitle() {
  return document.querySelector("div#annotations h3.a-spacing-top-small.a-color-base.kp-notebook-selectable.kp-notebook-metadata").innerText;
}

function getAllHighlightDivs() {
  return document.querySelectorAll("div#kp-notebook-annotations div.a-row.a-spacing-base");
}

function parseHighlightDiv(div) {
  var highlightColorPageNumber = div.querySelector("span.a-size-small.a-color-secondary.kp-notebook-selectable").innerText;
  var hcpnSplit = highlightColorPageNumber.split(/\s+/)
  var highlightColor;
  if(hcpnSplit.length < 5 && hcpnSplit[0] == "Note") {
    highlightColor = null
  } else {
    highlightColor = hcpnSplit[0]
  }
  return {
    highlightText: div.querySelector("span.a-size-base-plus.a-color-base").innerText,
    noteText: div.querySelector("span#note.a-size-base-plus.a-color-base").innerText,
    highlightColor: highlightColor,
    pageNumber: parseInt(hcpnSplit[hcpnSplit.length-1].replace(",", ""))
  }
}

function getBookHighlightData() {
  var highlightDivs = getAllHighlightDivs();
  var highlights = [];
  for(var i=0; i<highlightDivs.length; ++i) {
    highlights.push(parseHighlightDiv(highlightDivs[i]));
  }
  var title = getBookTitle();
  var titleAsinMapping = getTitleAsinMapping();
  return {
    title: title,
    asin: titleAsinMapping[title],
    highlights: highlights
  }
}

getBookHighlightData()

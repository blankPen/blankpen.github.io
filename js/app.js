function parse() {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(decodeURIComponent(location.href)),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
}
function renderSearchItem(item) {
  return "<div class='col-md-6 col-lg-4'>" +
    "<div class='search-item' >" +
    "<a href='" + item.path + "' class='title'>" + item.title + "</a >" +
    "<div class='date'>" + item.date + "</div></div></div>";
}
var app = {
  initSearch() {
    var searchDom = document.getElementById('search');
    var searchRes = document.getElementById('search-result');
    var params = parse();
    if (params.s || params.t) {
      searchRes.style.display = 'block';
      var res = [];
      var title = '';
      if (params.s) {
        title = "<div class='search-group' >Search: " + params.s + "</div>"
        res = _.filter(ALL_POSTS, function (p) {
          return p.title.indexOf(params.s) !== -1
        });
      } else if (params.t) {
        title = "<div class='search-group' >Tag: " + params.t + "</div>"
        res = _.filter(ALL_POSTS, function (p) {
          return p.tags.indexOf(params.t) !== -1
        });
      }
      if (res.length) {
        res = '<div class="row">' + _.map(res, renderSearchItem).join('\n') + '</div>';
      } else {
        res = '<div class="no-result">没有找到内容,请换别的关键字进行检索</div>';
      }
      searchRes.innerHTML = title + res;
    } else {
      searchDom.style.display = 'block';
      var form = searchDom.querySelector('form');
      var input = searchDom.querySelector('input');
      form.onsubmit = function (e) {
        e.preventDefault();
        location = location.pathname + '?s=' + input.value
      }
    }
  }
};

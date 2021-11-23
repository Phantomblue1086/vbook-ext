load('libs.js');

function execute(url) {
    var host = 'https://www.biqugee.com';
    url = url.replace('m.biqugee.com', 'www.biqugee.com').append('/');
    var doc = Http.get(url).html();

    var coverImg = $.Q(doc, '#fmimg img').attr('src').mayBeFillHost(host);
	var author = $.Q(doc, '#info p').text().normalizeCN().replace(/作\s*者:/g, '');

    return Response.success({
        name: $.Q(doc, '#info h1').text(),
        cover: coverImg,
        author: author,
        description: $.Q(doc, '#intro').text(),
        detail: String.format('{0}<br>{1}', $.Q(doc, '#info > p:nth-child(2)').text(), $.Q(doc, '#info > p:nth-child(4)').text()),
        ongoing: $.Q(doc, '#info > p:nth-child(3)').text().includes('连载中'),
        host: host
    });
}

// More
String.prototype.normalizeCN = function() {
    return this.replace(/\uFF1A/, ':').replace(/\u00A0/, ' ');
}
---
layout: post
title: Backbone View
permalink: /blog/view-tech/backbone/backbone-view
summary: Merhaba arkadaslar, Backbone yazı dizisine devam ediyoruz. Bugün ki konumuz View olacaktır. Önceki yazılarımda belirttiğim gibi Backbone, MVC yapısında olan bir javascript framework'udur.
image: images/view-tech/backbone/introduction-to-backbonejs.jpg
---

Merhaba arkadaslar, Backbone yazı dizisine devam ediyoruz. Bugün ki konumuz View olacaktır. Önceki yazılarımda belirttiğim gibi Backbone, MVC yapısında olan bir javascript framework'udur.

MVC'deki Model->Backbone Model ve View da Backbone View olmakta. Dipnot olarak Backbone, Controller kullanmaya zorlamaz.

View; Model veya Collection görüntülendiği kısım diyebiliriz. Modelin yada collection'un nasıl görüneceğini belirler. Bir Backbone view oluşturmak için öncelikle Backbone.View'dan extends etmemiz gerekmekte. Çok karmaşık yapısı olmamakla birlikte el, render, event listening vs gibi birkaç önemli noktası bulunmakta. Bunlara değineceğiz. :)

İlk olarak bir View tanımı yapalım ve daha sonrasında da model ve template ile nasıl ilişkilendirebiliriz ona bakalım;
{% highlight javascript linenos %}
var PersonView = Backbone.View.extend({
   ....
   ....
});
{% endhighlight %}

Model ve Collection tanımlamalarında olduğu gibi View'in da initialize methodu bulunmaktadır.
{% highlight javascript linenos %}
var PersonView = Backbone.View.extend({
    initialize: function() {
        console.log('personView has been created');
    }
});
{% endhighlight %}

View'dan nesne üretmek de yine model ve collectiona benzerdir;

{% highlight javascript linenos %}
var personView = new PersonView();//browser consolunda personView has been created bilgisini görebiliriz.
{% endhighlight %}

### EL property

EL property, her Backbone View'ın sahip olduğu default bir özelliktir. Browser tarafından oluşturulan dom elementine reference olur. Eğer açık olarak tanımlanmamış ise default olarak Backbone el property olarak boş bir div elementi atayacaktır. Bir div element oluşturalım ve el property olarak ayarlayalım;

{% highlight javascript linenos %}
<div id="person_container"></div>
<script type="text/javascript">
var PersonView = Backbone.View.extend({
    initialize: function() {
        console.log('personView has been created');
    }
});

var personView = new PersonView({el: $("#person_container")});
</script>
{% endhighlight %}

### Loading Template

Backbone View için template tanımı yapılarak EL property'e set edelim. Bunun için underscore.js bize template çözümü sunmakla beraber farklı alternatifler de bulunmakta. Özellikle Handlebar.js tavsiye edebilirim. Template load etmek için initalize kısmında <strong>render </strong>işlemi yapacağız. Önce bir template oluşturalım;

{% highlight javascript linenos %}
<script type="text/template" id="person_template">
  <label>Search</label>
  <input type="text" id="person_input" />
  <input type="button" id="person_button" value="Search" />
</script>
{% endhighlight %}

Yukarıda bir tempalte bulunmakta ve id değeri person_template olarak ayarlanmış, type olarak text/template verdik. Handlebar.js için type'a yazılan değer değişmekte.
{% highlight javascript linenos %}
<script type="text/javascript">
  var personView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      // Compile the template using underscore
      var template = _.template( $("#person_template").html(), {} );
      // Load the compiled HTML into the Backbone "el"
      this.$el.html( template );
    }
  });

  var personView = new PersonView({ el: $("#person_container") });
</script>
{% endhighlight %}

İlk olarak view'ın initalize kısmında this reference ile render methodunun çağrıldığına dikkat edelim. render fonksiyonu içerisinde iki aşamala olarak template'ın compile ve load aşamaları bulunur.

{% highlight javascript linenos %}
// Compile the template using underscore
var template = _.template( $("#person_template").html(), {} );
{% endhighlight %}

Yukardaki satır ile template compile olunur. _(underscore) ifadesi underscore.js'e reference olur ve template methoduna oluşturulan template'in html'i verilir. İkinci parametre olarak data gönderilebilir ama şuan boş gönderdik.

{% highlight javascript linenos %}
// Load the compiled HTML into the Backbone "el"
this.$el.html( template );
{% endhighlight %}
View'ın el'in html içeriği de template değişkeni kullanılarak set edilmekte. Son olarak bir view nesnesi oluşturulur ve EL'nin elementi olarak <strong>person_container</strong> verilir. Tarayıcı üzerinde test edebilirsiniz.

Her Backbone View arka planda bir "model" tutar. View nesnesi oluşturulduğunda model yada collection constructor içinde gönderilebilir. Şöyle ki;

{% highlight javascript linenos %}
var person = new Person({'name' : 'caysever'});
var personView = new PersonView({model : person});
{% endhighlight %}
View declarasyonu içerisinde model'in bir Backbone Model yada Backbone Collectionu olduğunu ayarlayabiliriz;
{% highlight javascript linenos %}
var personView = Backbone.View.extend({
      model : Person,
      ....
      ....
});
{% endhighlight %}

### Passing Data

Oluşturulan template compile edilirken kendisine data gönderilebilir. Yukarıdaki template'i şöyle değiştirelim;

{% highlight javascript linenos %}
<script type="text/template" id="person_template">
  <label><%= mySearch %></label>
  <input type="text" id="person_input" />
  <input type="button" id="person_button" value="Search" />
</script>
{% endhighlight %}

Underscore.js'ın sağlamış olduğu bir özelliktir. Template'in compile anında herhangi data, obje vs gönderebiliriz. Compile edelim;
{% highlight javascript linenos %}
<script type="text/javascript">
  var personView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      var variables = { mySearch : "Person Search Template" }
      var template = _.template( $("#person_template").html(), variables);
      this.$el.html( template );
    }
  });

  var personView = new PersonView({ el: $("#person_container") });
</script>
{% endhighlight %}

Template compile olurken gönderdiğimiz variable içerisinden mySearch adlı değişkeni  <%= %> etikletleri arasında bulup label etiketi içerisine yerleştirir. <%= %> etiketleri JSP bilenlerin aşina olduğu bir etiket olan expression etikettir. Toplamda 3 etiket bulunmakta;
{% highlight html linenos %}
<ul>
	<li><% %> : Herhangi bir kod çalıştırabilinir.</li>
	<li><%= %> : Herhangi birşey çıktıya verilir.</li>
	<li><%- %> : Html escape ile birlikte çıktı vermek için kullanılır.</li>
</ul>
{% endhighlight %}
Daha önceki yazılarda underscore.js'in sağladığı each methoduna değinmiştim. Bir örnek yapalım;
{% highlight javascript linenos %}
<script type="text/template" id='person_template'>
<table cellspacing='0' cellpadding='0' border='1' >
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <%
       //repeat items
        _.each(items,function(item,key,list){
        var personId = item.id;
        var personName = item.name;
      %>
        <tr>
          <!-- use variables -->
          <td><%= personId %></td>
          <td><%= personName %></td>
        </tr>
      <%
        });
      %>
    </tbody>
  </table>
</script>
{% endhighlight %}

underscore.js ile gelen items datasını itere edip person id ve person name bilgisini table üzerinde gösterdik. Compile edelim;
{% highlight javascript linenos %}
<script type="text/javascript">
  var personView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      var items = [
            {id : 13, name : 'caysever'},
            {id : 14, name : 'wora'}
      ];
      var template = _.template( $("#person_template").html(),items);

      this.$el.html( template );
    }
  });

  var personView = new PersonView({ el: $("#person_container") });
</script>
{% endhighlight %}
View nesnesi oluştuktan sonra div element içinde table oluşur ve gönderilen item'ler table içerisinde gösterilecektir.



View üzerinde gösterilen model yada collectionun değişmesini dinleyebilir, herhangi bir değişiklikte view'ın da kendini güncellemesini sağlayabiliriz. Yine Backbone Model tanımı içerisindekine benzer şekilde initalize kısmında bunu gerçekleştiriyor olacağız;
{% highlight javascript linenos %}
initialize: function() {
     this.listenTo(this.model, "add", this.modelUpdated);
     this.listenTo(this.model, "change", this.modelUpdated);
     this.listenTo(this.model, "remove", this.modelUpdated);
},
modelUpdated : function(){
     this.render();
}
{% endhighlight %}

View üzerinde kullanılan model'de ekleme/değişme/silinme gibi durumlar için view tekrar render edilerek en güncel data gösterilecektir. listenTo methodu ile aksiyonun gerçekleşeceği nesne, aksyion tipi ve aksyion sonucu yapılacak olan işlemleri belirterek dinleyebiliriz. Yukardakilere ek olarak destroy, özel olarak attribute'un değişmesi, sort vs gibi aksiyonları da dinleyebilirsiniz.

View'ı silmek için de view nesnesi üzerinden remove() methodunu çağırmak yeterli olucaktır;
{% highlight javascript linenos %}
personView.remove();
{% endhighlight %}

Yazıyı burada sonlandırıyorum arkadaslar.

Mutlu kalın, kod'la kalın ve bol bol Çay için :)

~ Alican Akkus.
